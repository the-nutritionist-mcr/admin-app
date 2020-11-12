import React from "react";
import CustomerMealsSelection from "../types/CustomerMealsSelection";
import DeliveryMealsSelection from "../types/DeliveryMealsSelection";
import Recipe from "../domain/Recipe";
import Customer from "../domain/Customer";
import { createVariantString } from "../lib/plan-meals";

import {
  Text,
  Table,
  Heading,
  TableCell,
  TableHeader,
  TableBody,
  TableRow,
} from "grommet";

interface ToPackTableProps {
  deliveryMeals: DeliveryMealsSelection;
  customerMeals: CustomerMealsSelection;
}

const makePackTableCellText = (
  index: number,
  recipes: Recipe[],
  customer: Customer
) => {
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
          <TableCell>Customer Name</TableCell>
          {props.deliveryMeals.map((_item, index) => (
            <TableCell>Meal {index + 1}</TableCell>
          ))}
        </TableHeader>
        <TableBody>
          {props.customerMeals.map((customerPlan) => (
            <TableRow>
              <TableCell>
                <Text>{customerPlan.customer.name}</Text>
              </TableCell>
              {props.deliveryMeals.map((_item, index) => (
                <TableCell>
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
