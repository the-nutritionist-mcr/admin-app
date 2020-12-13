describe("The customisations page", () => {
  before(() => {
    cy.exec("yarn clear-tables");
  });

  beforeEach(() => {
    cy.login();
    cy.contains("Customisations").click();
  });

  it("should render a page with the correct title", () => {
    cy.get("h2").contains("Customisations");
  });

  it("should render the empty data message on first page load", () => {
    cy.get("body").should("not.contain", "table");
    cy.contains("You've not added any customisations yet...");
  });

  it("should allow you to add and edit a couple of customisations which persist after page reload", () => {
    cy.createCustomisation("Chillis", false);
    cy.createCustomisation("Nuts", true);
    cy.createCustomisation("Fish", false);

    cy.get("tbody").find("tr").first().as("firstRow");
    cy.get("@firstRow").contains("Chillis");
    cy.get("@firstRow").contains("No");

    cy.get("tbody").find("tr").first().next().as("secondRow");
    cy.get("@secondRow").contains("Fish");
    cy.get("@secondRow").contains("No");

    cy.get("tbody").find("tr").last().as("lastRow");
    cy.get("@lastRow").contains("Nuts");
    cy.get("@lastRow").contains("Yes");
  });

  it("should allow you to create customisations that can be added to recipes", () => {
    cy.createRecipe("Special Salad", "A lovely salad", ["Chillis"]);
    cy.get("tbody").find("tr").first().contains("Chillis");
  });

  it("should allow you to create customisations that can be added to customers", () => {
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
      ["Nuts"],
      "Some notes",
      4,
      "0123456789"
    );

    cy.get("tbody").find("tr").contains("Nuts");
  });
});
