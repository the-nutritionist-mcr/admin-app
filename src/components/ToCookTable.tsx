import React from "react";
import CookPlan from "../types/CookPlan";
import { Table, Heading, majorScale } from "evergreen-ui";

interface ToCookTableProps {
  plan: CookPlan;
}

const ToCookTable: React.FC<ToCookTableProps> = (props) => (
  <React.Fragment>
    <Heading
      is="h2"
      size={700}
      marginBottom={majorScale(2)}
      marginTop={majorScale(2)}
    >
      To Cook
    </Heading>
    <Table>
      <Table.Head>
        <Table.TextHeaderCell>Meal</Table.TextHeaderCell>
        <Table.TextHeaderCell>Variant</Table.TextHeaderCell>
        <Table.TextHeaderCell>Quantity</Table.TextHeaderCell>
      </Table.Head>
      {props.plan.map((item) =>
        Object.keys(item.plan).map((variantName) => (
          <Table.Row>
            <Table.TextCell>{item.recipe.name}</Table.TextCell>
            <Table.TextCell>{variantName}</Table.TextCell>
            <Table.TextCell>{item.plan[variantName]}</Table.TextCell>
          </Table.Row>
        ))
      )}
    </Table>
  </React.Fragment>
);

export default ToCookTable;
