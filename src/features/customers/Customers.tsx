import {
  Button,
  Header,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "grommet";
import { Snack } from "../../domain/Customer";

import { daysPerWeekOptions, plans } from "../../lib/config";
import CustomerRow from "./CustomerRow";
import EditCustomerDialog from "./EditCustomerDialog";
import React from "react";
import { createCustomer } from "./customersSlice";
import { useHistory } from "react-router-dom";
import { graphql, PreloadedQuery, usePreloadedQuery } from "react-relay"
import type { CustomersQuery as CustomersQueryType } from "../../__generated__/CustomersQuery.graphql"

// const convertCustomerToSimpleObject = (
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   { newPlan, ...customer }: Customer
// ): { [key: string]: string | number | boolean | null } => ({
//   ...customer,
//   plan: customer.plan.name,
//   exclusions: customer.exclusions.map((exclusion) => exclusion.name).join(","),
// });


interface CustomersProps {
  queryRef: PreloadedQuery<CustomersQueryType>
}

export const CustomersQuery = graphql`
  query CustomersQuery {
    customers {
      surname
      ...CustomerRowComponent_customer
    }
  }
`

const Customers: React.FC<CustomersProps> = (props) => {
  const [showCreateCustomer, setShowCreateCustomer] = React.useState(false);

  const data = usePreloadedQuery<CustomersQueryType>(CustomersQuery, props.queryRef)

  const customers = data.customers
  // const loading = useSelector(loadingSelector);
  const history = useHistory();

  return (
    <React.Fragment>
      <Header align="center" justify="start" gap="small">
        <Heading level={2}>Customers</Heading>
        <Button
          primary
          size="small"
          onClick={() => history.push("/new-customer")}
          label="New"
          a11yTitle="New Customer"
        />
        {/*
        <Button
          primary
          size="small"
          label="Download CSV"
          onClick={(): void => {
            const string = generateCsvStringFromObjectArray(
              customers.map(convertCustomerToSimpleObject)
            );
            fileDownload(string, "customers.csv");
          }}
        />
        */}
        {showCreateCustomer && (
          <EditCustomerDialog
            title="Create New Customer"
            thunk={createCustomer}
            customer={{
              pauseStart: null,
              pauseEnd: null,
              id: "0",
              firstName: "",
              surname: "",
              salutation: "",
              telephone: "",
              address: "",
              notes: "",
              email: "",
              daysPerWeek: daysPerWeekOptions[0],
              plan: plans[0],
              snack: Snack.None,
              breakfast: false,
              exclusions: [],
            }}
            show={showCreateCustomer}
            onOk={(): void => {
              setShowCreateCustomer(false);
            }}
            onCancel={(): void => {
              setShowCreateCustomer(false);
            }}
          />
        )}
      </Header>
        <Table alignSelf="start">
          <TableHeader>
            <TableRow>
              <TableCell scope="col">
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell scope="col">
                <strong>Plan</strong>
              </TableCell>
              <TableCell scope="col">
                <strong>Extras</strong>
              </TableCell>
              <TableCell scope="col">
                <strong>Customisations</strong>
              </TableCell>
              <TableCell scope="col">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers
              .slice()
              .reverse()
              .sort((a, b) =>
                // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                a.surname > b.surname ? 1 : -1
              )
              .map((customer) => (
                <CustomerRow customer={customer} />
              ))}
          </TableBody>
        </Table>
    </React.Fragment>
  );
};

export default Customers;
