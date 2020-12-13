// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... }

/// <reference types="cypress" />
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-enable @typescript-eslint/no-namespace */

Cypress.commands.add("clearDb", () => {
  cy.exec("yarn clear-tables")
    // eslint-disable-next-line no-console
    .then((result) => console.log(result))
    // eslint-disable-next-line no-console
    .catch((error) => console.error(error));
});

Cypress.Commands.add("login", () => {
  cy.visit("/");
  cy.get("#username").type(Cypress.env("USER"), { force: true });
  cy.get("#password").type(Cypress.env("PASSWORD"), { force: true });
  cy.get("button[type='submit']").click({ multiple: true, force: true });
});

Cypress.Commands.add("createCustomisation", (name, allergen) => {
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
});

Cypress.Commands.add("createRecipe", (name, description, exclusions) => {
  cy.get("header").contains("Recipes").click();
  cy.contains("New").click();

  cy.get("input[name='name']").type(name);
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
});

Cypress.Commands.add(
  "createCustomer",
  (
    salutation,
    firstName,
    surname,
    startDate,
    email,
    plan,
    daysPerWeek,
    snack,
    breakfast,
    address,
    exclusions,
    notes,
    paymentDay,
    telephone
  ) => {
    cy.get("header").contains("Customers").click();
    cy.contains("New").click();

    cy.get("input[name='salutation']").click();
    cy.get("div[data-g-portal-id='1']").contains(salutation).click();
    cy.get("input[name='firstName']").type(firstName);
    cy.get("input[name='surname']").type(surname);
    cy.get("input[name='startDate']").click();
    cy.get("div[data-g-portal-id='1']").contains(String(startDate)).click();
    cy.get("input[name='email']").type(email);
    cy.get("input[name='daysPerWeek']").click();
    cy.get("div[data-g-portal-id='1']").contains(String(daysPerWeek)).click();
    cy.get("input[name='snack']").click();
    cy.get("div[data-g-portal-id='1']").contains(snack).click();
    cy.get("div[aria-label='breakfast']").click();
    cy.get("div[data-g-portal-id='1']")
      .contains(breakfast ? "Yes" : "No")
      .click();
    cy.get("textarea[name='address']").type(address);
    cy.get("input[name='plan']").click();
    cy.get("div[data-g-portal-id='1']").contains(plan).click();

    cy.get("input[name='exclusions']").click();
    exclusions.forEach((exclusion) => {
      cy.get("div[data-g-portal-id='1']")
        .contains(exclusion)
        .click({ force: true });
    });

    if (notes) {
      cy.get("textarea[name='notes']").type(notes);
    }

    if (paymentDay) {
      cy.get("input[name='paymentDayOfMonth']").type(String(paymentDay));
    }

    if (telephone) {
      cy.get("input[name='telephone']").type(telephone);
    }

    cy.intercept({
      method: "POST",
      url: "/graphql",
    }).as("graphql");

    cy.contains("Ok").click();

    cy.wait("@graphql");
  }
);
