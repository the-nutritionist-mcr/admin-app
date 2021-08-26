import React, { FC } from "react";
import { TableRow, TableCell, TableHeader } from "grommet";

interface PlanHeaderProps {
  deliveryDays: ReadonlyArray<string>;
}

const PlanHeader: FC<PlanHeaderProps> = (props) => (
  <TableHeader>
    <TableRow>
      <TableCell scope="col">
        <strong>Plan</strong>
      </TableCell>
      {props.deliveryDays.map((day, index) => (
        <TableCell key={`day-${index + 1}-header`} scope="col">
          <strong>{day}</strong>
        </TableCell>
      ))}
      <TableCell scope="col">
        <strong>Total</strong>
      </TableCell>
    </TableRow>
  </TableHeader>
);

export default PlanHeader;
