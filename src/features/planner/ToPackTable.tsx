import { Heading, Table, TableCell, Text } from "grommet";

import {
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
            <TableCell>
              <strong>Customer Name</strong>
            </TableCell>
            {props.deliveryMeals.map((_item, index) => (
              <TableCell key={index}>
                <strong>Meal {index + 1}</strong>
              </TableCell>
            ))}
          </PrintableTableRow>
        </PrintableThead>
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
              <PrintableTableRow key={customerPlan.customer.id}>
                <TableCell className="customerName">
                  <Text>
                    {customerPlan.customer.firstName}{" "}
                    {customerPlan.customer.surname}
                  </Text>
                </TableCell>
                {props.deliveryMeals.map((_item, index) => (
                  <TableCell key={index}>
                    {makePackTableCellText(
                      index,
                      customerPlan.meals,
                      customerPlan.customer
                    )}
                  </TableCell>
                ))}
              </PrintableTableRow>
            ))}
        </PrintableTbody>
      </Table>
    </SectionWithPageBreak>
  );
};

export default ToPackTable;
