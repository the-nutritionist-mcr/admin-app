import * as AWS from "aws-sdk";
import * as AWSMock from "aws-sdk-mock";
import * as database from "./database";

afterEach(() => {
  jest.clearAllMocks();
  AWSMock.restore("DynamoDB.DocumentClient")
});

describe("the getAllByIds method", () => {
  it("calls multiple tables when supplied an array for the table argument", async () => {
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock(
      "DynamoDB.DocumentClient",
      "batchGet",
      (
        params: AWS.DynamoDB.DocumentClient.BatchGetItemInput,
        callback: (
          error: Error | undefined,
          data: AWS.DynamoDB.DocumentClient.BatchGetItemOutput
        ) => void
      ) => {
        expect(params.RequestItems["foo"].Keys).toEqual([
          { id: "1" },
          { id: "2" },
        ]);

        expect(params.RequestItems["bar"].Keys).toEqual([
          { id: "1" },
          { id: "2" },
        ]);

        expect(params.RequestItems["baz"].Keys).toEqual([
          { id: "1" },
          { id: "2" },
        ]);
        callback(undefined, {
          Responses: { foo: [], bar: [], baz: [{ foo: "baz" }] },
        });
      }
    );

    const response = await database.getAllByIdsMultiTable(
      ["foo", "bar", "baz"],
      ["1", "2"]
    );

    expect(response).toHaveLength(1);
    expect(response[0]).toEqual({ foo: "baz" });
  });

  it("still works propertly when there is a single table", async () => {
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock(
      "DynamoDB.DocumentClient",
      "batchGet",
      (
        params: AWS.DynamoDB.DocumentClient.BatchGetItemInput,
        callback: (
          error: Error | undefined,
          data: AWS.DynamoDB.DocumentClient.BatchGetItemOutput
        ) => void
      ) => {
        expect(params.RequestItems["foo"].Keys).toEqual([
          { id: "1" },
          { id: "2" },
        ]);
        callback(undefined, {
          Responses: { foo: [{ foo: "baz" }] },
        });
      }
    );

    const response = await database.getAllByIdsMultiTable(
      "foo",
      ["1", "2"]
    );

    expect(response).toHaveLength(1);
    expect(response[0]).toEqual({ foo: "baz" });
  });
});

describe("The deleteAll method", () => {
  it("batches items into groups of 25 when passing them through to transactWrite", async () => {
    AWSMock.setSDKInstance(AWS);
    const paramsReceived: AWS.DynamoDB.TransactWriteItemsInput[] = [];
    AWSMock.mock(
      "DynamoDB.DocumentClient",
      "transactWrite",
      (
        params: AWS.DynamoDB.TransactWriteItemsInput,
        callback: (error: Error | undefined) => void
      ) => {
        paramsReceived.push(params);
        callback(undefined);
      }
    );

    const items = [
      { table: "foo-table", id: "0" },
      { table: "foo-table", id: "1" },
      { table: "foo-table", id: "2" },
      { table: "foo-table", id: "3" },
      { table: "foo-table", id: "4" },
      { table: "foo-table", id: "5" },
      { table: "foo-table", id: "6" },
      { table: "foo-table", id: "7" },
      { table: "foo-table", id: "8" },
      { table: "foo-table", id: "9" },
      { table: "foo-table", id: "10" },
      { table: "foo-table", id: "11" },
      { table: "foo-table", id: "12" },
      { table: "foo-table", id: "13" },
      { table: "foo-table", id: "14" },
      { table: "foo-table", id: "15" },
      { table: "foo-table", id: "16" },
      { table: "foo-table", id: "17" },
      { table: "foo-table", id: "18" },
      { table: "foo-table", id: "19" },
      { table: "foo-table", id: "20" },
      { table: "foo-table", id: "21" },
      { table: "foo-table", id: "22" },
      { table: "foo-table", id: "23" },
      { table: "foo-table", id: "24" },
      { table: "foo-table", id: "25" },
      { table: "foo-table", id: "26" },
      { table: "foo-table", id: "26" },
      { table: "foo-table", id: "27" },
      { table: "foo-table", id: "28" },
    ];

    await database.deleteAll(items);

    expect(paramsReceived).toHaveLength(2);
    expect(paramsReceived[0].TransactItems).toHaveLength(25);
    expect(paramsReceived[1].TransactItems).toHaveLength(5);
    expect(paramsReceived[0].TransactItems[24].Update?.Key.id).toEqual("24");
    expect(paramsReceived[1].TransactItems[0].Update?.Key.id).toEqual("25");
    expect(paramsReceived[1].TransactItems[4].Update?.Key.id).toEqual("28");
  });
});
