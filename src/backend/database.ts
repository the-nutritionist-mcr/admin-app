import AWS from "aws-sdk";
const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

export const getAll = async <T>(table: string): Promise<T[]> => {
  /* eslint-disable @typescript-eslint/naming-convention */
  const params = {
    TableName: table,
  };
  const result = await dynamoDb.scan(params).promise();
  return (result.Items as T[] | undefined) ?? [];
  /* eslint-enable @typescript-eslint/naming-convention */
};

export const getAllByIds = async <T>(
  table: string,
  ids: (string | { key: string; value: string })[]
): Promise<T[]> => {
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

  return results.Responses ? (results.Responses[table] as T[]) : [];
};

export const putAll = async <T>(
  items: { table: string; record: T }[]
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

export const updateById = async <T>(
  table: string,
  id: string,
  record: T
): Promise<void> => {
  /* eslint-disable @typescript-eslint/naming-convention */
  const params = {
    TableName: table,
    Key: {
      id,
    },
    Item: record,
  };
  /* eslint-enable @typescript-eslint/naming-convention */
  await dynamoDb.put(params).promise();
};

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
