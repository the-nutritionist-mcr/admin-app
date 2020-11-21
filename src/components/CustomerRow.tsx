import { Box, Button, TableCell, TableRow } from "grommet";
import { Customer, CustomerExclusion, Exclusion } from "../models";
import { Edit, Pause, Trash } from "grommet-icons";
import { DataStore } from "@aws-amplify/datastore";
import EditCustomerDialog from "./EditCustomerDialog";
import OkCancelDialog from "./OkCancelDialog";
import PauseDialog from "./PauseDialog";
import React from "react";
import getExtrasString from "../lib/getExtrasString";
import getStatusString from "../lib/getStatusString";

const WEEKS_IN_YEAR = 52;
const MONTHS_IN_YEAR = 12;
const PENCE_IN_POUND = 100;

interface CustomerRowProps {
  customer: Customer;
  onChange: (newCustomer: Customer) => void;
}

const pricePerWeek = (customer: Customer): number =>
  customer.plan.mealsPerDay * customer.plan.costPerMeal * customer.daysPerWeek;

const pricePerMonth = (customer: Customer): number =>
  (pricePerWeek(customer) * WEEKS_IN_YEAR) / MONTHS_IN_YEAR;

const CustomerRow: React.FC<CustomerRowProps> = (props) => {
  const [showDoDelete, setShowDoDelete] = React.useState(false);
  const [showPause, setShowPause] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const [customerExclusions, setCustomerExclusions] = React.useState<
    (Exclusion | undefined)[]
  >([]);

  const loadCustomerExclusions = async (): Promise<void> => {
    const newCustomerExclusions = (
      await DataStore.query(CustomerExclusion)
    ).filter(
      (customerExclusion) =>
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        customerExclusion.customer!.id === props.customer.id
    );

    setCustomerExclusions(
      newCustomerExclusions
        .map((customerExclusion) => customerExclusion.exclusion)
        .filter(Boolean)
    );
  };

  React.useEffect(() => {
    loadCustomerExclusions();
  }, []);

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
        {customerExclusions.length > 0
          ? customerExclusions
              .filter(Boolean)
              .map((exclusion) => exclusion?.name ?? "")
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
              await DataStore.delete(props.customer);
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
            onOk={async (newCustomer: Customer): Promise<void> => {
              await DataStore.save(newCustomer);
              setShowPause(false);
            }}
          />
          {showEdit && (
            <EditCustomerDialog
              title="Edit Customer"
              customer={props.customer}
              show={showEdit}
              onOk={async (customer): Promise<void> => {
                const newCustomer = Customer.copyOf(props.customer, (draft) => {
                  draft.firstName = customer.firstName;
                  draft.surname = customer.surname;
                  draft.salutation = customer.salutation;
                  draft.address = customer.address;
                  draft.telephone = customer.telephone;
                  draft.startDate = customer.startDate;
                  draft.paymentDateOfMonth = customer.paymentDateOfMonth;
                  draft.notes = customer.notes;
                  draft.email = customer.email;
                  draft.pauseStart = customer.pauseStart;
                  draft.pauseEnd = customer.pauseEnd;
                  draft.daysPerWeek = customer.daysPerWeek;
                  draft.plan = customer.plan;
                  draft.legacyPrice = customer.legacyPrice;
                  draft.snack = customer.snack;
                  draft.breakfast = customer.breakfast;
                });

                await DataStore.save(newCustomer);

                const existingExclusions = (
                  await DataStore.query(CustomerExclusion)
                ).filter(
                  (existingExclusion) =>
                    existingExclusion.customer?.id === newCustomer.id
                );
                await Promise.all(
                  existingExclusions.map(async (exclusion) =>
                    DataStore.delete(exclusion)
                  )
                );
                await Promise.all(
                  customer.exclusions.map(
                    async (exclusion): Promise<void> => {
                      if (exclusion) {
                        await DataStore.save(exclusion);
                        await DataStore.save(
                          new CustomerExclusion({
                            customer: newCustomer,
                            exclusion,
                          })
                        );
                      }
                    }
                  )
                );

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
