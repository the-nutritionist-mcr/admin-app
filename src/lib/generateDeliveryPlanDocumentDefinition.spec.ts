import { createMealWithVariantString, createVariant } from "../lib/plan-meals";
import Customer from "../domain/Customer";
import Recipe from "../domain/Recipe";
import generateDeliveryPlanDocumentDefinition from "./generateDeliveryPlanDocumentDefinition";
import { mock } from "jest-mock-extended";
import { mocked } from "ts-jest/utils";

jest.mock("../lib/plan-meals");

describe("generateDeliveryPlanPdf", () => {
  it("Creates a table containing the correct number of columns", () => {
    const mockCustomerOne = mock<Customer>();
    mockCustomerOne.firstName = "Ben";
    mockCustomerOne.surname = "Wainwright";
    mockCustomerOne.salutation = "Mr";
    mockCustomerOne.address = "address-one,nextline";

    const mockCustomerTwo = mock<Customer>();
    mockCustomerTwo.firstName = "Lawrence";
    mockCustomerTwo.surname = "Davis";
    mockCustomerTwo.salutation = "Mrs";
    mockCustomerTwo.address = "address-two,nextline";

    const recipes = [
      mock<Recipe>(),
      mock<Recipe>(),
      mock<Recipe>(),
      mock<Recipe>(),
      mock<Recipe>(),
    ];

    const selection = [
      {
        customer: mockCustomerOne,
        meals: [recipes[0], recipes[1]],
      },
      {
        customer: mockCustomerTwo,
        meals: [recipes[2], recipes[3], recipes[4]],
      },
    ];

    mocked(createMealWithVariantString, true).mockReturnValue("foo");
    mocked(createVariant, true).mockReturnValue({
      customisation: false,
      allergen: false,
      mealWithVariantString: "foo",
      string: "foo",
    });

    const definition = generateDeliveryPlanDocumentDefinition(
      selection,
      recipes
    );

    expect(definition).toEqual(
      expect.objectContaining({
        pageOrientation: "landscape",
        defaultStyle: {
          fontSize: 10,
        },
        styles: {
          header: {
            fontSize: 22,
            bold: true,
            lineHeight: 1.5,
          },
        },
        content: expect.arrayContaining([
          {
            text: expect.stringContaining("TNM Delivery Plan (printed"),
            style: "header",
          },
          expect.objectContaining({
            table: {
              headerRows: 0,
              dontBreakRows: true,
              body: [
                [
                  [
                    { fontSize: 13, bold: true, text: "Davis, Lawrence" },
                    "address-two",
                    "nextline",
                  ],
                  "foo",
                  "foo",
                  "foo",
                ],
                [
                  [
                    { fontSize: 13, bold: true, text: "Wainwright, Ben" },
                    "address-one",
                    "nextline",
                  ],
                  "foo",
                  "foo",
                  "",
                ],
              ],
            },
          }),
        ]),
      })
    );
  });
});
