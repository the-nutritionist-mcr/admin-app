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

  it("Should add a blank row when you click the 'New' button", () => {
    cy.visit("/customers");
    cy.contains("New").click();
    cy.get("table").find("tr").should("have.length", 2);

    cy.get("input[name='name']").should("be.empty");
    cy.get("input[name='email']").should("be.empty");
    cy.get("input[name='daysPerWeek']").should("have.value", 6);
    cy.get("input[name='plan']").should("have.value", "Mass 1");
    cy.get("input[name='exclusions']").should("be.empty");
  });

  it("Should allow you to add and edit a couple of customers which then persist after page reload", () => {
    cy.createCustomer(
      "Ben Wainwright",
      "bwainwright28@gmail.com",
      5,
      "EQ 2",
      []
    );

    cy.createCustomer(
      "Lawrence Davis",
      "lawrence@lawrencedavis.me",
      6,
      "Ultra-Micro 1",
      []
    );

    cy.createCustomer("Alice Springs", "alice@springs.com", 5, "Micro 1", []);

    cy.wait(1000);
    cy.reload();

    cy.get("tbody").find("tr").last().as("lastRow");
    cy.get("@lastRow")
      .find("input[name='name']")
      .should("have.value", "Ben Wainwright");
    cy.get("@lastRow")
      .find("input[name='email']")
      .should("have.value", "bwainwright28@gmail.com");
    cy.get("@lastRow")
      .find("input[name='daysPerWeek']")
      .should("have.value", 5);
    cy.get("@lastRow").find("input[name='plan']").should("have.value", "EQ 2");

    cy.get("tbody").find("tr").first().next().as("secondRow");
    cy.get("@secondRow")
      .find("input[name='name']")
      .should("have.value", "Lawrence Davis");
    cy.get("@secondRow")
      .find("input[name='email']")
      .should("have.value", "lawrence@lawrencedavis.me");
    cy.get("@secondRow")
      .find("input[name='daysPerWeek']")
      .should("have.value", 6);
    cy.get("@secondRow")
      .find("input[name='plan']")
      .should("have.value", "Ultra-Micro 1");

    cy.get("tbody").find("tr").first().as("firstRow");
    cy.get("@firstRow")
      .find("input[name='name']")
      .should("have.value", "Alice Springs");
    cy.get("@firstRow")
      .find("input[name='email']")
      .should("have.value", "alice@springs.com");
    cy.get("@firstRow")
      .find("input[name='daysPerWeek']")
      .should("have.value", 5);
    cy.get("@firstRow")
      .find("input[name='plan']")
      .should("have.value", "Micro 1");
  });

  describe("the delete button", () => {
    it("Should allow you to delete a row after you've confirmed", () => {
      cy.visit("/customers");

      cy.createCustomer(
        "Ben Wainwright",
        "bwainwright28@gmail.com",
        5,
        "EQ 2",
        []
      );

      cy.createCustomer(
        "Lawrence Davis",
        "lawrence@lawrencedavis.me",
        6,
        "Ultra-Micro 1",
        []
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
        "Ben Wainwright",
        "bwainwright28@gmail.com",
        5,
        "EQ 2",
        []
      );

      cy.createCustomer(
        "Lawrence Davis",
        "lawrence@lawrencedavis.me",
        6,
        "Ultra-Micro 1",
        []
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
