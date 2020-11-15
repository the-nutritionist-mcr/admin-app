describe("The home page", () => {
  it("Should render a page with the correct title", () => {
    cy.visit("/");
    cy.get("h2").contains("Welcome");
  });
});
