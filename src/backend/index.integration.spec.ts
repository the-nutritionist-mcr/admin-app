import Customer, { Snack } from "../domain/Customer";
import AWS from "aws-sdk";
import Exclusion from "../domain/Exclusion";
import { handler } from ".";

const dynamoDb = new AWS.DynamoDB({ region: "us-east-1" });

describe("The backend lambda", () => {
  process.env.CUSTOMERS_TABLE = "jest-tnm-admin-customer-table";
  process.env.CUSTOMER_EXCLUSIONS_TABLE =
    "jest-tnm-admin-customer-exclusions-table";
  process.env.EXCLUSIONS_TABLE = "jest-tnm-admin-exclusions-table";

  const customers = process.env.CUSTOMERS_TABLE;
  const exclusions = process.env.EXCLUSIONS_TABLE;
  const customerExclusions = process.env.CUSTOMER_EXCLUSIONS_TABLE;

  const createTables = async (): Promise<void> => {
    await [customers, exclusions, customerExclusions].reduce(
      async (previousPromise, table) => {
        await previousPromise;
        const params = {
          TableName: table,
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],

          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
          },
        };
        console.log(`Creating ${table}`);
        return await dynamoDb.createTable(params).promise();
      },
      Promise.resolve()
    );
  };

  beforeAll(async () => {
    await createTables();
    await Promise.all(
      [customers, exclusions, customerExclusions].map((table) =>
        dynamoDb.waitFor("tableExists", { TableName: table }).promise()
      )
    );
  });

  afterAll(async () => {
    await [customers, exclusions, customerExclusions].reduce(
      async (previousPromise, table): Promise<void> => {
        await previousPromise;
        console.log(`Waiting for ${table} to exist`);
        dynamoDb.waitFor("tableExists", { TableName: table }).promise();
        console.log(`Table exists, deleting...`);
        await dynamoDb.deleteTable({ TableName: table }).promise();
        console.log(`${table} deleted`);
      },
      Promise.resolve()
    );
  });

  describe("listCustomers", () => {
    it("Returns an empty array at the start", async () => {
      const event = {
        info: {
          fieldName: "createCustomer",
        },
        arguments: {
          input: {
            name: "Ben",
            exclusionIds: ["1", "2"],
          },
        },
      };
      //  const result = await handler(event as any, {} as any, {} as any);

      // expect(result).toBeInstanceOf(Array);
      //expect(result).toHaveLength(0);
    });
  });

  it("Returns the customers including their exclusions when you call list customers", () => {
    const exclusion: Exclusion = {
      id: "1",
      name: "rice",
      allergen: false,
    };

    const exclusionTwo: Exclusion = {
      id: "1",
      name: "rice",
      allergen: false,
    };

    const customer: Customer = {
      id: "0",
      firstName: "ben",
      surname: "wainwright",
      salutation: "mr",
      address: "foo",
      telephone: "123123",
      paymentDayOfMonth: 2,
      email: "a@b.c",
      daysPerWeek: 2,
      plan: {
        name: "Mass 1",
        mealsPerDay: 3,
        costPerMeal: 200,
        category: "Mass",
      },
      snack: Snack.Large,
      breakfast: true,
      exclusions: [exclusion],
    };

    const customerTwo: Customer = {
      id: "2",
      firstName: "someone",
      surname: "else",
      salutation: "mr",
      address: "foo",
      telephone: "123123",
      paymentDayOfMonth: 2,
      email: "a@b.c",
      daysPerWeek: 2,
      plan: {
        name: "Mass 1",
        mealsPerDay: 3,
        costPerMeal: 200,
        category: "Mass",
      },
      snack: Snack.Large,
      breakfast: true,
      exclusions: [exclusion, exclusionTwo],
    };
  });
});
