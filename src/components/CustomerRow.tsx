import React from "react";
import Customer from "../domain/Customer";
import { TableRow, TableCell, Button } from "grommet";
import { deleteCustomer } from "../actions/customers";
import { allergens } from "../domain/Recipe";
import Plan from "../domain/Plan";
import { plans, daysPerWeekOptions } from "../lib/config";
import TableCellInputField from "./TableCellInputField";
import TableCellSelectField from "./TableCellSelectField";

interface CustomerRowProps {
  customer: Customer;
  onChange: (oldCustomer: Customer, newCustomer: Customer) => void;
}

const CustomerRow: React.FC<CustomerRowProps> = (props) => (
  <TableRow>
    <TableCell scope="row">
      <TableCellInputField
        name="name"
        thing={props.customer}
        mutator={(newCustomer, event) => {
          newCustomer.name = event.target.value;
        }}
        value={props.customer.name}
        onChange={props.onChange}
      />
    </TableCell>
    <TableCell>
      <TableCellInputField
        thing={props.customer}
        type="email"
        mutator={(newCustomer, event) => {
          newCustomer.email = event.target.value;
        }}
        value={props.customer.email}
        onChange={props.onChange}
      />
    </TableCell>
    <TableCell>
      <TableCellSelectField
        thing={props.customer}
        options={daysPerWeekOptions.map(String)}
        value={String(props.customer.daysPerWeek)}
        mutator={(newCustomer, event) => {
          newCustomer.daysPerWeek = parseInt(event.value, 10);
        }}
        onChange={props.onChange}
      />
    </TableCell>
    <TableCell>
      <TableCellSelectField
        thing={props.customer}
        options={plans}
        valueKey={(plan: Plan) => `${plan.category} ${plan.mealsPerDay}`}
        labelKey={(plan: Plan) => `${plan.category} ${plan.mealsPerDay}`}
        children={(plan: Plan) => `${plan.category} ${plan.mealsPerDay}`}
        value={props.customer.plan}
        mutator={(newCustomer, event) => {
          const plan = plans.find((plan) => {
            return (
              event.value.category === plan.category &&
              event.value.mealsPerDay === plan.mealsPerDay
            );
          });
          if (plan) {
            newCustomer.plan = plan;
          }
        }}
        onChange={props.onChange}
      />
    </TableCell>

    <TableCell>
      <TableCellSelectField
        multiple
        thing={props.customer}
        options={allergens}
        value={props.customer.allergicTo}
        mutator={(newCustomer, item) => {
          newCustomer.allergicTo = item.value;
        }}
        onChange={props.onChange}
      />
    </TableCell>
    <TableCell>
      <Button
        secondary
        onClick={() => deleteCustomer(props.customer)}
        label="Delete"
      />
    </TableCell>
  </TableRow>
);

export default CustomerRow;
