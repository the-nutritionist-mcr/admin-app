type NullToUndefined<T> = T extends null ? undefined : T;

type NullsConvertedToUndefined<T> = {
  [K in keyof T]: NullToUndefined<T[K]>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertNullsToUndefined = <T extends { [key: string]: any }>(
  thing: T
): NullsConvertedToUndefined<T> =>
  // eslint-disable-next-line unicorn/no-reduce
  Object.keys(thing).reduce<T>(
    (previous, key) => ({
      ...previous,
      [key]: thing[key] === null ? undefined : thing[key],
    }),
    thing
  );

export default convertNullsToUndefined;
