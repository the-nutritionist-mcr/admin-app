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
declare namespace Cypress {
  interface Chainable {
    createCustomer(
      name: string,
      email: string,
      daysPerWeek: number,
      plan: string,
      exclusions: string[]
    ): void;
  }
}

Cypress.Commands.add(
  "createCustomer",
  (
    name: string,
    email: string,
    daysPerWeek: number,
    plan: string,
    exclusions: string[]
  ): void => {
    cy.visit("/customers");
    cy.contains("Create New").click();
    cy.get("table").find("tr").last().as("lastRow");

    cy.get("@lastRow").find("input[name='name']").type(name);
    cy.get("@lastRow").find("input[name='email']").type(email);

    cy.get("@lastRow").find("input[name='daysPerWeek']").click();
    cy.get("div[data-g-portal-id='0']").as("dropPortal");

    cy.get("@dropPortal").contains(String(daysPerWeek)).click();

    cy.get("@lastRow").find("input[name='plan']").click();

    exclusions.forEach((exclusion) => {
      cy.get("@lastRow").find("input[name='exclusions']").click();
      cy.get("@dropPortal").contains(exclusion).click();
    });

    cy.get("@dropPortal").contains(plan).click();
  }
);
