import { TableCell, TableRow, Text, base } from "grommet";
import CustomerMealsSelection from "../../types/CustomerMealsSelection";
import React from "react";
import Recipe from "../../domain/Recipe";
import ToPackCell from "./ToPackCell";
import deepMemo from "../../lib/deepMemo";
import styled from "styled-components";

interface ToPackRowProps {
  customerSelection: CustomerMealsSelection[number];
  deliveryMeals: Recipe[];
  columns: number;
}

const AlternatingTableRow = styled(TableRow)`
  &:nth-child(2n) {
    background-color: ${base.global?.colors?.["light-3"]};
  }
  box-sizing: border-box;
  &:hover {
    outline: 1px solid ${base.global?.colors?.["brand"]};
  }
`;

const ToPackRowUnMemoized: React.FC<ToPackRowProps> = (props) => {
  return (
    <AlternatingTableRow>
      <TableCell className="customerName">
        <Text>
          {props.customerSelection.customer.firstName}{" "}
          {props.customerSelection.customer.surname}
        </Text>
      </TableCell>
      {[...new Array(props.columns)].map((_item, index) => (
        <ToPackCell
          key={`${props.customerSelection.customer.id}-${index}`}
          index={index}
          deliveryMeals={props.deliveryMeals}
          customerSelection={props.customerSelection}
        />
      ))}
    </AlternatingTableRow>
  );
};

const ToPackRow = deepMemo(ToPackRowUnMemoized);

export default ToPackRow;
