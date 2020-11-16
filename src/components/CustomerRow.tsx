import { Button, DateInput, FormField, TableCell, TableRow } from "grommet";
import { daysPerWeekOptions, plans } from "../lib/config";
import Customer from "../domain/Customer";
import Exclusion from "../domain/Exclusion";
import OkCancelDialog from "./OkCancelDialog";
import Plan from "../domain/Plan";
import React from "react";
import TableCellInputField from "./TableCellInputField";
import TableCellSelectField from "./TableCellSelectField";
import { deleteCustomer } from "../actions/customers";
import { exclusionsStore } from "../lib/stores";
import { getExclusions } from "../actions/exclusions";
interface CustomerRowProps {
  customer: Customer;
  onChange: (oldCustomer: Customer, newCustomer: Customer) => void;
}

const CustomerRow: React.FC<CustomerRowProps> = (props) => {
  const [showDoDelete, setShowDoDelete] = React.useState(false);
  const [showPause, setShowPause] = React.useState(false);

  const [exclusions, setExclusions] = React.useState<Exclusion[]>(
    exclusionsStore.getAll()
  );

  const onChangeExclusions = (): void => {
    setExclusions([...exclusionsStore.getAll()]);
  };

  React.useEffect(() => {
    exclusionsStore.addChangeListener(onChangeExclusions);
    if (exclusionsStore.getAll().length === 0) {
      getExclusions();
    }
    return (): void => exclusionsStore.removeChangeListener(onChangeExclusions);
  }, []);

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
          name="plan"
          options={plans}
          renderLabel={(plan: Plan): string =>
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
          name="exclusions"
          thing={props.customer}
          options={exclusions}
          labelKey="name"
          value={props.customer.exclusions}
          mutator={(newCustomer, item): void => {
            newCustomer.exclusions = item.value;
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
        <Button
          secondary
          onClick={(): void => setShowPause(true)}
          label="Pause"
        />
        <OkCancelDialog
          show={showDoDelete}
          header="Are you sure?"
          onOk={(): void => {
            deleteCustomer(props.customer);
            setShowDoDelete(false);
          }}
          onCancel={(): void => setShowDoDelete(false)}
        >
          Are you sure you want to delete this customer?
        </OkCancelDialog>
        <OkCancelDialog
          show={showPause}
          header="Add Pause"
          onOk={(): void => {
            setShowPause(false);
          }}
          onCancel={(): void => setShowPause(false)}
        >
          <FormField label="Pause Start">
            <DateInput
              value={"2019-09-26T07:58:30.996+0200"}
              format="dd/mm/yyyy"
            />
          </FormField>

          <FormField label="Pause End">
            <DateInput
              value={"2019-09-26T07:58:30.996+0200"}
              format="dd/mm/yyyy"
            />
          </FormField>
        </OkCancelDialog>
      </TableCell>
    </TableRow>
  );
};

export default CustomerRow;
