import {
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

import {
  allCustomersSelector,
  createCustomer,
  fetchCustomers,
} from "./customersSlice";
import { daysPerWeekOptions, plans } from "../../lib/config";
import CustomerRow from "./CustomerRow";
import EditCustomerDialog from "./EditCustomerDialog";
import React from "react";
import { Snack } from "../../domain/Customer";
import store from "../../lib/store";
import { useSelector } from "react-redux";

const Customers: React.FC = () => {
  const [showCreateCustomer, setShowCreateCustomer] = React.useState(false);

  const customers = useSelector(allCustomersSelector);

  React.useEffect(() => {
    store.dispatch(fetchCustomers());
  }, []);

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
              <TableCell scope="col">
                <strong>Email</strong>
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
              <TableCell>
                <strong>Per Week</strong>
              </TableCell>
              <TableCell>
                <strong>Per Month</strong>
              </TableCell>
              <TableCell scope="col">
                <strong>Exclusions</strong>
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
              .map((customer) => (
                <CustomerRow key={customer.id} customer={customer} />
              ))}
          </TableBody>
        </Table>
      ) : (
        <Text>
          You&apos;ve not added any customers yet... Click the &apos;new&apos;
          button above to get started!
        </Text>
      )}
    </React.Fragment>
  );
};

export default Customers;
