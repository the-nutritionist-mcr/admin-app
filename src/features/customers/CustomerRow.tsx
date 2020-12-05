import { Box, Button, TableCell, TableRow } from "grommet";
import { Edit, Pause, Trash } from "grommet-icons";
import { OkCancelDialog, PauseDialog } from "../../components";
import { removeCustomer, updateCustomer } from "./customersSlice";
import Customer from "../../domain/Customer";
import EditCustomerDialog from "./EditCustomerDialog";
import React from "react";
import getExtrasString from "../../lib/getExtrasString";
import getStatusString from "../../lib/getStatusString";
import { useDispatch } from "react-redux";

interface CustomerRowProps {
  customer: Customer;
}

const CustomerRow: React.FC<CustomerRowProps> = (props) => {
  const [showDoDelete, setShowDoDelete] = React.useState(false);
  const [showPause, setShowPause] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);

  const dispatch = useDispatch();

  return (
    <TableRow>
      <TableCell scope="row">
        {props.customer.surname}, {props.customer.firstName} (
        {props.customer.salutation})
      </TableCell>
      <TableCell>{getStatusString(props.customer)}</TableCell>
      <TableCell>
        {props.customer.plan.category} {props.customer.plan.mealsPerDay} (
        {props.customer.daysPerWeek} days)
      </TableCell>
      <TableCell>{getExtrasString(props.customer)}</TableCell>

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
            thing={props.customer}
            thunk={removeCustomer}
            onOk={(): void => {
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
              dispatch(updateCustomer(newCustomer));
              setShowPause(false);
            }}
          />
          <EditCustomerDialog
            title="Edit Customer"
            customer={props.customer}
            show={showEdit}
            thunk={updateCustomer}
            onOk={(): void => {
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
