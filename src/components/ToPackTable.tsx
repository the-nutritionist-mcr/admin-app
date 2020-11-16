import {
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from "grommet";

import Customer from "../domain/Customer";
import CustomerMealsSelection from "../types/CustomerMealsSelection";
import DeliveryMealsSelection from "../types/DeliveryMealsSelection";
import React from "react";
import Recipe from "../domain/Recipe";
import { createVariantString } from "../lib/plan-meals";

interface ToPackTableProps {
  deliveryMeals: DeliveryMealsSelection;
  customerMeals: CustomerMealsSelection;
}

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
    <React.Fragment>
      <Heading level={2}>To Pack</Heading>
      <Table alignSelf="start">
        <TableHeader>
          <TableCell>
            <strong>Customer Name</strong>
          </TableCell>
          {props.deliveryMeals.map((_item, index) => (
            <TableCell key={index}>
              <strong>Meal {index + 1}</strong>
            </TableCell>
          ))}
        </TableHeader>
        <TableBody>
          {props.customerMeals.map((customerPlan) => (
            <TableRow key={customerPlan.customer.id}>
              <TableCell>
                <Text>{customerPlan.customer.name}</Text>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default ToPackTable;
