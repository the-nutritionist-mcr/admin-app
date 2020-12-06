import {
  AllQueryVariables,
  CreateCustomerMutationVariables,
  DeleteCustomerMutationVariables,
  ListCustomersQueryVariables,
} from "./query-variables-types";
import AWS from "aws-sdk";
import { AppSyncResolverEvent } from "aws-lambda";
import Customer from "../domain/Customer";
import Exclusion from "../domain/Exclusion";
import * as uuid from "uuid";

const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

export const isListCustomersQuery = (
  event: AppSyncResolverEvent<AllQueryVariables>
): event is AppSyncResolverEvent<ListCustomersQueryVariables> => {
  return event.info.fieldName === "listCustomers";
};

export const listCustomers = async (): Promise<Customer[] | null> => {
  if (!process.env.CUSTOMERS_TABLE) {
    throw new Error("process.env.CUSTOMERS_TABLE name not set!");
  }

  try {
    /* eslint-disable @typescript-eslint/naming-convention */
    const params = {
      TableName: process.env.CUSTOMERS_TABLE,
    };

    const result = await dynamoDb.scan(params).promise();

    const customerData = (result.Items ??
      []) as (CreateCustomerMutationVariables["input"] & { id: string })[];

    const exclusionIds = new Set(
      customerData
        .map((customer) => customer.exclusionIds)
        .flat()
        .filter(Boolean)
    );

    const batchParams = {
      RequestItems: {
        [process.env.EXCLUSIONS_TABLE ?? ""]: {
          Keys: Array.from(exclusionIds).map((id) => ({ id })),
        },
      },
    };

    const exclusions: Exclusion[] = ((await dynamoDb
      .batchGet(batchParams)
      .promise()) as any).Responses[process.env.EXCLUSIONS_TABLE ?? ""];

    const customers = customerData
      .map((customer) => ({
        ...customer,
        exclusions:
          customer.exclusionIds?.map((id) =>
            exclusions.find((exclusion) => exclusion.id === id)
          ) ?? [],
      }))
      .map(({ exclusionIds, ...customer }) => customer);

    return customers as Customer[];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("DynamoDB error:", error);
    return null;
  }
  /* eslint-enable @typescript-eslint/naming-convention */
};

export const isDeleteCustomerMutation = (
  event: AppSyncResolverEvent<AllQueryVariables>
): event is AppSyncResolverEvent<DeleteCustomerMutationVariables> => {
  return event.info.fieldName === "deleteCustomer";
};

export const isCreateCustomersQuery = (
  event: AppSyncResolverEvent<AllQueryVariables>
): event is AppSyncResolverEvent<CreateCustomerMutationVariables> => {
  return event.info.fieldName === "createCustomer";
};

export const createCustomer = async (
  input: CreateCustomerMutationVariables["input"]
): Promise<Customer | null> => {
  if (!process.env.CUSTOMERS_TABLE) {
    throw new Error("process.env.CUSTOMERS_TABLE name not set!");
  }

  if (!process.env.CUSTOMER_EXCLUSIONS_TABLE) {
    throw new Error("CUSTOMER_EXCLUSIONS_TABLE name not set");
  }

  if (!process.env.EXCLUSIONS_TABLE) {
    throw new Error("process.env.EXCLUSIONS_TABLE name not set");
  }

  /* eslint-disable @typescript-eslint/naming-convention */
  try {
    const batchParams = {
      RequestItems: {
        [process.env.EXCLUSIONS_TABLE]: {
          Keys: input.exclusionIds.map((id) => ({ id })),
        },
      },
    };

    const exclusions = ((await dynamoDb.batchGet(batchParams).promise()) as any)
      .Responses[process.env.EXCLUSIONS_TABLE];

    const customerId = uuid.v4();

    const { exclusionIds, ...returnedCustomer } = input;

    const customer = { ...input, id: customerId };

    const customerExclusions = exclusions.map((exclusion: Exclusion) => ({
      Put: {
        TableName: process.env.CUSTOMER_EXCLUSIONS_TABLE,
        Item: {
          id: uuid.v4(),
          customerId: customerId,
          exclusionId: exclusion.id,
        },
      },
    }));

    const transaction = {
      TransactItems: [
        {
          Put: {
            TableName: process.env.CUSTOMERS_TABLE,
            Item: customer,
          },
        },
        ...customerExclusions,
      ],
    };

    await dynamoDb.transactWrite(transaction).promise();

    return {
      ...returnedCustomer,
      id: uuid.v4(),
      exclusions,
    };
  } catch (err) {
    console.log("DynamoDB error: ", JSON.stringify(err));
    return null;
  }
  /* eslint-enable @typescript-eslint/naming-convention */
};

export const isDeleteCustomerMutation = (
  event: AppSyncResolverEvent<AllQueryVariables>
): event is AppSyncResolverEvent<CreateCustomerMutationVariables> => {
  return event.info.fieldName === "createCustomer";
};
