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
          baz: 8,
          bap: 2,
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
          foo: 1,
          bar: 8,
        },
      },
    ];

    const definition = generateCookPlanDocumentDefinition(plan);

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
                  { ul: ["baz x 8", "bap x 2"] },
                ],
                [
                  { text: "bar", fontSize: 15, bold: true },
                  { ul: ["foo x 1", "bar x 8"] },
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
