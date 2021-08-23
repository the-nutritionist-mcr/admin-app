import { Auth } from "@aws-amplify/auth";
import { assertIsBackendOutputs } from "../../src/types/backend-outputs";

const seed = () => {
  cy.task("seedCognito");
};

const configureCognitoAndSignIn = async (
  username: string,
  password: string
) => {
  const cypressConfig = Cypress.config()
  const configResponse = await fetch(`${cypressConfig.baseUrl}/backend-outputs.json`);
  const rawConfig = await configResponse.json();
  assertIsBackendOutputs(rawConfig);

  const config = Object.entries(rawConfig).find(([key]) =>
    key.includes("backend-stack")
  )?.[1];

  if (!config) {
    throw new Error(`Whoops, couldn't load beckend config`);
  }

  Auth.configure({
    Auth: {
      region: "us-east-1",
      userPoolId: config.UserPoolId,
      userPoolWebClientId: config.ClientId,
    },
  });
  return Auth.signIn({ username, password });
};

const createCustomisation = (name, allergen) => {
  cy.get("header").contains("Customisations").click();
  cy.contains("New").click();

  cy.get("input[name='name']").type(name);

  if (allergen) {
    cy.get("input[name='allergen']").click({ force: true });
  }

  cy.intercept({
    method: "POST",
    url: "/graphql",
  }).as("graphql");

  cy.contains("Ok").click();

  cy.wait("@graphql");
};

/*
 * Taken from https://docs.cypress.io/guides/testing-strategies/amazon-cognito-authentication#Custom-Command-for-Amazon-Cognito-Authentication
 * Amazon Cognito
 */
const loginByCognitoApi = (username, password) => {
  const log = Cypress.log({
    displayName: "COGNITO LOGIN",
    message: [`🔐 Authenticating | ${username}`],
    autoEnd: false,
  });

  const signIn = configureCognitoAndSignIn(username, password);

  log.snapshot("before");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cy.wrap(signIn, { log: false }).then((cognitoResponse: any) => {
    const cyLog = Cypress.log({
      displayName: "Here",
      message: [
        `🔐 Authenticated, saving tokens: `,
        JSON.stringify(cognitoResponse, null, 2),
      ],
    });

    const keyPrefixWithUsername = `${cognitoResponse.keyPrefix}.${cognitoResponse.username}`;

    window.localStorage.setItem(
      `${keyPrefixWithUsername}.idToken`,
      cognitoResponse.signInUserSession.idToken.jwtToken
    );

    window.localStorage.setItem(
      `${keyPrefixWithUsername}.accessToken`,
      cognitoResponse.signInUserSession.accessToken.jwtToken
    );

    window.localStorage.setItem(
      `${keyPrefixWithUsername}.refreshToken`,
      cognitoResponse.signInUserSession.refreshToken.token
    );

    window.localStorage.setItem(
      `${keyPrefixWithUsername}.clockDrift`,
      cognitoResponse.signInUserSession.clockDrift
    );

    window.localStorage.setItem(
      `${cognitoResponse.keyPrefix}.LastAuthUser`,
      cognitoResponse.username
    );

    window.localStorage.setItem("amplify-authenticator-authState", "signedIn");
    cyLog.snapshot("after");
    cyLog.end();
  });
};

const createRecipe = (
  name: string,
  description: string,
  exclusions: string[],
  shortName: string
) => {
  cy.get("header").contains("Recipes").click();
  cy.contains("New").click();

  cy.get("input[name='name']").type(name);
  cy.get("input[name='shortName']").type(shortName);
  cy.get("input[name='description']").type(description);
  cy.get("input[name='potentialExclusions']").click();
  exclusions.forEach((exclusion) => {
    cy.get("[data-g-portal-id='1']")
      .find("div[role='menubar']")
      .contains(exclusion)
      .click({ force: true });
  });

  cy.contains("TNM Admin").click({ force: true });

  cy.intercept({
    method: "POST",
    url: "/graphql",
  }).as("graphql");

  cy.contains("Ok").click();

  cy.wait("@graphql");
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      loginByCognitoApi: (
        ...args: Parameters<typeof loginByCognitoApi>
      ) => Chainable;

      seed: () => void;

      createCustomisation: (
        ...args: Parameters<typeof createCustomisation>
      ) => Chainable;

      createRecipe: (...args: Parameters<typeof createRecipe>) => Chainable;
    }
  }
}

Cypress.Commands.add("seed", seed);
Cypress.Commands.add("loginByCognitoApi", loginByCognitoApi);
Cypress.Commands.add("createCustomisation", createCustomisation);
Cypress.Commands.add("createRecipe", createRecipe);
