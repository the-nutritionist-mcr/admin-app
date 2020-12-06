import AWS from "aws-sdk";
const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

export const getAll = async (
  table: string
): Promise<Record<string, unknown>[]> => {
  /* eslint-disable @typescript-eslint/naming-convention */
  const params = {
    TableName: table,
  };
  const result = await dynamoDb.scan(params).promise();
  return result.Items ?? [];
  /* eslint-enable @typescript-eslint/naming-convention */
};

export const getAllByIds = async (
  table: string,
  ids: (string | { key: string; value: string })[]
): Promise<Record<string, unknown>[]> => {
  /* eslint-disable @typescript-eslint/naming-convention */
  if (ids.length === 0) {
    return [];
  }
  const batchParams = {
    RequestItems: {
      [table]: {
        Keys: ids.map((id) =>
          typeof id === "string" ? { id } : { [id.key]: id.value }
        ),
      },
    },
  };

  const results = await dynamoDb.batchGet(batchParams).promise();
  /* eslint-enable @typescript-eslint/naming-convention */

  return results.Responses ? results.Responses[table] : [];
};

export const putAll = async (
  items: { table: string; record: Record<string, unknown> }[]
): Promise<void> => {
  /* eslint-disable @typescript-eslint/naming-convention */
  const params = {
    TransactItems: items.map((item) => ({
      Put: {
        TableName: item.table,
        Item: item.record,
      },
    })),
  };

  /* eslint-enable @typescript-eslint/naming-convention */

  await dynamoDb.transactWrite(params).promise();
};

export const updateById = async (
  table: string,
  id: string,
  record: Record<string, unknown>
): Promise<void> => {};

export const deleteAll = async (
  items: {
    table: string;
    id: string;
  }[]
): Promise<void> => {
  /* eslint-disable @typescript-eslint/naming-convention */
  const params = {
    TransactItems: items.map((item) => ({
      Delete: {
        TableName: item.table,
        Key: {
          id: item.id,
        },
      },
    })),
  };

  /* eslint-enable @typescript-eslint/naming-convention */

  await dynamoDb.transactWrite(params).promise();
};
