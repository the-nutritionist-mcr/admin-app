import AWS from "aws-sdk";
import log from "loglevel";
const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

const NUM_TABS = 4;

export const getAll = async <T>(table: string): Promise<T[]> => {
  /* eslint-disable @typescript-eslint/naming-convention */
  const params = {
    TableName: table,
  };

  log.trace(JSON.stringify(params), null, NUM_TABS);
  const result = await dynamoDb.scan(params).promise();
  return (result.Items as T[] | undefined) ?? [];
  /* eslint-enable @typescript-eslint/naming-convention */
};

export const getAllByGsis = async <T>(
  table: string,
  indexName: string,
  ids: string[]
): Promise<T[]> => {
  if (ids.length === 0) {
    return [];
  }
  const results = await Promise.all(
    ids.map(async (id) => {
      /* eslint-disable @typescript-eslint/naming-convention */
      const params = {
        TableName: table,
        IndexName: indexName,
        KeyConditionExpression: `${indexName} = :indexKey`,

        ExpressionAttributeValues: {
          ":indexKey": id,
        },
      };

      log.trace(JSON.stringify(params), null, NUM_TABS);
      return dynamoDb.query(params).promise();
    })
  );
  /* eslint-enable @typescript-eslint/naming-convention */

  return results.flatMap((item) => item.Items ?? []) as T[];
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
        Keys: Array.from(new Set(ids), (id) =>
          typeof id === "string" ? { id } : { [id.key]: id.value }
        ),
      },
    },
  };

  log.trace(JSON.stringify(batchParams), null, NUM_TABS);

  const results = await dynamoDb.batchGet(batchParams).promise();
  /* eslint-enable @typescript-eslint/naming-convention */

  return results.Responses ? (results.Responses[table] as T[]) : [];
};

export const putAll = async <T>(
  items: { table: string; record: T }[]
): Promise<void> => {
  if (items.length === 0) {
    return;
  }
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
  log.trace(JSON.stringify(params), null, NUM_TABS);

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

  log.trace(JSON.stringify(params), null, NUM_TABS);
  await dynamoDb.put(params).promise();
};

export const deleteAll = async (
  items: {
    table: string;
    id: string;
  }[]
): Promise<void> => {
  if (items.length === 0) {
    return;
  }
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

  /* eslint-enable @typescript-eslint/naming-convention */
  log.trace(JSON.stringify(params), null, NUM_TABS);

  await dynamoDb.transactWrite(params).promise();
};
