import React, { FC } from "react";
import { Table, TableBody } from "grommet";
import PlanHeader from "./PlanHeader";
import { planLabels, extras, defaultDeliveryDays } from "../../lib/config";
import PlanRow from "./PlanRow";
import { CustomerPlan } from "./PlanPanel";

interface PlanTableProps {
  onChange: (plan: CustomerPlan) => void;
  plan: CustomerPlan;
}

const PlanTable: FC<PlanTableProps> = (props) => {
  const changeDays = (days: string[]) => {
    const newPlan = {
      deliveries: props.plan.deliveries.map((delivery, index) => ({
        deliveryDay: days[index],
        items: delivery.items,
      })),
    };
    props.onChange(newPlan);
  };

  const changeQuantity = (planString: string, newQuantities: number[]) => {
    // eslint-disable-next-line no-console
    console.log(newQuantities);
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

  return (
    <Table>
      <PlanHeader
        onChange={changeDays}
        defaultDeliveryDays={defaultDeliveryDays}
      />
      <TableBody>
        {planLabels.map((label) => (
          <PlanRow
            key={label}
            onChange={changeQuantity}
            plan={label}
            quantities={props.plan.deliveries.map(
              (delivery) =>
                delivery.items.find((item) => item.name === label)?.quantity ??
                0
            )}
            defaultDeliveryDays={defaultDeliveryDays}
          />
        ))}
        {extras.map((extra) => (
          <PlanRow
            onChange={changeQuantity}
            key={extra}
            plan={extra}
            quantities={props.plan.deliveries.map(
              (delivery) =>
                delivery.items.find((item) => item.name === extra)?.quantity ??
                0
            )}
            defaultDeliveryDays={defaultDeliveryDays}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default PlanTable;
