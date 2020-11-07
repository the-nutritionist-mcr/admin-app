import React from "react";
import Customer from "../domain/Customer";
import { allergens } from "../domain/Recipe";
import InputField from "./InputField";
import SelectField from "./SelectField";

interface CustomerRowProps {
  customer: Customer;
  onChange: (oldCustomer: Customer, newCustomer: Customer) => void;
}

const CustomerRow: React.FC<CustomerRowProps> = (props) => (
  <tr>
    <td>
      <InputField
        thing={props.customer}
        mutator={(newCustomer, event) => {
          newCustomer.name = event.target.value;
        }}
        value={props.customer.name}
        onChange={props.onChange}
      />
    </td>
    <td>
      <InputField
        thing={props.customer}
        mutator={(newCustomer, event) => {
          newCustomer.email = event.target.value;
        }}
        value={props.customer.email}
        onChange={props.onChange}
      />
    </td>
    <td>
      <SelectField
        thing={props.customer}
        options={["1", "2", "3", "4", "5", "6"]}
        value={String(props.customer.daysPerWeek)}
        mutator={(newCustomer, event) => {
          newCustomer.daysPerWeek = parseInt(event.target.value, 10);
        }}
        onChange={props.onChange}
      />
    </td>
    <td>
      <SelectField
        thing={props.customer}
        options={["1", "2", "3"]}
        value={String(props.customer.mealsPerDay)}
        mutator={(newCustomer, event) => {
          newCustomer.mealsPerDay = parseInt(event.target.value, 10);
        }}
        onChange={props.onChange}
      />
    </td>
    <td>
      <SelectField
        thing={props.customer}
        options={[
          { text: "min", value: "250" },
          { text: "max", value: "350" },
        ]}
        value={String(props.customer.plan.costPerMeal)}
        mutator={(newCustomer, event) => {
          const selected = event.target.options[event.target.selectedIndex];
          newCustomer.plan = {
            name: selected.textContent ?? "min",
            costPerMeal: parseInt(selected.value, 10),
          };
        }}
        onChange={props.onChange}
      />
    </td>
    <td>
      <SelectField
        multiple
        thing={props.customer}
        options={allergens}
        value={props.customer.allergicTo}
        mutator={(newCustomer, event) => {
          const selected = Array.from(event.target.options)
            .filter((item) => (item as HTMLOptionElement).selected)
            .map((item) => item.textContent ?? "")
            .filter(Boolean);
          newCustomer.allergicTo = selected;
        }}
        onChange={props.onChange}
      />
    </td>
  </tr>
);

export default CustomerRow;
