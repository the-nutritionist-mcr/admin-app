describe("The planner", () => {
  before(() => {
    cy.exec("yarn clear-tables");
  });

  beforeEach(() => {
    cy.login();
  });

  it("Correctly calculates the number of meals for customers on Mondays", () => {
    cy.createCustomisation("Nuts", true);
    cy.createCustomisation("Chilli", false);
    cy.createCustomisation("Celery", true);
    cy.createCustomisation("Fish", true);
    cy.createCustomisation("Lupin", true);
    cy.createCustomisation("Pork", false);
    cy.createCustomisation("Milk", true);

    cy.createRecipe("Salad", "A beautiful salad", ["Chilli"]);
    cy.createRecipe("Sandwich", "A nice ham sandwich", ["Pork"]);
    cy.createRecipe("Risotto", "A lovely risotto", []);
    cy.createRecipe("Steak", "A beautiful steak", []);
    cy.createRecipe("Soup", "A lovely rich soup", ["Milk"]);
    cy.createRecipe("Pasta", "Beautiful Italian pasta", ["Milk"]);

    cy.createCustomer(
      "Mr",
      "Ben",
      "Wainwright",
      1,
      "bwainwright28@gmail.com",
      "Mass 3",
      5,
      "Large",
      true,
      "Somewhere",
      ["Pork"],
      "Some notes",
      4,
      "0123456789"
    );

    cy.createCustomer(
      "Mrs",
      "Alice",
      "Springs",
      1,
      "a@b.c",
      "Micro 1",
      6,
      "Standard",
      false,
      "I live in an an attic",
      ["Milk"],
      "More notes",
      4,
      "1232342342"
    );

    cy.get("Header").contains("Planner").click({ force: true });
    cy.get("input[name='selectDay']").click({ force: true });
    cy.get("div[data-g-portal-id='0']")
      .contains("Monday")
      .click({ force: true });

    cy.get("input[name='meal-0']").click({ force: true });
    cy.get("div[data-g-portal-id='0']")
      .contains("Salad")
      .click({ force: true });

    cy.get("input[name='meal-1']").click({ force: true });
    cy.get("div[data-g-portal-id='0']").contains("Soup").click({ force: true });

    cy.get("input[name='meal-2']").click({ force: true });
    cy.get("div[data-g-portal-id='0']")
      .contains("Risotto")
      .click({ force: true });

    cy.get("input[name='meal-3']").click({ force: true });
    cy.get("div[data-g-portal-id='0']")
      .contains("Pasta")
      .click({ force: true });

    cy.get("input[name='meal-4']").click({ force: true });
    cy.get("div[data-g-portal-id='0']")
      .contains("Sandwich")
      .click({ force: true });

    cy.get("input[name='meal-5'").click({ force: true });
    cy.get("div[data-g-portal-id='0']")
      .contains("Steak")
      .click({ force: true });

    cy.contains("Mass without Pork");
    cy.contains("Micro without Milk");
  });
});
