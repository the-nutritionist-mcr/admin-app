import {
  TableCell,
  TableRow,
  Text,
  base,
  Table,
  TableBody,
  TableHeader,
} from "grommet";
import { CustomerMealsSelection } from "../../lib/plan-meals";
import React from "react";
import Recipe from "../../domain/Recipe";
import deepMemo from "../../lib/deepMemo";
import styled from "styled-components";
import { batchArray } from "../../lib/batch-array";
import FinalizeCell from "./FinalizeCell";
import DeliveryMealsSelection from "../../types/DeliveryMealsSelection";

interface FinalizeRowProps {
  customerSelection: CustomerMealsSelection[number];
  deliveryMeals: DeliveryMealsSelection[];
  allRecipes: Recipe[];
  columns: number;
}

const AlternatingTableRow = styled(TableRow)`
  box-sizing: border-box;
  &:hover {
    outline: 1px solid ${base.global?.colors?.["brand"]};
  }
`;

const FinalizeCustomerTableUnMemoized: React.FC<FinalizeRowProps> = (props) => {
  const name = `${props.customerSelection.customer.firstName} ${props.customerSelection.customer.surname}`;

  const deliveries = props.customerSelection.deliveries ?? []

  return (
    <Table alignSelf="start" style={{ marginTop: "1rem" }}>
      <TableHeader>
        <TableRow>
          <TableCell colSpan={7}>
            <Text>
              <strong>{name}</strong>
            </Text>
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {deliveries.flatMap((delivery, deliveryIndex) =>
          batchArray(delivery, props.columns).map((row, batchIndex) => (
            <AlternatingTableRow
              style={{ width: "100%" }}
              key={`${props.customerSelection.customer.id}-${deliveryIndex}-${batchIndex}}-row`}
            >
              <TableCell scope="row">
                <Text>
                  <strong>C{deliveryIndex + 1}</strong>
                </Text>
              </TableCell>
              {row.map((item, itemIndex) => (
                <FinalizeCell
                  key={`${props.customerSelection.customer.id}-${deliveryIndex}-${batchIndex}-cell-${itemIndex}`}
                  deliveryIndex={deliveryIndex}
                  index={batchIndex * props.columns + itemIndex}
                  deliveryMeals={props.deliveryMeals}
                  allRecipes={props.allRecipes}
                  selectedItem={item}
                  customerSelection={props.customerSelection}
                />
              ))}
            </AlternatingTableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

const FinalizeCustomerTable = deepMemo(FinalizeCustomerTableUnMemoized);

export default FinalizeCustomerTable;
