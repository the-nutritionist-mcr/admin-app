import { Box, Button, TableCell, TableRow } from "grommet";
import { Customer, deleteCustomerAction } from "../redux/reducers/customers";
import { Edit, Pause, Trash } from "grommet-icons";
import EditCustomerDialog from "./EditCustomerDialog";
import OkCancelDialog from "./OkCancelDialog";
import PauseDialog from "./PauseDialog";
import React from "react";
import { useAppDispatch } from "../redux";

const WEEKS_IN_YEAR = 52;
const MONTHS_IN_YEAR = 12;
const PENCE_IN_POUND = 100;

interface CustomerRowProps {
  customer: Customer;
  onChange: (oldCustomer: Customer, newCustomer: Customer) => void;
}

const pricePerWeek = (customer: Customer): number =>
  customer.plan.mealsPerDay * customer.plan.costPerMeal * customer.daysPerWeek;

const pricePerMonth = (customer: Customer): number =>
  (pricePerWeek(customer) * WEEKS_IN_YEAR) / MONTHS_IN_YEAR;

const CustomerRow: React.FC<CustomerRowProps> = (props) => {
  const dispatch = useAppDispatch();
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
      <TableCell>(status)</TableCell>
      <TableCell>
        {props.customer.plan.category} {props.customer.plan.mealsPerDay} (
        {props.customer.daysPerWeek} days)
      </TableCell>
      <TableCell>(extras)</TableCell>
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

      <TableCell>(exclusions)</TableCell>
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
              dispatch(deleteCustomerAction(props.customer));
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
            onOk={(): void => {
              setShowPause(false);
            }}
          />
          {showEdit && (
            <EditCustomerDialog
              title="Edit Customer"
              customer={props.customer}
              onOk={(): void => {
                setShowEdit(false);
              }}
              onCancel={(): void => {
                setShowEdit(false);
              }}
            />
          )}

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
