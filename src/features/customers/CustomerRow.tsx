import { Box, Button, TableCell, TableRow } from "grommet";
import { Edit, Pause, Trash } from "grommet-icons";
import { removeCustomer, updateCustomer } from "./customersSlice";
import Customer from "../../domain/Customer";
import EditCustomerDialog from "./EditCustomerDialog";
import OkCancelDialog from "../../components/OkCancelDialog";
import PauseDialog from "./../../components/PauseDialog";
import React from "react";
import getExtrasString from "../../lib/getExtrasString";
import getStatusString from "../../lib/getStatusString";
import { useDispatch } from "react-redux";

const WEEKS_IN_YEAR = 52;
const MONTHS_IN_YEAR = 12;
const PENCE_IN_POUND = 100;

interface CustomerRowProps {
  customer: Customer;
}

const pricePerWeek = (customer: Customer): number =>
  customer.plan.mealsPerDay * customer.plan.costPerMeal * customer.daysPerWeek;

const pricePerMonth = (customer: Customer): number =>
  (pricePerWeek(customer) * WEEKS_IN_YEAR) / MONTHS_IN_YEAR;

const CustomerRow: React.FC<CustomerRowProps> = (props) => {
  const [showDoDelete, setShowDoDelete] = React.useState(false);
  const [showPause, setShowPause] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);

  const dispatch = useDispatch();

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
      <TableCell>{getExtrasString(props.customer)}</TableCell>
      <TableCell>
        {
          // eslint-disable-next-line new-cap
          Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
          }).format(pricePerWeek(props.customer) / PENCE_IN_POUND)
        }
      </TableCell>
      <TableCell>
        {
          // eslint-disable-next-line new-cap
          Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
          }).format(pricePerMonth(props.customer) / PENCE_IN_POUND)
        }
      </TableCell>

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
            onOk={async (): Promise<void> => {
              await dispatch(removeCustomer(props.customer));
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
