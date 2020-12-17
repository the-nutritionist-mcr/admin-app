import {
  Paragraph,
  Select,
  Table,
  TableCell,
  TableRow,
  Text,
  ThemeContext,
  base,
} from "grommet";

import CustomerMealsSelection from "../../types/CustomerMealsSelection";
import DeliveryMealsSelection from "../../types/DeliveryMealsSelection";

import { PrintableTbody } from "../../components/printable-table";
import React from "react";
import Recipe from "../../domain/Recipe";
import { adjustCustomerSelection } from "./planner-reducer";
import styled from "styled-components";
import { useDispatch } from "react-redux";

interface ToPackTableProps {
  deliveryMeals: DeliveryMealsSelection;
  customerMeals: CustomerMealsSelection;
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

export const SectionWithPageBreak = styled.section`
  @media print {
    page-break-before: always;
  }
`;

const ToPackTable: React.FC<ToPackTableProps> = (props) => {
  type ExcludesUndefined = <T>(x: T | undefined) => x is T;

  const dispatch = useDispatch();

  const deliveryMeals = props.deliveryMeals
    .filter((Boolean as unknown) as ExcludesUndefined)
    .reduce<Recipe[]>((meals, meal) => {
      if (!meals.find((mealNeedle) => mealNeedle.name === meal.name)) {
        meals.push(meal);
      }
      return meals;
    }, []);

  const columns = props.customerMeals.reduce<number>(
    (numColumns, customer) =>
      customer.meals.length > numColumns ? customer.meals.length : numColumns,
    0
  );

  return (
    <SectionWithPageBreak>
      <Paragraph>
        Each customer has now been allocated a meal according to their plan and
        the meals you have selected. Use the select boxes below to make
        adjustments based on the needs of individual customers.
      </Paragraph>
      <Paragraph>
        {" "}
        Once you are finish, click <strong>done</strong> to generate the
        delivery and cook plans, or click <strong>cancel</strong> to clear
        everything and start again.
      </Paragraph>
      <ThemeContext.Extend
        value={{
          table: {
            body: {
              extend: `
              & tr {
                background-color: red;
              }
            `,
            },
          },
        }}
      >
        <Table alignSelf="start">
          <PrintableTbody>
            {props.customerMeals
              .slice()
              .sort((a, b) =>
                a.customer.surname.toLowerCase() >
                b.customer.surname.toLowerCase()
                  ? 1
                  : // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                    -1
              )
              .map((customerPlan) => (
                <AlternatingTableRow key={customerPlan.customer.id}>
                  <TableCell className="customerName">
                    <Text>
                      {customerPlan.customer.firstName}{" "}
                      {customerPlan.customer.surname}
                    </Text>
                  </TableCell>
                  {[...new Array(columns)].map((_item, index) => (
                    <TableCell key={index}>
                      <Select
                        plain
                        options={deliveryMeals}
                        placeholder="None"
                        labelKey="name"
                        valueKey="name"
                        value={customerPlan.meals[index]}
                        onChange={(event) =>
                          dispatch(
                            adjustCustomerSelection({
                              index,
                              customer: customerPlan.customer,
                              recipe: event.value,
                            })
                          )
                        }
                      />
                    </TableCell>
                  ))}
                </AlternatingTableRow>
              ))}
          </PrintableTbody>
        </Table>
      </ThemeContext.Extend>
    </SectionWithPageBreak>
  );
};

export default ToPackTable;
