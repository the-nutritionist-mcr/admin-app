import CookPlan from "../types/CookPlan";
import { HotOrCold } from "../domain/Recipe";
import generateCookPlanDocumentDefinition from "./generateCookPlanDocumentDefinition";

describe("generateCookPlanDocumentDefinition", () => {
  it("Creates a table containing the correct number of columns", () => {
    const plan: CookPlan = [
      {
        recipe: {
          id: "0",
          name: "foo",
          shortName: "f",
          hotOrCold: HotOrCold.Hot,
          potentialExclusions: [],
        },
        plan: {
          baz: {
            customisation: false,
            allergen: false,
            count: 8,
          },
          bap: {
            count: 2,
            allergen: false,
            customisation: false,
          },
        },
      },
      {
        recipe: {
          id: "1",
          name: "bar",
          shortName: "b",
          hotOrCold: HotOrCold.Hot,
          potentialExclusions: [],
        },
        plan: {
          foo: {
            count: 1,
            allergen: false,
            customisation: false,
          },
          bar: {
            count: 8,
            allergen: false,
            customisation: false,
          },
        },
      },
    ];

    const definition = generateCookPlanDocumentDefinition({
      plan,
      extras: { breakfast: 0, snack: 0, largeSnack: 0 },
    });

    expect(definition).toEqual(
      expect.objectContaining({
        content: expect.arrayContaining([
          {
            text: expect.stringContaining("TNM Cook Plan (printed"),
            style: "header",
          },
          {
            table: {
              headerRows: 0,
              widths: ["*", "*"],
              body: [
                [
                  { text: "foo", fontSize: 15, bold: true },
                  {
                    ul: ["bap x 2", "baz x 8"],
                  },
                ],
                [
                  { text: "bar", fontSize: 15, bold: true },
                  {
                    ul: ["bar x 8", "foo x 1"],
                  },
                ],
                expect.anything(),
                [
                  { text: "Total cooked", fontSize: 15, bold: true },
                  { text: `19 meals`, fontSize: 15, bold: true },
                ],
              ],
            },
          },
        ]),
        pageOrientation: "portrait",
        defaultStyle: {
          fontSize: 13,
        },
        styles: {
          header: {
            fontSize: 22,
            bold: true,
            lineHeight: 1.5,
          },
        },
      })
    );
  });
});
