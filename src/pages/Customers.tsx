import React from "react";
import Customer from "../domain/Customer";
import {
  Box,
  Button,
  Heading,
  Table,
  TableRow,
  TableCell,
  TableHeader,
  TableBody,
} from "grommet";
import CustomerRow from "../components/CustomerRow";
import {
  updateCustomer,
  getCustomers,
  createBlankCustomer,
} from "../actions/customers";
import customerStore from "../stores/CustomerStore";

const Customers = () => {
  const [customers, setCustomers] = React.useState<Customer[]>(
    customerStore.getCustomers()
  );

  const onChangeCustomers = () => {
    setCustomers([...customerStore.getCustomers()]);
  };

  React.useEffect(() => {
    customerStore.addChangeListener(onChangeCustomers);
    getCustomers();
    return () => customerStore.removeChangeListener(onChangeCustomers);
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
