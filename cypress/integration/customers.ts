describe("The customers page", () => {
  it("Shoulder render a page with the correct title", () => {
    cy.visit("/customers");
    cy.get("h2").contains("Customers");
  });

  it("Should contain an empty table on first load", () => {
    cy.visit("/customers");
    cy.get("table").find("tr").should("have.length", 1);
  });

  it("Should add a blank row when you click the 'Create New' button", () => {
    cy.visit("/customers");
    cy.contains("Create New").click();
    cy.get("table").find("tr").should("have.length", 2);

    cy.get("input[name='name']").should("be.empty");
    cy.get("input[name='email']").should("be.empty");
    cy.get("input[name='daysPerWeek']").should("have.value", 6);
    cy.get("input[name='plan']").should("have.value", "Mass 1");
    cy.get("input[name='allergicTo']").should("be.empty");
  });

  it("Should allow you to edit a customer which then persist after page reload", () => {
    cy.visit("/customers");
    cy.contains("Create New").click();

    cy.get("input[name='name']").type("Ben Wainwright");
    cy.get("input[name='email']").type("bwainwright28@gmail.com");
    cy.get("input[name='daysPerWeek']").click();
    cy.contains("5").click();

    cy.get("input[name='plan']").click();
    cy.contains("EQ 2").click();

    cy.get("input[name='allergicTo']").click();
    cy.contains("Gluten Cereal").click();
    cy.contains("Fish").click();
    cy.get("input[name='allergicTo']").click();

    cy.reload();

    cy.get("table").find("tr").should("have.length", 2);

    cy.get("input[name='name']").should("have.value", "Ben Wainwright");
    cy.get("input[name='email']").should(
      "have.value",
      "bwainwright28@gmail.com"
    );
    cy.get("input[name='plan']").should("have.value", "EQ 2");
    cy.get("input[name='allergicTo']").should("have.value", "multiple");
  });
});
