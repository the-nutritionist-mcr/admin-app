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

    cy.createCustomer("Fred", "a@b.c", 5, "Mass 1", []);
    cy.createCustomer("Alice", "a@b.c", 6, "Micro 2", ["Nuts"]);
    cy.createCustomer("James", "a@b.c", 5, "Micro 2", []);
    cy.createCustomer("Mark", "a@b.c", 6, "Ultra-Micro 2", ["Fish"]);
    cy.createCustomer("Michael", "a@b.c", 6, "EQ 2", []);
    cy.createCustomer("Stewart", "a@b.c", 6, "EQ 2", []);
    cy.createCustomer("Leon", "a@b.c", 6, "EQ 2", ["Celery", "Pork"]);
    cy.createCustomer("Michelle", "a@b.c", 6, "EQ 2", []);
    cy.createCustomer("Mary", "a@b.c", 6, "Mass 2", ["Nuts"]);

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
