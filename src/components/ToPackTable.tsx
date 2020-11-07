import React from "react";
import DeliveryMealsSelection from "../types/DeliveryMealsSelection";
import CustomerMealsSelection from "../types/CustomerMealsSelection";

import { Table, Heading, majorScale } from "evergreen-ui";

interface ToPackTableProps {
  deliveryMeals: DeliveryMealsSelection;
  customerMeals: CustomerMealsSelection;
}

const ToPackTable: React.FC<ToPackTableProps> = (props) => (
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
      <Table.Body>
        {props.customerMeals.map((customer) => (
          <Table.Row>
            {customer.meals.map((meal) => (
              <Table.TextCell>{meal.name} -</Table.TextCell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </React.Fragment>
);
