import {
  Box,
  Button,
  Header,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from "grommet";
import Customer, { Snack } from "../../domain/Customer";

import { daysPerWeekOptions, plans } from "../../lib/config";
import CustomerRow from "./CustomerRow";
import EditCustomerDialog from "./EditCustomerDialog";
import LoadingState from "../../types/LoadingState";
import React from "react";
import { Spinning } from "grommet-controls";
import { createCustomer } from "./customersSlice";
import { loadingSelector } from "../../lib/rootReducer";
import useCustomers from "./useCustomers";
import { useSelector } from "react-redux";

const Customers: React.FC = () => {
  const [showCreateCustomer, setShowCreateCustomer] = React.useState(false);

  const { customers } = useCustomers();
  const loading = useSelector(loadingSelector);

  return (
    <React.Fragment>
      <Header align="center" justify="start" gap="small">
        <Heading level={2}>Customers</Heading>
        <Button
          primary
          size="small"
          onClick={(): void => setShowCreateCustomer(true)}
          label="New"
          a11yTitle="New Customer"
        />
        {showCreateCustomer && (
          <EditCustomerDialog
            title="Create New Customer"
            thunk={createCustomer}
            customer={{
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
      {customers.length > 0 ? (
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
              .sort((a: Customer, b: Customer) =>
                // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                a.surname > b.surname ? 1 : -1
              )
              .map((customer) => (
                <CustomerRow key={customer.id} customer={customer} />
              ))}
          </TableBody>
        </Table>
      ) : (
        <Text>
          {loading === LoadingState.Loading ? (
            <Box pad="small">
              <Spinning size="large" />
            </Box>
          ) : (
            `you've not added any customers yet... Click the 'new'
          button above to get started!`
          )}
        </Text>
      )}
    </React.Fragment>
  );
};

export default Customers;
