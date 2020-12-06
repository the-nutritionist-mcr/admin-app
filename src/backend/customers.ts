import * as database from "./database";
import * as uuid from "uuid";
import {
  AllQueryVariables,
  CreateCustomerMutationVariables,
  CustomerExclusion,
  DeleteCustomerMutationVariables,
  ListCustomersQueryVariables,
  UpdateCustomerMutationVariables,
  UpdateExclusionMutationVariables,
} from "./query-variables-types";
import AWS from "aws-sdk";
import { AppSyncResolverEvent } from "aws-lambda";
import Customer from "../domain/Customer";
import Exclusion from "../domain/Exclusion";

const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

export const isListCustomersQuery = (
  event: AppSyncResolverEvent<AllQueryVariables>
): event is AppSyncResolverEvent<ListCustomersQueryVariables> => {
  return event.info.fieldName === "listCustomers";
};

export const listCustomers = async (): Promise<Customer[] | null> => {
  const customersTable = process.env.CUSTOMERS_TABLE;
  if (!customersTable) {
    throw new Error("process.env.CUSTOMERS_TABLE name not set!");
  }

  const exclusionsTable = process.env.EXCLUSIONS_TABLE;
  if (!exclusionsTable) {
    throw new Error("process.env.EXCLUSIONS_TABLE name not set!");
  }

  const customerExclusionsTable = process.env.CUSTOMER_EXCLUSIONS_TABLE;
  if (!customerExclusionsTable) {
    throw new Error("process.env.CUSTOMER_EXCLUSIONS_TABLE name not set!");
  }

  try {
    const customerData = (await database.getAll(
      customersTable
    )) as UpdateCustomerMutationVariables["input"][];

    const customerExclusionIds = new Set(
      customerData.flatMap((customer) => customer.exclusionIds).filter(Boolean)
    );

    const customerExclusions = ((await database.getAllByIds(
      customerExclusionsTable,
      Array.from(customerExclusionIds)
    )) as unknown) as CustomerExclusion[];

    const exclusions = ((await database.getAllByIds(
      exclusionsTable,
      customerExclusions.map(
        (customerExclusion) => customerExclusion.exclusionId
      )
    )) as unknown) as Exclusion[];

    const customers = customerData
      .map((customer) => ({
        ...customer,
        exclusions: customer.exclusionIds
          .map((id) =>
            customerExclusions.find(
              (customerExclusion) => customerExclusion.id === id
            )
          )
          .map((customerExclusion) =>
            exclusions.find(
              (exclusion) => exclusion.id === customerExclusion?.exclusionId
            )
          ),
      }))
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(({ exclusionIds, ...customer }) => customer);

    return customers as Customer[];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("DynamoDB error:", error);
    return null;
  }
  /* eslint-enable @typescript-eslint/naming-convention */
};

export const isCreateCustomersQuery = (
  event: AppSyncResolverEvent<AllQueryVariables>
): event is AppSyncResolverEvent<CreateCustomerMutationVariables> => {
  return event.info.fieldName === "createCustomer";
};

export const createCustomer = async (
  input: CreateCustomerMutationVariables["input"]
): Promise<Customer | null> => {
  const customersTable = process.env.CUSTOMERS_TABLE;
  if (!customersTable) {
    throw new Error("process.env.CUSTOMERS_TABLE name not set!");
  }

  const exclusionsTable = process.env.EXCLUSIONS_TABLE;
  if (!exclusionsTable) {
    throw new Error("process.env.EXCLUSIONS_TABLE name not set!");
  }

  const customerExclusionsTable = process.env.CUSTOMER_EXCLUSIONS_TABLE;
  if (!customerExclusionsTable) {
    throw new Error("process.env.CUSTOMER_EXCLUSIONS_TABLE name not set!");
  }

  try {
    const exclusions = ((await database.getAllByIds(
      exclusionsTable,
      input.exclusionIds
    )) as unknown) as UpdateExclusionMutationVariables["input"][];

    const customerId = uuid.v4();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { exclusionIds, ...returnedCustomer } = input;

    const customerExclusions = exclusions.map((exclusion: Exclusion) => ({
      table: customerExclusionsTable,
      record: {
        id: uuid.v4(),
        customerId,
        exclusionId: exclusion.id,
      },
    }));

    const customer = {
      ...input,
      id: customerId,
      exclusionIds: customerExclusions.map((item) => item.record.id),
    };

    const putRecords = [
      {
        table: customersTable,
        record: customer,
      },
      ...customerExclusions,
    ];

    await database.putAll(putRecords);

    return {
      ...returnedCustomer,
      id: uuid.v4(),
      exclusions,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("DynamoDB error:", JSON.stringify(error));
    return null;
  }
  /* eslint-enable @typescript-eslint/naming-convention */
};

export const deleteCustomer = async (
  input: DeleteCustomerMutationVariables["input"]
): Promise<string> => {
  const customersTable = process.env.CUSTOMERS_TABLE;
  if (!customersTable) {
    throw new Error("process.env.CUSTOMERS_TABLE name not set!");
  }

  const customerExclusionsTable = process.env.CUSTOMER_EXCLUSIONS_TABLE;
  if (!customerExclusionsTable) {
    throw new Error("process.env.CUSTOMER_EXCLUSIONS_TABLE name not set!");
  }

  const customer = ((
    await database.getAllByIds(customersTable, [input.id])
  )[0] as unknown) as UpdateCustomerMutationVariables["input"];

  const customerExclusionsToDelete = customer.exclusionIds.map((id) => ({
    table: customerExclusionsTable,
    id,
  }));

  await database.deleteAll([
    { table: customersTable, id: input.id },
    ...customerExclusionsToDelete,
  ]);
};

export const isDeleteCustomerMutation = (
  event: AppSyncResolverEvent<AllQueryVariables>
): event is AppSyncResolverEvent<DeleteCustomerMutationVariables> => {
  return event.info.fieldName === "deleteCustomer";
};

export const updateCustomer = async (
  input: UpdateCustomerMutationVariables["input"]
): Promise<Customer | null> => {
  const customersTable = process.env.CUSTOMERS_TABLE;
  if (!customersTable) {
    throw new Error("process.env.CUSTOMERS_TABLE name not set!");
  }

  const customerExclusionsTable = process.env.CUSTOMER_EXCLUSIONS_TABLE;
  if (!customerExclusionsTable) {
    throw new Error("process.env.CUSTOMER_EXCLUSIONS_TABLE name not set!");
  }

  const customerExclusions = ((await database.getAllByIds(
    customerExclusionsTable,
    [{ key: "customerId", value: "0" }]
  )) as unknown) as CustomerExclusion[];

  const toAdd = input.exclusionIds
    .filter(
      (id) =>
        !customerExclusions
          .map((customerExclusion) => customerExclusion.exclusionId)
          .includes(id)
    )
    .map((id) => ({
      table: customerExclusionsTable,
      record: { id: uuid.v4(), exclusionId: id, customerId: input.id },
    }));

  const put = database.putAll(toAdd);

  const toRemove = customerExclusions
    .filter(
      (customerExclusion) =>
        !input.exclusionIds.includes(customerExclusion.exclusionId)
    )
    .map((customerExclusion) => ({
      table: customerExclusionsTable,
      id: customerExclusion.id,
    }));

  const newIds = toAdd.map((item) => item.record.id);

  const remainingIds = customerExclusions
    .map((item) => item.id)
    .filter((id) => !toRemove.map((item) => item.id).includes(id));

  const finalExclusions = [...remainingIds, ...newIds];

  const remove = database.deleteAll(toRemove);

  const update = database.updateById(customersTable, input.id, {
    ...input,
    exclusionIds: finalExclusions,
  });

  await Promise.all([put, remove, update]);
};

export const isUpdateCustomerMutation = (
  event: AppSyncResolverEvent<AllQueryVariables>
): event is AppSyncResolverEvent<UpdateCustomerMutationVariables> => {
  return event.info.fieldName === "updateCustomer";
};
