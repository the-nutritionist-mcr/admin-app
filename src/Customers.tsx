import React from "react";
import Customer from "./domain/Customer";
import CustomerRow from "./CustomerRow";
import {
  updateCustomer,
  getCustomers,
  createBlankCustomer,
} from "./actions/customers";
import customerStore from "./stores/CustomerStore";

const Customers = () => {
  const [customers, setCustomers] = React.useState<Customer[]>(
    customerStore.getCustomers()
  );

  const onChangeCustomers = () => {
    setCustomers([...customerStore.getCustomers()]);
  };

  React.useEffect(() => {
    customerStore.addChangeListener(onChangeCustomers);
    if (customerStore.getCustomers().length === 0) {
      getCustomers();
    }
    return () => customerStore.removeChangeListener(onChangeCustomers);
  }, []);

  return (
    <React.Fragment>
      <h2>Customers</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Days per week</th>
            <th>Meals per day</th>
            <th>Plan</th>
            <th>Allergens</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <CustomerRow
              key={customer.id}
              customer={customer}
              onChange={updateCustomer}
            />
          ))}
        </tbody>
      </table>
      <button onClick={createBlankCustomer}>Create New</button>
    </React.Fragment>
  );
};

export default Customers;
