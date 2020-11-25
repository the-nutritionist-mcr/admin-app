import { Heading, Table, Text } from "grommet";

import {
  PrintableTableCell,
  PrintableTableRow,
  PrintableTbody,
  PrintableThead,
} from "../../components/printable-table";

import Customer from "../../domain/Customer";
import CustomerMealsSelection from "../../types/CustomerMealsSelection";
import DeliveryMealsSelection from "../../types/DeliveryMealsSelection";
import React from "react";
import Recipe from "../../domain/Recipe";
import { createVariantString } from "../../lib/plan-meals";
import styled from "styled-components";

interface ToPackTableProps {
  deliveryMeals: DeliveryMealsSelection;
  customerMeals: CustomerMealsSelection;
}

export const SectionWithPageBreak = styled.section`
  @media print {
    page-break-before: always;
  }
`;

const makePackTableCellText = (
  index: number,
  recipes: Recipe[],
  customer: Customer
): React.ReactElement | string => {
  if (index >= recipes.length) {
    return "";
  }

  const recipe = recipes[index];

  return (
    <React.Fragment>
      <Text>
        {recipe.name} ({createVariantString(customer, recipe)})
      </Text>
    </React.Fragment>
  );
};

const ToPackTable: React.FC<ToPackTableProps> = (props) => {
  return (
    <SectionWithPageBreak>
      <Heading level={2} is="h2">
        To Pack
      </Heading>
      <Table alignSelf="start">
        <PrintableThead>
          <PrintableTableRow>
            <PrintableTableCell>
              <strong>Customer Name</strong>
            </PrintableTableCell>
            {props.deliveryMeals.map((_item, index) => (
              <PrintableTableCell key={index}>
                <strong>Meal {index + 1}</strong>
              </PrintableTableCell>
            ))}
          </PrintableTableRow>
        </PrintableThead>
        <PrintableTbody>
          {props.customerMeals.map((customerPlan) => (
            <PrintableTableRow key={customerPlan.customer.id}>
              <PrintableTableCell>
                <Text>
                  {customerPlan.customer.firstName}{" "}
                  {customerPlan.customer.surname}
                </Text>
              </PrintableTableCell>
              {props.deliveryMeals.map((_item, index) => (
                <PrintableTableCell key={index}>
                  {makePackTableCellText(
                    index,
                    customerPlan.meals,
                    customerPlan.customer
                  )}
                </PrintableTableCell>
              ))}
            </PrintableTableRow>
          ))}
        </PrintableTbody>
      </Table>
    </SectionWithPageBreak>
  );
};

export default ToPackTable;
