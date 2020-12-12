describe("The home page", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Should render a page with the correct title", () => {
    cy.get("h2").contains("Welcome");
  });
});

describe("The navbar", () => {
  it("should take you to the 'customers' page when you click on the 'customers' button", () => {
    cy.get("header").contains("Customers").click();
    cy.get("h2").contains("Customers");
  });

  it("should take you to the 'recipes' page when you click on the 'recipes' button", () => {
    cy.get("header").contains("Recipes").click();
    cy.get("h2").contains("Recipes");
  });

  it("should take you to the 'customisations' page when you click on the 'exclusions' button", () => {
    cy.get("header").contains("Customisations").click();
    cy.get("h2").contains("Customisations");
  });

  it("should take you to the 'planner' page when you click on the 'planner' button", () => {
    cy.get("header").contains("Planner").click();
    cy.get("h2").contains("Planner");
  });

  it("should take you back to the homepage when you click on the 'home' button", () => {
    cy.get("header").contains("Planner").click();
    cy.get("header").contains("Home").click();
    cy.get("h2").contains("Welcome");
  });
});
