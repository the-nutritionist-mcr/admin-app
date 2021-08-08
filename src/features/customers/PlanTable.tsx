import React, { FC } from "react";
import { Table, TableBody } from "grommet";
import PlanRow from "./PlanRow";
import PlanHeader from "./PlanHeader";
import { CustomerPlan, PlannerConfig } from "./types";

interface PlanTableProps {
  onChange: (plan: CustomerPlan) => void;
  plan: CustomerPlan;
  plannerConfig: PlannerConfig;
}

const PlanTable: FC<PlanTableProps> = (props) => {
  const changeDays = (days: string[]) => {
    const newPlan = {
      deliveries: props.plan.deliveries.map((delivery, index) => ({
        deliveryDay: days[index],
        items: delivery.items,
        extras: delivery.extras,
      })),
    };
    props.onChange(newPlan);
  };

  const changeItemsQuantities = (
    planString: string,
    newQuantities: number[]
  ) => {
    const newPlan = {
      deliveries: props.plan.deliveries.map((delivery, index) => ({
        ...delivery,
        items: delivery.items.map((item) =>
          item.name === planString
            ? { ...item, quantity: newQuantities[index] }
            : item
        ),
      })),
    };

    props.onChange(newPlan);
  };

  const changeExtrasQuantities = (
    planString: string,
    newQuantities: number[]
  ) => {
    const newPlan = {
      deliveries: props.plan.deliveries.map((delivery, index) => ({
        ...delivery,
        extras: delivery.extras.map((extra) =>
          extra.name === planString
            ? { ...extra, quantity: newQuantities[index] }
            : extra
        ),
      })),
    };

    props.onChange(newPlan);
  };

  return (
    <Table>
      <PlanHeader
        onChange={changeDays}
        defaultDeliveryDays={props.plannerConfig.defaultDeliveryDays}
      />
      <TableBody>
        {props.plannerConfig.planLabels.map((label) => (
          <PlanRow
            key={label}
            onChange={changeItemsQuantities}
            plan={label}
            quantities={props.plan.deliveries.map(
              (delivery) =>
                delivery.items.find((item) => item.name === label)?.quantity ??
                0
            )}
            defaultDeliveryDays={props.plannerConfig.defaultDeliveryDays}
          />
        ))}
        {props.plannerConfig.extrasLabels.map((extra) => (
          <PlanRow
            onChange={changeExtrasQuantities}
            key={extra}
            plan={extra}
            quantities={props.plan.deliveries.map(
              (delivery) =>
                delivery.extras.find((extras) => extras.name === extra)
                  ?.quantity ?? 0
            )}
            defaultDeliveryDays={props.plannerConfig.defaultDeliveryDays}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default PlanTable;
