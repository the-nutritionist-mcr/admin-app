import React from "react";
import Customer from "../domain/Customer";
import { CrossIcon, IconButton, Table } from "evergreen-ui";
import { deleteCustomer } from "../actions/customers";
import { allergens } from "../domain/Recipe";
import InputField from "./InputField";
import SelectField from "./SelectField";
import MultiSelectField from "./MultiSelectField";

interface CustomerRowProps {
  customer: Customer;
  onChange: (oldCustomer: Customer, newCustomer: Customer) => void;
}

const CustomerRow: React.FC<CustomerRowProps> = (props) => (
  <Table.Row>
    <Table.TextCell>
      <InputField
        thing={props.customer}
        mutator={(newCustomer, event) => {
          newCustomer.name = event.target.value;
        }}
        value={props.customer.name}
        onChange={props.onChange}
      />
    </Table.TextCell>
    <Table.TextCell>
      <InputField
        thing={props.customer}
        mutator={(newCustomer, event) => {
          newCustomer.email = event.target.value;
        }}
        value={props.customer.email}
        onChange={props.onChange}
      />
    </Table.TextCell>
    <Table.TextCell>
      <SelectField
        thing={props.customer}
        options={["5", "6", "10", "12"]}
        value={String(props.customer.mealsPerWeek)}
        mutator={(newCustomer, item) => {
          newCustomer.mealsPerWeek = parseInt(item.value.toString(), 10);
        }}
        onChange={props.onChange}
      />
    </Table.TextCell>
    <Table.TextCell>
      <SelectField
        thing={props.customer}
        options={[
          { label: "min", value: "250" },
          { label: "max", value: "350" },
        ]}
        value={props.customer.plan.name}
        mutator={(newCustomer, item) => {
          newCustomer.plan = {
            name: item.label,
            costPerMeal: Number(item.value),
          };
        }}
        onChange={props.onChange}
      />
    </Table.TextCell>

    <Table.TextCell>
      <MultiSelectField
        thing={props.customer}
        options={allergens}
        value={props.customer.allergicTo}
        mutator={(newCustomer, item) => {
          newCustomer.allergicTo = [
            ...newCustomer.allergicTo,
            item.value.toString(),
          ];
        }}
        onChange={props.onChange}
        remover={(newCustomer, itemToRemove) => {
          newCustomer.allergicTo = newCustomer.allergicTo.filter(
            (item) => item !== itemToRemove.value
          );
        }}
      />
    </Table.TextCell>
    <Table.TextCell>
      <IconButton
        onClick={() => deleteCustomer(props.customer)}
        icon={CrossIcon}
        height={40}
      />
    </Table.TextCell>
  </Table.Row>
);

export default CustomerRow;
