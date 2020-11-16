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
import {
  createBlankCustomer,
  getCustomers,
  updateCustomer,
} from "../actions/customers";

import Customer from "../domain/Customer";
import CustomerRow from "../components/CustomerRow";
import React from "react";
import { customerStore } from "../lib/stores";

const Customers: React.FC = () => {
  const [customers, setCustomers] = React.useState<Customer[]>(
    customerStore.getAll()
  );

  const onChangeCustomers = (): void => {
    setCustomers([...customerStore.getAll()]);
  };

  React.useEffect(() => {
    customerStore.addChangeListener(onChangeCustomers);
    getCustomers();
    return (): void => customerStore.removeChangeListener(onChangeCustomers);
  }, []);

  return (
    <React.Fragment>
      <Header align="center" justify="start" gap="small">
        <Heading level={2}>Customers</Heading>
        <Button
          primary
          size="small"
          onClick={createBlankCustomer}
          label="New"
          a11yTitle="New Customer"
        />
      </Header>
      <Table alignSelf="start">
        <TableHeader>
          <TableRow>
            <TableCell scope="col">
              <strong>Name</strong>
            </TableCell>
            <TableCell scope="col">
              <strong>Email</strong>
            </TableCell>
            <TableCell scope="col">
              <strong>Days per week</strong>
            </TableCell>
            <TableCell scope="col">
              <strong>Plan</strong>
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
              <CustomerRow
                key={customer.id}
                customer={customer}
                onChange={updateCustomer}
              />
            ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default Customers;
