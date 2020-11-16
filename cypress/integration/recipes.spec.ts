describe("The recipes page", () => {
  it("should render a page with the correct title", () => {
    cy.visit("/recipes");
    cy.get("h2").contains("Recipes");
  });

  it("should contain an empty table on first load", () => {
    cy.visit("/recipes");
    cy.get("table").find("tr").should("have.length", 1);
  });

  it("should add a blank row when you click the 'Create New' button", () => {
    cy.visit("/recipes");
    cy.contains("Create New").click();

    cy.get("table").find("tr").should("have.length", 2);
    cy.get("input[name='name']").should("be.empty");
    cy.get("input[name='description']").should("be.empty");
    cy.get("input[name='exclusions']").should("be.empty");
  });

  it("should allow you to add and edit a couple of recipes which then persist after page reload", () => {
    cy.visit("/recipes");

    cy.createRecipe("Sandwich", "A delicious sandwich", []);
    cy.createRecipe("Salad", "A beautiful salad", []);
    cy.createRecipe("Chocolate", "A creamy chocolate bar", []);

    cy.reload();

    cy.get("tbody").find("tr").first().as("firstRow");
    cy.get("@firstRow")
      .find("input[name='name']")
      .should("have.value", "Sandwich");
    cy.get("@firstRow")
      .find("input[name='description']")
      .should("have.value", "A delicious sandwich");

    cy.get("tbody").find("tr").first().next().as("secondRow");
    cy.get("@secondRow")
      .find("input[name='name']")
      .should("have.value", "Salad");
    cy.get("@secondRow")
      .find("input[name='description']")
      .should("have.value", "A beautiful salad");

    cy.get("tbody").find("tr").last().as("thirdRow");
    cy.get("@thirdRow")
      .find("input[name='name']")
      .should("have.value", "Chocolate");
    cy.get("@thirdRow")
      .find("input[name='description']")
      .should("have.value", "A creamy chocolate bar");
  });

  describe("the delete button", () => {
    it("should allow you to delete a row after you've confirmed", () => {
      cy.visit("/recipes");

      cy.createRecipe("Sandwich", "A delicious sandwich", []);
      cy.createRecipe("Salad", "A beautiful salad", []);

      cy.get("tbody").find("tr").last().contains("Delete").click();
      cy.contains("Yes").click();
      cy.get("tbody").find("tr").should("have.length", 1);
    });

    it("does not delete a row if you click on the confirm dialog", () => {
      cy.visit("/recipes");

      cy.createRecipe("Sandwich", "A delicious sandwich", []);
      cy.createRecipe("Salad", "A beautiful salad", []);

      cy.get("tbody").find("tr").last().contains("Delete").click();
      cy.contains("No").click();
      cy.get("tbody").find("tr").should("have.length", 2);
    });
  });
});
