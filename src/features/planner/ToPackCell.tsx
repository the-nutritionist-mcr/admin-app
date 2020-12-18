import { Select, TableCell } from "grommet";
import CustomerMealsSelection from "../../types/CustomerMealsSelection";
import React from "react";
import Recipe from "../../domain/Recipe";
import { adjustCustomerSelection } from "./planner-reducer";
import { createMealWithVariantString } from "../../lib/plan-meals";
import deepMemo from "../../lib/deepMemo";
import { useDispatch } from "react-redux";

interface ToPackCellProps {
  index: number;
  deliveryMeals: Recipe[];
  customerSelection: CustomerMealsSelection[number];
}

const UnMemoizedToPackCell: React.FC<ToPackCellProps> = (props) => {
  const dispatch = useDispatch();

  const onChange = React.useCallback(
    (event) =>
      dispatch(
        adjustCustomerSelection({
          index: props.index,
          customer: props.customerSelection.customer,
          recipe: event.value,
        })
      ),
    [dispatch, props.customerSelection.customer, props.index]
  );

  return (
    <TableCell key={props.index}>
      <Select
        plain
        size="small"
        options={props.deliveryMeals}
        placeholder="None"
        valueKey="name"
        labelKey={(meal: Recipe) =>
          createMealWithVariantString(props.customerSelection.customer, meal)
        }
        value={props.customerSelection.meals[props.index]}
        onChange={onChange}
      />
    </TableCell>
  );
};

const ToPackCell = deepMemo(UnMemoizedToPackCell);

export default ToPackCell;
