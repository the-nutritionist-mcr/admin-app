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
    cy.get("input[name='exclusions']").should("be.empty");
  });

  const editUser = (
    alias: string,
    name: string,
    email: string,
    daysPerWeek: number,
    plan: string
  ) => {
    cy.get(`@${alias}`).find("input[name='name']").type(name);
    cy.get(`@${alias}`).find("input[name='email']").type(email);

    cy.get(`@${alias}`).find("input[name='daysPerWeek']").click();
    cy.get("div[data-g-portal-id='0']").as("dropPortal");

    cy.get("@dropPortal").contains(String(daysPerWeek)).click();

    cy.get(`@${alias}`).find("input[name='plan']").click();
    cy.get("@dropPortal").contains(plan).click();
  };

  it("Should allow you to add and edit a couple of customers which then persist after page reload", () => {
    cy.visit("/customers");
    cy.contains("Create New").click();

    cy.get("tbody").find("tr").as("firstRow");
    editUser(
      "firstRow",
      "Ben Wainwright",
      "bwainwright28@gmail.com",
      5,
      "EQ 2"
    );

    cy.contains("Create New").click();
    cy.get("tbody").find("tr").first().next().as("secondRow");
    editUser(
      "secondRow",
      "Lawrence Davis",
      "lawrence@lawrencedavis.me",
      6,
      "Ultra-Micro 1"
    );

    cy.contains("Create New").click();
    cy.get("tbody").find("tr").first().next().next().as("thirdRow");
    editUser("thirdRow", "Alice Springs", "alice@springs.com", 5, "Micro 1");

    cy.reload();

    cy.get("@firstRow")
      .find("input[name='name']")
      .should("have.value", "Ben Wainwright");
    cy.get("@firstRow")
      .find("input[name='email']")
      .should("have.value", "bwainwright28@gmail.com");
    cy.get("@firstRow")
      .find("input[name='daysPerWeek']")
      .should("have.value", 5);
    cy.get("@firstRow").find("input[name='plan']").should("have.value", "EQ 2");

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

    cy.get("@thirdRow")
      .find("input[name='name']")
      .should("have.value", "Alice Springs");
    cy.get("@thirdRow")
      .find("input[name='email']")
      .should("have.value", "alice@springs.com");
    cy.get("@thirdRow")
      .find("input[name='daysPerWeek']")
      .should("have.value", 5);
    cy.get("@thirdRow")
      .find("input[name='plan']")
      .should("have.value", "Micro 1");
  });

  describe("the delete button", () => {
    it("Should allow you to delete a row after you've confirmed", () => {
      cy.visit("/customers");

      cy.contains("Create New").click();

      cy.get("tbody").find("tr").as("firstRow");
      editUser(
        "firstRow",
        "Ben Wainwright",
        "bwainwright28@gmail.com",
        5,
        "EQ 2"
      );

      cy.contains("Create New").click();
      cy.get("tbody").find("tr").first().next().as("secondRow");
      editUser(
        "secondRow",
        "Lawrence Davis",
        "lawrence@lawrencedavis.me",
        6,
        "Ultra-Micro 1"
      );

      cy.get("tbody").find("tr").first().next().contains("Delete").click();
      cy.contains("Yes").click();
      cy.get("tbody").find("tr").should("have.length", 1);
    });

    it("Does not delete a row if you click on the confirm dialog", () => {
      cy.visit("/customers");

      cy.contains("Create New").click();

      cy.get("tbody").find("tr").as("firstRow");
      editUser(
        "firstRow",
        "Ben Wainwright",
        "bwainwright28@gmail.com",
        5,
        "EQ 2"
      );

      cy.contains("Create New").click();
      cy.get("tbody").find("tr").first().next().as("secondRow");
      editUser(
        "secondRow",
        "Lawrence Davis",
        "lawrence@lawrencedavis.me",
        6,
        "Ultra-Micro 1"
      );

      cy.get("tbody").find("tr").first().next().contains("Delete").click();
      cy.contains("No").click();
      cy.get("tbody").find("tr").should("have.length", 2);
    });
  });
});