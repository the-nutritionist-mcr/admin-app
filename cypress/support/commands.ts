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
declare namespace Cypress {
  interface Chainable {
    createCustomer: (
      name: string,
      email: string,
      daysPerWeek: number,
      plan: string,
      exclusions: string[]
    ) => void;

    createRecipe: (name: string, description: string, exclusions: string[]) => void;

    createExclusion: (name: string, allergen: boolean) => void;
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

Cypress.Commands.add("createExclusion", (name: string, allergen: boolean) => {
  cy.get("header").contains("Exclusions").click();
  cy.contains("Create New").click();
  cy.get("table").find("tr").last().as("lastRow");

  cy.get("@lastRow").find("input[name='name']").type(name);

  if (allergen) {
    cy.get("@lastRow").find("input[name='allergen']").click({ force: true });
  }
});

Cypress.Commands.add(
  "createCustomer",
  (
    name: string,
    email: string,
    daysPerWeek: number,
    plan: string,
    exclusions: string[]
  ): void => {
    cy.get("header").contains("Customers").click();
    cy.contains("Create New").click();
    cy.get("table").find("tr").last().as("lastRow");

    cy.get("@lastRow").find("input[name='name']").type(name);
    cy.get("@lastRow").find("input[name='email']").type(email);

    cy.get("@lastRow").find("input[name='daysPerWeek']").click();
    cy.get("div[data-g-portal-id='0']").as("dropPortal");

    cy.get("@dropPortal").contains(String(daysPerWeek)).click();

    cy.get("@lastRow").find("input[name='plan']").click();
    cy.get("@dropPortal").contains(plan).click();

    cy.get("@lastRow").find("input[name='exclusions']").click();
    exclusions.forEach((exclusion) => {
      cy.get("@dropPortal").contains(exclusion).click();
    });
    cy.get("@lastRow").find("input[name='exclusions']").click();
  }
);

Cypress.Commands.add(
  "createRecipe",
  (name: string, description: string, exclusions: string[]): void => {
    cy.get("header").contains("Recipes").click();
    cy.contains("Create New").click();
    cy.get("table").find("tr").last().as("lastRow");

    cy.get("@lastRow").find("input[name='name']").type(name);
    cy.get("@lastRow").find("input[name='description']").type(description);
    cy.get("@lastRow").find("input[name='exclusions']").click();
    cy.get("div[data-g-portal-id='0']").as("dropPortal");
    exclusions.forEach((exclusion) => {
      cy.get("@dropPortal").contains(exclusion).click();
    });
    cy.get("@lastRow").find("input[name='exclusions']").click();
  }
);
