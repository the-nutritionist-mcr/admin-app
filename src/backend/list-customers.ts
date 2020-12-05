import {
  AllQueryVariables,
  ListCustomersQueryVariables,
} from "./query-variables-types";
import AWS from "aws-sdk";
import { AppSyncResolverEvent } from "aws-lambda";
import Customer from "../domain/Customer";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const isListCustomersQuery = (
  event: AppSyncResolverEvent<AllQueryVariables>
): event is AppSyncResolverEvent<ListCustomersQueryVariables> => {
  return event.info.fieldName === "listCustomers";
};

export const listCustomers = async (): Promise<Customer[] | null> => {
  if (!process.env.CUSTOMERS_TABLE) {
    throw new Error("CUSTOMERS_TABLE name not set!");
  }

  try {
    /* eslint-disable @typescript-eslint/naming-convention */
    const params = {
      TableName: process.env.CUSTOMERS_TABLE,
    };

    const result = await dynamoDb.scan(params).promise();
    return (result.Items ?? []) as Customer[];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("DynamoDB error:", error);
    return null;
  }
  /* eslint-enable @typescript-eslint/naming-convention */
};
