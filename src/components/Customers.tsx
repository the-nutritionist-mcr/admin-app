import React from "react";
import Customer from "../domain/Customer";
import { Heading, Button, Table, majorScale } from "evergreen-ui";
import CustomerRow from "./CustomerRow";
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
      <Heading is="h2" size={700} marginBottom={majorScale(2)}>
        Customers
      </Heading>
      <Table marginBottom={majorScale(2)} marginTop={majorScale(2)}>
        <Table.Head>
          <Table.TextHeaderCell>Name</Table.TextHeaderCell>
          <Table.TextHeaderCell>Email</Table.TextHeaderCell>
          <Table.TextHeaderCell>Meals per Week</Table.TextHeaderCell>
          <Table.TextHeaderCell>Plan</Table.TextHeaderCell>
          <Table.TextHeaderCell>Allergic To</Table.TextHeaderCell>
          <Table.TextHeaderCell>Actions</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
          {customers.map((customer) => (
            <CustomerRow
              key={customer.id}
              customer={customer}
              onChange={updateCustomer}
            />
          ))}
        </Table.Body>
      </Table>
      <Button
        appearance="primary"
        marginTop={majorScale(2)}
        onClick={createBlankCustomer}
      >
        Create New
      </Button>
    </React.Fragment>
  );
};

export default Customers;
