describe("The exclusions page", () => {
  it("should render a page with the correct title", () => {
    cy.visit("/exclusions");
    cy.get("h2").contains("Exclusions");
  });

  it("should contain an empty table on first load", () => {
    cy.visit("/exclusions");
    cy.get("table").find("tr").should("have.length", 1);
  });

  it("should allow you to add and edit a couple of exclusions which persist after page reload", () => {
    cy.visit("/exclusions");
    cy.createExclusion("Chillis", false);
    cy.createExclusion("Nuts", true);
    cy.createExclusion("Fish", false);

    cy.reload();

    cy.get("tbody").find("tr").first().as("firstRow");

    cy.get("@firstRow")
      .find("input[name='name']")
      .should("have.value", "Chillis");
    cy.get("@firstRow")
      .find("input[name='allergen']")
      .should("not.have.attr", "checked");

    cy.get("tbody").find("tr").first().next().as("secondRow");
    cy.get("@secondRow")
      .find("input[name='name']")
      .should("have.value", "Nuts");
    cy.get("@secondRow")
      .find("input[name='allergen']")
      .should("have.attr", "checked");

    cy.get("tbody").find("tr").last().as("thirdRow");
    cy.get("@thirdRow").find("input[name='name']").should("have.value", "Fish");
    cy.get("@thirdRow")
      .find("input[name='allergen']")
      .should("not.have.attr", "checked");
  });

  it("should allow you to create exclusions that can be added to recipes", () => {
    cy.visit("/exclusions");
    cy.createExclusion("Chillis", false);
    cy.createExclusion("Nuts", true);
    cy.createExclusion("Fish", true);

    cy.createRecipe("Special Salad", "A lovely salad", ["Chillis", "Fish"]);
    cy.get("tbody")
      .find("input[name='exclusions']")
      .should("have.value", "Chillis, Fish");
  });

  it("should allow you to create exclusions that can be added to customers", () => {
    cy.visit("/exclusions");
    cy.createExclusion("Chillis", false);
    cy.createExclusion("Nuts", true);
    cy.createExclusion("Fish", true);

    cy.createCustomer(
      "Ben Wainwright",
      "bwainwright28@gmail.com",
      5,
      "Mass 1",
      ["Nuts", "Fish"]
    );

    cy.get("tbody")
      .find("input[name='exclusions']")
      .should("have.value", "Nuts, Fish");
  });
});