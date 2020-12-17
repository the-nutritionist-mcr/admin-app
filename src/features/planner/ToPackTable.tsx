import { Box, Button, Table, Text } from "grommet";
import {
  clearPlanner,
  customerSelectionsSelector,
  plannedMealsSelector,
} from "./planner-reducer";
import { useDispatch, useSelector } from "react-redux";
import { ExtendedParagraph } from "../../components";
import { PrintableTbody } from "../../components/printable-table";
import React from "react";
import Recipe from "../../domain/Recipe";

import ToPackRow from "./ToPackRow";
import styled from "styled-components";

interface ToPackTableProps {
  onNext: () => void;
}

export const SectionWithPageBreak = styled.section`
  @media print {
    page-break-before: always;
  }
`;

const ToPackTable: React.FC<ToPackTableProps> = (props) => {
  const dispatch = useDispatch();

  const customerMeals = useSelector(customerSelectionsSelector);
  const planned = useSelector(plannedMealsSelector);

  if (!customerMeals) {
    return <Text>You need to select some meals</Text>;
  }

  const columns = customerMeals.reduce<number>(
    (numColumns, customer) =>
      customer.meals.length > numColumns ? customer.meals.length : numColumns,
    0
  );

  type ExcludesUndefined = <T>(x: T | undefined) => x is T;

  const deliveryMeals = planned
    .filter((Boolean as unknown) as ExcludesUndefined)
    .reduce<Recipe[]>((meals, meal) => {
      if (!meals.find((mealNeedle) => mealNeedle.name === meal.name)) {
        meals.push(meal);
      }
      return meals;
    }, []);

  return (
    <SectionWithPageBreak>
      <ExtendedParagraph margin={{ top: "medium" }}>
        Each customer has now been allocated a meal according to their plan and
        the meals you have selected. Use the select boxes below to make
        adjustments based on the needs of individual customers.
      </ExtendedParagraph>
      <ExtendedParagraph>
        Once you are finish, click <strong>next</strong> to see the printable
        delivery and cook plans, or click <strong>cancel</strong> to clear
        everything and start again.
      </ExtendedParagraph>

      <Box
        direction="row"
        gap="small"
        margin={{ top: "medium", bottom: "large" }}
      >
        <Button
          onClick={(): void => {
            dispatch(clearPlanner());
          }}
          label="Clear"
        />
        <Button primary label="Next" onClick={(): void => props.onNext()} />
      </Box>
      <Table alignSelf="start">
        <PrintableTbody>
          {customerMeals
            .slice()
            .sort((a, b) =>
              a.customer.surname.toLowerCase() >
              b.customer.surname.toLowerCase()
                ? 1
                : // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                  -1
            )
            .map((customerPlan) => (
              <ToPackRow
                key={customerPlan.customer.id}
                columns={columns}
                customerSelection={customerPlan}
                deliveryMeals={deliveryMeals}
              />
            ))}
        </PrintableTbody>
      </Table>
    </SectionWithPageBreak>
  );
};

export default ToPackTable;
