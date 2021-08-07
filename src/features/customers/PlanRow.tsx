import React, { FC, useState } from "react";
import { TableRow, TableCell, Select, ThemeContext, base } from "grommet";
import styled from "styled-components";

const SELECT_RANGE = 21;

interface PlanRowProps {
  plan: string;
  defaultDeliveryDays: string[];
  quantities: number[];
  onChange: (plan: string, quantities: number[]) => void;
}

const selectRange = [...new Array(SELECT_RANGE)].map((_, index) => index);

const AlternatingTableRow = styled(TableRow)`
  &:nth-child(2n) {
    background-color: ${base.global?.colors?.["light-3"]};
  }
  box-sizing: border-box;
  &:hover {
    outline: 1px solid ${base.global?.colors?.["brand"]};
  }
`;

const PlanRow: FC<PlanRowProps> = (props) => {
  const [quantities, setQuantities] = useState<number[]>(props.quantities);
  // eslint-disable-next-line no-console
  return (
    <AlternatingTableRow>
      <TableCell>{props.plan}</TableCell>
      {[...new Array(props.defaultDeliveryDays.length)].map((_, index) => (
        <TableCell key={`${props.plan}-${index + 1}`} scope="col">
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
              options={selectRange.map((item) => String(item))}
              value={String(quantities[index])}
              onChange={(event) => {
                const newQuantities = [...quantities];
                newQuantities[index] = Number.parseInt(event.value, 10);
                setQuantities(newQuantities);
                props.onChange(props.plan, newQuantities);
              }}
            />
          </ThemeContext.Extend>
        </TableCell>
      ))}
    </AlternatingTableRow>
  );
};

export default PlanRow;
