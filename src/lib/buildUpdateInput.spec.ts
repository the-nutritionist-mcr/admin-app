import buildUpdateInput from "./buildUpdateInput";

describe("Build update input", () => {
  it("Returns data with the correct table name", () => {
    const output = buildUpdateInput("foo-table", "foo-id", {});

    expect(output.TableName).toEqual("foo-table");
  });

  it("Returns data with the id set on the Key property", () => {
    const output = buildUpdateInput("foo-table", "foo-id", {});
    expect(output.Key).toEqual({ id: "foo-id" });
  });

  it("creates the correct update expression for single level objects", () => {
    const output = buildUpdateInput("foo-table", "foo-id", {
      foo: "bar",
      bar: "baz",
    });
    expect(output.UpdateExpression).toEqual("set foo = :foo, bar = :bar");
  });

  it("creates the correct update expression for multi level objects", () => {
    const output = buildUpdateInput("foo-table", "foo-id", {
      foo: "bar",
      bing: {
        bar: "baz",
        bash: "bop",
      },
    });

    expect(output.Expected);
  });

  it("creates the correct attributevalues for single level objects", () => {
    const output = buildUpdateInput("foo-table", "foo-id", {
      foo: "bar",
      bar: "baz",
    });

    expect(output.ExpressionAttributeValues).toEqual({
      ":foo": "bar",
      ":bar": "baz",
    });
  });
});
