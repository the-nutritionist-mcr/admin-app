import React from "react";
import Customer from "./domain/Customer";

interface CustomerRowProps {
  customer: Customer;
  onChange: (oldCustomer: Customer, newCustomer: Customer) => void;
}

type InputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;
type SelectChangeHandler = (
  event: React.ChangeEvent<HTMLSelectElement>
) => void;

const CustomerRow: React.FC<CustomerRowProps> = (props) => {
  const onNameChange: InputChangeHandler = (event): void => {
    const newCustomer = Object.assign({}, props.customer);
    newCustomer.name = event.target.value;
    props.onChange(props.customer, newCustomer);
  };

  const onEmailChange: InputChangeHandler = (event): void => {
    const newCustomer = Object.assign({}, props.customer);
    newCustomer.email = event.target.value;
    props.onChange(props.customer, newCustomer);
  };

  const onDaysPerWeekChange: SelectChangeHandler = (event) => {
    const newCustomer = Object.assign({}, props.customer);
    newCustomer.daysPerWeek = parseInt(event.target.value, 10);
    props.onChange(props.customer, newCustomer);
  };

  const onMealsPerDayChange: SelectChangeHandler = (event) => {
    const newCustomer = Object.assign({}, props.customer);
    newCustomer.mealsPerDay = parseInt(event.target.value, 10);
    props.onChange(props.customer, newCustomer);
  };

  const onPlanChange: SelectChangeHandler = (event) => {
    const newCustomer = Object.assign({}, props.customer);
    const selected = event.target.options[event.target.selectedIndex];
    newCustomer.plan = {
      name: selected.textContent ?? "min",
      costPerMeal: parseInt(selected.value, 10),
    };
    props.onChange(props.customer, newCustomer);
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          value={props.customer.name}
          onChange={onNameChange}
        />
      </td>
      <td>
        <input
          type="text"
          value={props.customer.email}
          onChange={onEmailChange}
        />
      </td>
      <td>
        <select onChange={onDaysPerWeekChange}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
        </select>
      </td>
      <td>
        <select onChange={onMealsPerDayChange}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </td>
      <td>
        <select onChange={onPlanChange}>
          <option value="250">min</option>
          <option value="350">max</option>
        </select>
      </td>
    </tr>
  );
};

export default CustomerRow;
