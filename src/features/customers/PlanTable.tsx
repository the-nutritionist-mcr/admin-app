import React, { FC, useState } from "react";
import { Table, TableBody } from "grommet";
import PlanHeader from "./PlanHeader";
import { planLabels, extras, defaultDeliveryDays } from "../../lib/config";
import PlanRow from "./PlanRow";

interface CustomerPlan {
  deliveries: Delivery[];
}

interface Item {
  name: string;
  quantity: number;
}

interface Delivery {
  deliveryDay: string;
  items: Item[];
}

interface PlanTableProps {
  onChange: (plan: CustomerPlan) => void;
}

const defaultPlan: CustomerPlan = {
  deliveries: defaultDeliveryDays.map((day) => ({
    deliveryDay: day,
    items: [
      ...planLabels.map((label) => ({ name: label, quantity: 0 })),
      ...extras.map((extra) => ({ name: extra, quantity: 0 })),
    ],
  })),
};

const PlanTable: FC<PlanTableProps> = (props) => {
  const [plan, setPlan] = useState<CustomerPlan>(defaultPlan);

  const changeDays = (days: string[]) => {
    const newPlan = {
      deliveries: plan.deliveries.map((delivery, index) => ({
        deliveryDay: days[index],
        items: delivery.items,
      })),
    };
    setPlan(newPlan);
    props.onChange(newPlan);
  };

  const changeQuantity = (planString: string, newQuantities: number[]) => {
    // eslint-disable-next-line no-console
    console.log(newQuantities);
    const newPlan = {
      deliveries: plan.deliveries.map((delivery, index) => ({
        ...delivery,
        items: delivery.items.map((item) =>
          item.name === planString
            ? { ...item, quantity: newQuantities[index] }
            : item
        ),
      })),
    };

    setPlan(newPlan);
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
            quantities={plan.deliveries.map(
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
            quantities={plan.deliveries.map(
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
