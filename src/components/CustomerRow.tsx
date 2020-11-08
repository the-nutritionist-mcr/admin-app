import React from "react";
import Customer from "../domain/Customer";
import { CrossIcon, IconButton, Table } from "evergreen-ui";
import { deleteCustomer } from "../actions/customers";
import { allergens } from "../domain/Recipe";
import { plans, daysPerWeekOptions } from "../lib/config";
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
        type="email"
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
        options={daysPerWeekOptions.map(String)}
        value={String(props.customer.daysPerWeek)}
        mutator={(newCustomer, item) => {
          newCustomer.daysPerWeek = parseInt(item.value.toString(), 10);
        }}
        onChange={props.onChange}
      />
    </Table.TextCell>
    <Table.TextCell>
      <SelectField
        thing={props.customer}
        options={plans.map((plan) => ({
          label: `${plan.category} ${plan.mealsPerDay}`,
          value: `${plan.category} ${plan.mealsPerDay}`,
        }))}
        value={`${props.customer.plan.category} ${props.customer.plan.mealsPerDay}`}
        mutator={(newCustomer, item) => {
          const plan = plans.find((plan) => {
            const category = item.label.split(" ")[0];
            const meals = item.label.split(" ")[1];
            return (
              category === plan.category && meals === String(plan.mealsPerDay)
            );
          });
          if (plan) {
            newCustomer.plan = plan;
          }
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
        intent="danger"
        onClick={() => deleteCustomer(props.customer)}
        icon={CrossIcon}
        height={40}
      />
    </Table.TextCell>
  </Table.Row>
);

export default CustomerRow;
