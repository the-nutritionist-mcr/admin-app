import * as database from "./database";
import * as exclusions from "./exclusions";
import { resetAllWhenMocks, when } from "jest-when";
import Exclusion from "../domain/Exclusion";
import { mocked } from "ts-jest/utils";

jest.mock("./database");

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
  resetAllWhenMocks();
  delete process.env.EXCLUSIONS_TABLE;
});

describe("List exclusions", () => {
  it("Rejects the promise if EXCLUSIONS_TABLE is not set", async () => {
    await expect(exclusions.listExclusions()).rejects.toThrow(
      new Error("process.env.EXCLUSIONS_TABLE name not set!")
    );
  });

  it("Correctly returns exclusions acquired from getAll", async () => {
    process.env.EXCLUSIONS_TABLE = "exclusions-table";
    const mockExclusions: Exclusion[] = [
      {
        id: "2",
        name: "baz",
        allergen: false,
      },
      {
        id: "3",
        name: "bap",
        allergen: false,
      },
    ];

    when(mocked(database.getAll, true))
      .calledWith("exclusions-table")
      .mockResolvedValue(
        (mockExclusions as unknown) as Record<string, unknown>[]
      );

    const results = await exclusions.listExclusions();
    expect(results).toEqual(mockExclusions);
  });
});
