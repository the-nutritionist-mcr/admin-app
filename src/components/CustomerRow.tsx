import { Box, Button, TableCell, TableRow } from "grommet";
import Customer, { Snack } from "../domain/Customer";
import { Edit, Pause, Trash } from "grommet-icons";
import { deleteCustomer, updateCustomer } from "../actions/customers";
import EditCustomerDialog from "./EditCustomerDialog";
import OkCancelDialog from "./OkCancelDialog";
import PauseDialog from "./PauseDialog";
import React from "react";
import getStatusString from "../lib/getStatusString";

interface CustomerRowProps {
  customer: Customer;
  onChange: (oldCustomer: Customer, newCustomer: Customer) => void;
}

const extrasString = (customer: Customer): string => {
  const returnVal = [];

  if (customer.breakfast) {
    returnVal.push("Breakfast");
  }

  if (customer.snack !== Snack.None) {
    returnVal.push(`${customer.snack} Snack`);
  }

  return returnVal.length > 0 ? returnVal.join(", ") : "None";
};

const CustomerRow: React.FC<CustomerRowProps> = (props) => {
  const [showDoDelete, setShowDoDelete] = React.useState(false);
  const [showPause, setShowPause] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);

  return (
    <TableRow>
      <TableCell scope="row">
        {props.customer.salutation} {props.customer.firstName}{" "}
        {props.customer.surname}
      </TableCell>
      <TableCell>{props.customer.email}</TableCell>
      <TableCell>{getStatusString(props.customer)}</TableCell>
      <TableCell>
        {props.customer.plan.category} {props.customer.plan.mealsPerDay} (
        {props.customer.daysPerWeek} days)
      </TableCell>
      <TableCell>{extrasString(props.customer)}</TableCell>

      <TableCell>
        {props.customer.exclusions.length > 0
          ? props.customer.exclusions
              .map((exclusion) => exclusion.name)
              .join(", ")
          : "None"}
      </TableCell>
      <TableCell>
        <Box direction="row">
          <Button
            secondary
            onClick={(): void => setShowDoDelete(true)}
            icon={<Trash color="light-6" />}
            a11yTitle="Delete"
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
          <Button
            secondary
            icon={<Pause color="light-6" />}
            a11yTitle="Pause"
            onClick={(): void => setShowPause(true)}
          />
          <PauseDialog
            customer={props.customer}
            show={showPause}
            onCancel={(): void => {
              setShowPause(false);
            }}
            onOk={(newCustomer: Customer): void => {
              updateCustomer(props.customer, newCustomer);
              setShowPause(false);
            }}
          />
          <EditCustomerDialog
            customer={props.customer}
            show={showEdit}
            onOk={(customer: Customer): void => {
              updateCustomer(props.customer, customer);
              setShowEdit(false);
            }}
            onCancel={(): void => {
              setShowEdit(false);
            }}
          />

          <Button
            secondary
            icon={<Edit color="light-6" />}
            a11yTitle="Edit"
            onClick={(): void => setShowEdit(true)}
          />
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default CustomerRow;
