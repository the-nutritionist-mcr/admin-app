import { Box, Button, TableCell, TableRow } from "grommet";
import { Pause, Play, Trash } from "grommet-icons";
import { OkCancelDialog, PauseDialog } from "../../components";
import { removeCustomer, updateCustomer } from "./customersSlice";
import { Link } from "react-router-dom";
import Customer from "../../domain/Customer";
import EditCustomerDialog from "./EditCustomerDialog";
import React from "react";
import getExtrasString from "../../lib/getExtrasString";
import getStatusString from "../../lib/getStatusString";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { CustomerPlan, PlannerConfig } from "./types";
import { isCustomDeliveryPlan } from "./distribution-generator";
import { CustomerRowComponent_customer$key } from "./__generated__/CustomerRowComponent_customer.graphql";
import {
  defaultDeliveryDays,
  planLabels,
  extrasLabels,
} from "../../lib/config";
import deepMemo from "../../lib/deepMemo";
import { graphql, useFragment } from "react-relay";

interface CustomerRowProps {
  customer: CustomerRowComponent_customer$key
}

const SlimButton = styled(Button)`
  padding: 0 5px 0 5px;
`;

const getPlanString = (
  plan: CustomerPlan | undefined,
  config: PlannerConfig
) => {
  if (!plan) {
    return "Legacy";
  }

  if (isCustomDeliveryPlan(plan, config)) {
    return "Custom";
  }

  return `${plan.configuration.planType} ${plan.configuration.mealsPerDay} (${plan.configuration.daysPerWeek} days) x ${plan.configuration.totalPlans}`;
};

const UnMemoizedCustomerRow: React.FC<CustomerRowProps> = (props) => {
  const [showDoDelete, setShowDoDelete] = React.useState(false);
  const [showPause, setShowPause] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const dispatch = useDispatch();

  const data = useFragment(
    graphql`
      fragment CustomerRowComponent_customer on Customer {
        id
        newPlan {
          deliveries {
            items {
              name
              quantity
            }
            extras {
              name
              quantity
            }
          }
          configuration {
            planType
            daysPerWeek
            mealsPerDay
            totalPlans
            deliveryDays
            extrasChosen
          }
        }
        snack
        breakfast
        pauseStart
        pauseEnd
        exclusions {
          name
        }
        surname
        firstName
        salutation
      }
    `,
    props.customer
  )

  const nameString = `${data.surname} ${data.firstName} (${data.salutation})`;


  return (
    <TableRow>
      <TableCell scope="row">
        <Link to={`/edit-customer/${data.id}`}>{nameString}</Link>
      </TableCell>
      <TableCell>{getStatusString(data)}</TableCell>
      <TableCell>
        {getPlanString(data.newPlan, {
          planLabels: [...planLabels],
          extrasLabels: [...extrasLabels],
          defaultDeliveryDays: [...defaultDeliveryDays],
        })}
      </TableCell>
      <TableCell>{getExtrasString(data)}</TableCell>

      <TableCell>
        {data.exclusions.length > 0
          ? data.exclusions
              .map((exclusion) => exclusion.name)
              .join(", ")
          : "None"}
      </TableCell>
      <TableCell>
        <Box direction="row">
          <SlimButton
            secondary
            onClick={(): void => setShowDoDelete(true)}
            icon={<Trash color="light-6" />}
            a11yTitle="Delete"
          />
          <OkCancelDialog
            show={showDoDelete}
            header="Are you sure?"
            thing={data}
            thunk={removeCustomer}
            onOk={(): void => {
              setShowDoDelete(false);
            }}
            onCancel={(): void => setShowDoDelete(false)}
          >
            Are you sure you want to delete this customer?
          </OkCancelDialog>
          <SlimButton
            secondary
            icon={<Pause color="light-6" />}
            a11yTitle="Pause"
            onClick={(): void => setShowPause(true)}
          />
          <PauseDialog
            customer={data}
            show={showPause}
            onCancel={(): void => {
              setShowPause(false);
            }}
            onOk={(): void => {
              setShowPause(false);
            }}
          />
          <SlimButton
            secondary
            icon={<Play color="light-6" />}
            a11yTitle="Remove pause"
            onClick={() => {
              const customer = {
                ...data,
                pauseStart: undefined,
                pauseEnd: undefined,
              };
              dispatch(updateCustomer(customer));
            }}
          />
          <EditCustomerDialog
            title="Edit Customer"
            customer={data}
            show={showEdit}
            thunk={updateCustomer}
            onOk={(): void => {
              setShowEdit(false);
            }}
            onCancel={(): void => {
              setShowEdit(false);
            }}
          />
        </Box>
      </TableCell>
    </TableRow>
  );
};

const CustomerRow = deepMemo(UnMemoizedCustomerRow);

export default CustomerRow;
