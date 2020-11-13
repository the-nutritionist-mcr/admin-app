import React from "react";
import Customer from "../domain/Customer";
import { Button, TableCell, TableRow } from "grommet";
import { deleteCustomer } from "../actions/customers";
import { allergens } from "../domain/Recipe";
import Plan from "../domain/Plan";
import YesNoDialog from "./YesNoDialog";
import { daysPerWeekOptions, plans } from "../lib/config";
import TableCellInputField from "./TableCellInputField";
import TableCellSelectField from "./TableCellSelectField";

interface CustomerRowProps {
  customer: Customer;
  onChange: (oldCustomer: Customer, newCustomer: Customer) => void;
}

const CustomerRow: React.FC<CustomerRowProps> = (props) => {
  const [showDoDelete, setShowDoDelete] = React.useState(false);

  return (
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
            newCustomer.daysPerWeek = Number.parseInt(event.value, 10);
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
          onClick={() => setShowDoDelete(true)}
          label="Delete"
        />
        <YesNoDialog
          show={showDoDelete}
          header="Are you sure?"
          onYes={() => deleteCustomer(props.customer)}
          onNo={() => setShowDoDelete(false)}
        >
          Are you sure you want to delete this customer?
        </YesNoDialog>
      </TableCell>
    </TableRow>
  );
};

export default CustomerRow;
