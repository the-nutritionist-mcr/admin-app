import {
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from "grommet";

import CookPlan from "../../types/CookPlan";
import React from "react";
import styled from "styled-components";

interface ToCookTableProps {
  plan: CookPlan;
}

const UlWithNoPadding = styled.ul`
  padding: 0;
  list-style: none;
`;

const SectionWithPageBreak = styled.section`
  @media print {
    page-break-after: always;
  }
`;

const ToCookTable: React.FC<ToCookTableProps> = (props) => (
  <SectionWithPageBreak>
    <Heading is="h2" level={2}>
      To Cook
    </Heading>
    <Table alignSelf="start">
      <TableHeader>
        <TableRow>
          {props.plan.map((item, index) => (
            <TableCell key={index} pad="medium">
              <strong>{item.recipe.name}</strong>
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          {props.plan.map((item, index) => (
            <TableCell key={index} pad="small" verticalAlign="top">
              <UlWithNoPadding>
                {Object.keys(item.plan)
                  .sort((a, b) => a.localeCompare(b))
                  .map((variantName) => (
                    <li key={variantName}>
                      <Text>
                        {item.plan[variantName]} x {variantName}
                      </Text>
                    </li>
                  ))}
              </UlWithNoPadding>
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  </SectionWithPageBreak>
);

export default ToCookTable;
