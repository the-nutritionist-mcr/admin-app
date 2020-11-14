import {
  Box,
  Button,
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
      <Heading level={2}>Customers</Heading>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell scope="col">Name</TableCell>
            <TableCell scope="col">Email</TableCell>
            <TableCell scope="col">Days per week</TableCell>
            <TableCell scope="col">Plan</TableCell>
            <TableCell scope="col">Allergic To</TableCell>
            <TableCell scope="col">Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <CustomerRow
              key={customer.id}
              customer={customer}
              onChange={updateCustomer}
            />
          ))}
        </TableBody>
      </Table>
      <Box direction="row" pad="medium">
        <Button
          size="large"
          primary
          onClick={createBlankCustomer}
          label="Create New"
        />
      </Box>
    </React.Fragment>
  );
};

export default Customers;
