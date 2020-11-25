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
import Customer, { Snack } from "../domain/Customer";

import {
  allCustomersSelector,
  createCustomer,
} from "../features/customers/customersSlice";
import { daysPerWeekOptions, plans } from "../lib/config";
import { useDispatch, useSelector } from "react-redux";
import CustomerRow from "../components/CustomerRow";
import EditCustomerDialog from "../components/EditCustomerDialog";
import React from "react";

const Customers: React.FC = () => {
  const [showCreateCustomer, setShowCreateCustomer] = React.useState(false);

  const dispatch = useDispatch();

  const customers = useSelector(allCustomersSelector);

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
            customer={{
              id: 0,
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
            onOk={(customer): void => {
              dispatch(createCustomer(customer));
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
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              .sort((a: Customer, b: Customer) => (a.id > b.id ? -1 : 1))
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
