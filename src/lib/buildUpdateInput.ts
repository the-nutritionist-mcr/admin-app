import AWS from "aws-sdk";

type UpdateInput = AWS.DynamoDB.DocumentClient.UpdateItemInput;

const buildUpdateInput = (
  table: string,
  id: string,
  record: Record<string, unknown>
): UpdateInput => {
  const keyNames = `set ${Object.keys(record)
    .map((key) => `${key} = :${key}`)
    .join(", ")}`;

  const values = Object.keys(record).reduce<Record<string, unknown>>(
    (currentValue, key) => {
      currentValue[`:${key}`] = record[key];
      return currentValue;
    },
    {}
  );

  /* eslint-disable @typescript-eslint/naming-convention */
  return {
    TableName: table,
    Key: { id },
    UpdateExpression: keyNames,
    ExpressionAttributeValues: values,
  };
  /* eslint-enable @typescript-eslint/naming-convention */
};

export default buildUpdateInput;
