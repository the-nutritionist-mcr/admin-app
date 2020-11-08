import React from "react";
import CookPlan from "../types/CookPlan";
import {
  UnorderedList,
  ListItem,
  Strong,
  Text,
  Table,
  Heading,
  majorScale,
} from "evergreen-ui";

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
        <Table.TextHeaderCell>
          <Strong>Meal</Strong>
        </Table.TextHeaderCell>
        <Table.TextHeaderCell>
          <Strong>Quantities</Strong>
        </Table.TextHeaderCell>
      </Table.Head>
      {props.plan.map((item) => (
        <Table.Row height="auto">
          <Table.TextCell>
            <Text>{item.recipe.name}</Text>
          </Table.TextCell>
          <Table.TextCell>
            <UnorderedList>
              {Object.keys(item.plan).map((variantName) => (
                <ListItem>
                  <Text>
                    {item.plan[variantName]} x {variantName}
                  </Text>
                </ListItem>
              ))}
            </UnorderedList>
          </Table.TextCell>
        </Table.Row>
      ))}
    </Table>
  </React.Fragment>
);

export default ToCookTable;
