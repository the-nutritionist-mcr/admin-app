/**
 * Implementation is based on https://tools.ietf.org/html/rfc4180#section-2
 */
const containsStringOf = (field: string, chars: string[]) =>
  chars.some((char) => field.includes(char));

const joinFields = (fields: string[]) =>
  fields
    .map((field) => field.replace(/"/gu, '""'))
    .map((field) =>
      containsStringOf(field, [",", '"', "\r\n"]) ? `"${field}"` : field
    )
    .join(",");

interface ArbitraryObjectType {
  [key: string]: string;
}

const generateCsvStringFromObjectArray = (
  inputObjectArray: ArbitraryObjectType[]
): string => {
  if (inputObjectArray.length === 0) {
    throw new Error(
      "inputObjectArray.length must have a length greater than zero"
    );
  }

  const keys = Object.keys(inputObjectArray[0]);

  const rows = inputObjectArray
    .map((rowObject) => joinFields(keys.map((key) => rowObject[key])))
    .join("\r\n");

  return `${joinFields(keys)}\r\n${rows}`;
};

export default generateCsvStringFromObjectArray;
