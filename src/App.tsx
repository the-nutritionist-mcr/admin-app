import React from "react";
import CustomerRow from "./CustomerRow";
import Customer from "./domain/Customer";

const App = () => {
  const [customers, setCustomers] = React.useState<Customer[]>([]);
  const [meals, setMeals] = React.useState<string[]>();

  const onCreateNew = () => {
    setCustomers([
      ...customers,
      {
        name: "",
        email: "",
        daysPerWeek: 1,
        mealsPerDay: 1,
        plan: {
          name: "min",
          costPerMeal: 250,
        },
        allergicTo: [],
      },
    ]);
  };

  const changeCustomer = async (customer: Customer, newCustomer: Customer) => {
    const index = customers.indexOf(customer);
    const newCustomers = [...customers];
    newCustomers[index] = newCustomer;
    setCustomers(newCustomers);
  };

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
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <CustomerRow customer={customer} onChange={changeCustomer} />
          ))}
        </tbody>
      </table>
      <button onClick={onCreateNew}>Create New</button>
      <h2>Meals</h2>
      <ul>
        <li></li>
      </ul>
    </React.Fragment>
  );
};

export default App;
