import {
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from "grommet";

import CookPlan from "../types/CookPlan";
import React from "react";

interface ToCookTableProps {
  plan: CookPlan;
}

const ToCookTable: React.FC<ToCookTableProps> = (props) => (
  <React.Fragment>
    <Heading is="h2" level={2}>
      To Cook
    </Heading>
    <Table alignSelf="start">
      <TableHeader>
        <TableRow>
          <TableCell>
            <strong>Meal</strong>
          </TableCell>
          <TableCell>
            <strong>Quantities</strong>
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.plan.map((item, index) => (
          <TableRow key={index}>
            <TableCell>
              <Text>{item.recipe.name}</Text>
            </TableCell>
            <TableCell>
              <ul>
                {Object.keys(item.plan).map((variantName) => (
                  <li key={variantName}>
                    <Text>
                      {item.plan[variantName]} x {variantName}
                    </Text>
                  </li>
                ))}
              </ul>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </React.Fragment>
);

export default ToCookTable;
