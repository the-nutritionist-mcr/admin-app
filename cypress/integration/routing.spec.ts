describe("The home page", () => {
  it("Should render a page with the correct title", () => {
    cy.visit("/");
    cy.get("h2").contains("Welcome");
  });
});

describe("The navbar", () => {
  it("should take you to the 'customers' page when you click on the 'customers' button", () => {
    cy.visit("/");
    cy.get("header").contains("Customers").click();
    cy.get("h2").contains("Customers");
  });

  it("should take you to the 'recipes' page when you click on the 'recipes' button", () => {
    cy.visit("/");
    cy.get("header").contains("Recipes").click();
    cy.get("h2").contains("Recipes");
  });

  it("should take you to the 'exclusions' page when you click on the 'exclusions' button", () => {
    cy.visit("/");
    cy.get("header").contains("Exclusions").click();
    cy.get("h2").contains("Exclusions");
  });

  it("should take you to the 'planner' page when you click on the 'planner' button", () => {
    cy.visit("/");
    cy.get("header").contains("Planner").click();
    cy.get("h2").contains("Planner");
  });

  it("should take you back to the homepage when you click on the 'home' button", () => {
    cy.visit("/");
    cy.get("header").contains("Planner").click();
    cy.get("header").contains("Home").click();
    cy.get("h2").contains("Welcome");
  });
});
