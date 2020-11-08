import React from "react";
import CustomerMealsSelection from "../types/CustomerMealsSelection";
import DeliveryMealsSelection from "../types/DeliveryMealsSelection";
import Recipe from "../domain/Recipe";
import Customer from "../domain/Customer";
import { createVariantString } from "../lib/plan-meals";

import { Text, Strong, Table, Heading, majorScale } from "evergreen-ui";

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
      <Heading
        is="h2"
        size={700}
        marginBottom={majorScale(2)}
        marginTop={majorScale(2)}
      >
        To Pack
      </Heading>
      <Table>
        <Table.Head>
          <Table.TextHeaderCell>
            <Strong>Customer Name</Strong>
          </Table.TextHeaderCell>
          {props.deliveryMeals.map((_item, index) => (
            <Table.TextHeaderCell>
              <Strong>Meal {index + 1}</Strong>
            </Table.TextHeaderCell>
          ))}
        </Table.Head>
        <Table.Body>
          {props.customerMeals.map((customerPlan) => (
            <Table.Row>
              <Table.TextCell>
                <Text>{customerPlan.customer.name}</Text>
              </Table.TextCell>
              {props.deliveryMeals.map((_item, index) => (
                <Table.TextCell>
                  {makePackTableCellText(
                    index,
                    customerPlan.meals,
                    customerPlan.customer
                  )}
                </Table.TextCell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </React.Fragment>
  );
};

export default ToPackTable;
