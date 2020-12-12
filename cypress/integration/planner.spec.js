describe("The planner", () => {
  it("Correctly calculates the number of meals for customers on Mondays", () => {
    cy.visit("/");
    cy.createExclusion("Nuts", true);
    cy.createExclusion("Chilli", false);
    cy.createExclusion("Celery", true);
    cy.createExclusion("Fish", true);
    cy.createExclusion("Lupin", true);
    cy.createExclusion("Pork", false);
    cy.createExclusion("Milk", true);

    cy.createRecipe("Salad", "A beautiful salad", ["Nuts", "Chilli"]);
    cy.createRecipe("Sandwich", "A nice ham sandwich", ["Pork"]);
    cy.createRecipe("Risotto", "A lovely risotto", []);
    cy.createRecipe("Steak", "A beautiful steak", []);
    cy.createRecipe("Soup", "A lovely rich soup", ["Milk"]);
    cy.createRecipe("Pasta", "Beautiful Italian pasta", ["Milk", "Nuts"]);

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
      [],
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
      [],
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
  });
});
