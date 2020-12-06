import { handler } from "./index";

process.env.CUSTOMERS_TABLE = "dev-tnm-admin-customers-table";
process.env.CUSTOMER_EXCLUSIONS_TABLE =
  "dev-tnm-admin-customer-exclusions-table";
process.env.EXCLUSIONS_TABLE = "dev-tnm-admin-exclusions-table";

const event = {
  info: {
    fieldName: "listCustomers",
  },
  arguments: {
    input: {
      name: "Ben",
      exclusionIds: ["1", "2"],
    },
  },
};

const result = handler(event as any, {} as any, {} as any);

(result as any).then((returnVal: any) => {
  console.log(returnVal);
  try {
    console.log(JSON.stringify(returnVal, null, 4));
  } catch (error) {
    console.log(error);
  }
});
