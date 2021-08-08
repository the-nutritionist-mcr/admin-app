import React, { FC, useState } from "react";
import {
  TableRow,
  TableCell,
  TableHeader,
  Select,
  ThemeContext,
} from "grommet";

interface PlanHeaderProps {
  defaultDeliveryDays: string[];
  onChange: (days: string[]) => void;
}

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const PlanHeader: FC<PlanHeaderProps> = (props) => {
  const [days, setDays] = useState<string[]>(props.defaultDeliveryDays);
  return (
    <TableHeader>
      <TableRow>
        <TableCell scope="col">
          <strong>Plan</strong>
        </TableCell>
        {[...new Array(props.defaultDeliveryDays.length)].map((_, index) => (
          <TableCell key={`day-${index + 1}-header`}>
            <ThemeContext.Extend
              value={{
                global: {
                  input: {
                    padding: "0",
                    font: {
                      weight: 400,
                    },
                  },
                },
              }}
            >
              <Select
                plain
                options={daysOfWeek}
                value={days[index]}
                onChange={(event) => {
                  const newDays = [...days];
                  newDays[index] = event.value;
                  setDays(newDays);
                  props.onChange(newDays);
                }}
              />
            </ThemeContext.Extend>
          </TableCell>
        ))}
        <TableCell>Total</TableCell>
      </TableRow>
    </TableHeader>
  );
};

export default PlanHeader;
