describe("The pause button", () => {
  it("results in customers being excluded from the plan when they are paused", () => {
    cy.clock(Date.UTC(2020, 10, 17));
    cy.visit("/");

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
      "Mr",
      "Alex",
      "Jones",
      1,
      "a@b.c",
      "Mass 3",
      5,
      "None",
      true,
      "Somewhere",
      [],
      "",
      4,
      ""
    );

    cy.createCustomer(
      "Mr",
      "Chris",
      "Evans",
      1,
      "a@b.c",
      "Mass 3",
      5,
      "None",
      true,
      "Somewhere",
      [],
      "",
      4,
      ""
    );

    cy.createRecipe("a", "Foo", []);
    cy.createRecipe("b", "Foo", []);
    cy.createRecipe("c", "Foo", []);
    cy.createRecipe("d", "Foo", []);
    cy.createRecipe("e", "Foo", []);
    cy.createRecipe("f", "Foo", []);

    cy.get("header").contains("Customers").click();

    cy.get("tbody")
      .find("tr")
      .first()
      .next()
      .find("button[aria-label='Pause']")
      .click();

    cy.get("div[aria-label='Start Pause']").contains("16").click();
    cy.get("div[aria-label='End Pause']").contains("30").click();
    cy.contains("Ok").click();

    cy.get("header").contains("Planner").click();

    cy.get("input[name='selectDay']").click({ force: true });
    cy.get("div[data-g-portal-id='0']")
      .contains("Monday")
      .click({ force: true });

    cy.get("input[name='meal-0']").click({ force: true });
    cy.get("div[data-g-portal-id='0']").contains("a").click({ force: true });

    cy.get("input[name='meal-1']").click({ force: true });
    cy.get("div[data-g-portal-id='0']").contains("b").click({ force: true });

    cy.get("input[name='meal-2']").click({ force: true });
    cy.get("div[data-g-portal-id='0']").contains("c").click({ force: true });

    cy.get("input[name='meal-3']").click({ force: true });
    cy.get("div[data-g-portal-id='0']").contains("d").click({ force: true });

    cy.get("input[name='meal-4']").click({ force: true });
    cy.get("div[data-g-portal-id='0']").contains("e").click({ force: true });

    cy.get("input[name='meal-5'").click({ force: true });
    cy.get("div[data-g-portal-id='0']").contains("f").click({ force: true });

    cy.get("tbody").last().should("not.contain", "Alex");
  });

  it("results in customers that reappear on the plan when their pause has expired", () => {
    cy.clock(Date.UTC(2020, 11, 17));

    cy.visit("/");

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
      "Mr",
      "Alex",
      "Jones",
      1,
      "a@b.c",
      "Mass 3",
      5,
      "None",
      true,
      "Somewhere",
      [],
      "",
      4,
      ""
    );

    cy.createCustomer(
      "Mr",
      "Chris",
      "Evans",
      1,
      "a@b.c",
      "Mass 3",
      5,
      "None",
      true,
      "Somewhere",
      [],
      "",
      4,
      ""
    );

    cy.createRecipe("a", "Foo", []);
    cy.createRecipe("b", "Foo", []);
    cy.createRecipe("c", "Foo", []);
    cy.createRecipe("d", "Foo", []);
    cy.createRecipe("e", "Foo", []);
    cy.createRecipe("f", "Foo", []);

    cy.get("header").contains("Customers").click();

    cy.get("tbody")
      .find("tr")
      .first()
      .next()
      .find("button[aria-label='Pause']")
      .click();

    cy.get("div[aria-label='Start Pause']").contains("16").click();
    cy.get("div[aria-label='End Pause']").contains("30").click();
    cy.contains("Ok").click();

    cy.get("header").contains("Planner").click();

    cy.get("input[name='selectDay']").click({ force: true });
    cy.get("div[data-g-portal-id='0']")
      .contains("Monday")
      .click({ force: true });

    cy.get("input[name='meal-0']").click({ force: true });
    cy.get("div[data-g-portal-id='0']").contains("a").click({ force: true });

    cy.get("input[name='meal-1']").click({ force: true });
    cy.get("div[data-g-portal-id='0']").contains("b").click({ force: true });

    cy.get("input[name='meal-2']").click({ force: true });
    cy.get("div[data-g-portal-id='0']").contains("c").click({ force: true });

    cy.get("input[name='meal-3']").click({ force: true });
    cy.get("div[data-g-portal-id='0']").contains("d").click({ force: true });

    cy.get("input[name='meal-4']").click({ force: true });
    cy.get("div[data-g-portal-id='0']").contains("e").click({ force: true });

    cy.get("input[name='meal-5'").click({ force: true });
    cy.get("div[data-g-portal-id='0']").contains("f").click({ force: true });

    cy.get("tbody").last().contains("Alex");
  });
});
