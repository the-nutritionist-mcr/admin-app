import { Button, TableCell, TableRow } from "grommet";
import { daysPerWeekOptions, plans } from "../lib/config";
import Customer from "../domain/Customer";
import Plan from "../domain/Plan";
import React from "react";
import TableCellInputField from "./TableCellInputField";
import TableCellSelectField from "./TableCellSelectField";
import YesNoDialog from "./YesNoDialog";
import { allergens } from "../domain/Recipe";
import { deleteCustomer } from "../actions/customers";
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
          mutator={(newCustomer, event): void => {
            newCustomer.name = event.target.value;
          }}
          value={props.customer.name}
          onChange={props.onChange}
        />
      </TableCell>
      <TableCell>
        <TableCellInputField
          thing={props.customer}
          name="email"
          type="email"
          mutator={(newCustomer, event): void => {
            newCustomer.email = event.target.value;
          }}
          value={props.customer.email}
          onChange={props.onChange}
        />
      </TableCell>
      <TableCell>
        <TableCellSelectField
          name="daysPerWeek"
          thing={props.customer}
          options={daysPerWeekOptions.map(String)}
          value={String(props.customer.daysPerWeek)}
          mutator={(newCustomer, event): void => {
            newCustomer.daysPerWeek = Number.parseInt(event.value, 10);
          }}
          onChange={props.onChange}
        />
      </TableCell>
      <TableCell>
        <TableCellSelectField
          thing={props.customer}
          name="daysPerWeek"
          options={plans}
          valueKey={(plan: Plan): string =>
            `${plan.category} ${plan.mealsPerDay}`
          }
          labelKey={(plan: Plan): string =>
            `${plan.category} ${plan.mealsPerDay}`
          }
          // eslint-disable-next-line react/no-children-prop
          children={(plan: Plan): string =>
            `${plan.category} ${plan.mealsPerDay}`
          }
          value={props.customer.plan}
          mutator={(newCustomer, event): void => {
            const plan = plans.find((planAtPosition) => {
              return (
                event.value.category === planAtPosition.category &&
                event.value.mealsPerDay === planAtPosition.mealsPerDay
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
          name="allergicTo"
          thing={props.customer}
          options={allergens}
          value={props.customer.allergicTo}
          mutator={(newCustomer, item): void => {
            newCustomer.allergicTo = item.value;
          }}
          onChange={props.onChange}
        />
      </TableCell>
      <TableCell>
        <Button
          secondary
          onClick={(): void => setShowDoDelete(true)}
          label="Delete"
        />
        <YesNoDialog
          show={showDoDelete}
          header="Are you sure?"
          onYes={(): void => {
            deleteCustomer(props.customer);
            setShowDoDelete(false);
          }}
          onNo={(): void => setShowDoDelete(false)}
        >
          Are you sure you want to delete this customer?
        </YesNoDialog>
      </TableCell>
    </TableRow>
  );
};

export default CustomerRow;
