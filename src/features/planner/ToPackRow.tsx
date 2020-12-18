import { Select, TableCell, TableRow, Text, base } from "grommet";
import CustomerMealsSelection from "../../types/CustomerMealsSelection";
import React from "react";
import Recipe from "../../domain/Recipe";
import { adjustCustomerSelection } from "./planner-reducer";
import { createMealWithVariantString } from "../../lib/plan-meals";
import deepEqual from "deep-equal";
import styled from "styled-components";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();

  return (
    <AlternatingTableRow>
      <TableCell className="customerName">
        <Text>
          {props.customerSelection.customer.firstName}{" "}
          {props.customerSelection.customer.surname}
        </Text>
      </TableCell>
      {[...new Array(props.columns)].map((_item, index) => (
        <TableCell key={index}>
          <Select
            plain
            size="small"
            options={props.deliveryMeals}
            placeholder="None"
            valueKey="name"
            labelKey={(meal: Recipe) =>
              createMealWithVariantString(
                props.customerSelection.customer,
                meal
              )
            }
            value={props.customerSelection.meals[index]}
            onChange={(event) =>
              dispatch(
                adjustCustomerSelection({
                  index,
                  customer: props.customerSelection.customer,
                  recipe: event.value,
                })
              )
            }
          />
        </TableCell>
      ))}
    </AlternatingTableRow>
  );
};

const ToPackRow = React.memo(ToPackRowUnMemoized, (oldProps, newProps) => {
  return deepEqual(oldProps, newProps);
});

export default ToPackRow;
