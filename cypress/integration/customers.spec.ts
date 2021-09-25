import { COGNITO_PASSWORD, COGNITO_USER } from "../support/constants";
import { deleteDownloadsFolder } from "../utils";

describe("The customers page", () => {
  before(() => {
    cy.seed();
  });

  describe("when logged in", () => {
    beforeEach(() => {
      deleteDownloadsFolder();
      cy.loginByCognitoApi(COGNITO_USER, COGNITO_PASSWORD);
      cy.visit("/");
      cy.contains("Customers").click();
    });

    it("should render a page with the correct title", () => {
      cy.get("h2").contains("Customers");
    });

    it("should allow you to create a user that is persisted on the customer list", () => {
      cy.get("header").contains("Customers").click();
      cy.contains("New").click();

      cy.selectFromDrop('[name="salutation"]', "Mrs");
      cy.get("[name='firstName']").type("Alice");
      cy.get("[name='surname']").type("Jones");
      cy.get("[name='paymentDayOfMonth']").type("1");

      cy.selectFromDatePicker("startDate", new Date("2021-08-02"));
      cy.get("[name='telephone']").type("07772123123");
      cy.get("[name='email']").type("abc@foo.com");
      cy.get("[name='address']").type("1 some street\nSome City\nA1 BC23");
      cy.get("[name='notes']").type("Some notes!");

      cy.selectFromDrop('[data-testid="daysPerWeek"]', "5");
      cy.selectFromDrop('[data-testid="mealsPerDay"]', "2");
      cy.selectFromDrop('[data-testid="totalPlans"]', "1");
      cy.selectFromDrop('[data-testid="planVariant"]', "Mass");
      cy.selectFromDrop('[data-testid="delivery-0-select"]', "Tuesday");
      cy.selectFromDrop('[data-testid="delivery-1-select"]', "Friday");

      cy.get("span").contains("Snack").click();
      cy.get("button").contains("Save").click();

      cy.get("h2").should("contain", "Customers");
      cy.get("a").contains("Jones Alice (Mrs)").click();

      cy.get("[name='firstName']").should("have.value", "Alice");
      cy.get("[name='salutation']").should("have.value", "Mrs");
      cy.get("tr")
        .contains("Mass")
        .within(() => {
          cy.get('input[value="6"]').should("exist");
          cy.get('input[value="4"]').should("exist");
        });
    });

    it("should allow you to download a csv file containing all the customers", () => {
      cy.get("header").contains("Customers").click();
      cy.intercept("*", (req, resp) => {
        Cypress.log({
          message: [req]
        });

        Cypress.log({
          message: [resp]
        });
      });
      cy.contains("Download CSV").click();
    });
  });
});
