describe("The customers page", () => {
  it("Should render a page with the correct title", () => {
    cy.visit("/customers");
    cy.get("h2").contains("Customers");
  });

  it("Should render the empty data message on first page load", () => {
    cy.visit("/customers");
    cy.get("body").should("not.contain", "table");
    cy.contains("You've not added any customers yet...");
  });

  it("Should allow you to add and edit a couple of customers which then persist after page reload", () => {
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

    cy.wait(1000);
    cy.reload();

    cy.get("tbody").find("tr").last().as("lastRow");
    cy.get("@lastRow").contains("Mr Ben Wainwright");
    cy.get("@lastRow").contains("Active");
    cy.get("@lastRow").contains("Mass 3 (5 days)");
    cy.get("@lastRow").contains("None");
  });

  describe("the delete button", () => {
    it("Should allow you to delete a row after you've confirmed", () => {
      cy.visit("/customers");

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

      cy.get("tbody")
        .find("tr")
        .first()
        .next()
        .find("button[aria-label='Delete']")
        .click();

      cy.contains("Ok").click();
      cy.get("tbody").find("tr").should("have.length", 1);
    });

    it("Does not delete a row if you click on the confirm dialog", () => {
      cy.visit("/customers");

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

      cy.get("tbody")
        .find("tr")
        .first()
        .next()
        .find("button[aria-label='Delete']")
        .click();

      cy.contains("Cancel").click();
      cy.get("tbody").find("tr").should("have.length", 2);
    });
  });
});
