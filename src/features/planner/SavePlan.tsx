import { Anchor, Box, Button, Heading, Text } from "grommet";
import { clearPlanner, customerSelectionsSelector } from "./planner-reducer";
import { useDispatch, useSelector } from "react-redux";
import { ExtendedParagraph } from "../../components";
import { Plan } from "grommet-icons";
import React from "react";
import downloadPdf from "../../lib/downloadPdf";
import generateDeliveryPlanDocumentDefinition from "../../lib/generateDeliveryPlanDocumentDefinition";
import styled from "styled-components";

const ListWithMargin = styled.ul`
  margin-top: 1rem;
  padding-left: 0;
`;

const IconListItem = styled.li`
  list-style: none;
  display: flex;
  align-items: flex-end;
  margin-bottom: 1rem;
  & > * {
    padding-right: 0.5rem;
  }
`;

interface SavePlanProps {
  onClear: () => void;
}

const SavePlan: React.FC<SavePlanProps> = (props) => {
  const dispatch = useDispatch();

  const customerMeals = useSelector(customerSelectionsSelector);

  if (!customerMeals) {
    return <Text>You need to select some meals</Text>;
  }

  return (
    <React.Fragment>
      <ExtendedParagraph margin={{ top: "medium" }}>
        Click on the links below to download your delivery plan and labels. To
        start again, click the <strong>clear</strong> button.
        <Box
          direction="row"
          gap="small"
          margin={{ top: "medium", bottom: "large" }}
        >
          <Button
            onClick={(): void => {
              dispatch(clearPlanner());
              props.onClear();
            }}
            label="Clear"
          />
        </Box>
      </ExtendedParagraph>
      <Heading level={3}>Downloads</Heading>
      <ListWithMargin>
        <IconListItem>
          <Plan />
          <Anchor
            onClick={() => {
              const document = generateDeliveryPlanDocumentDefinition(
                customerMeals
              );
              downloadPdf(document, "plan.pdf");
            }}
          >
            Delivery Plan
          </Anchor>
        </IconListItem>
      </ListWithMargin>
    </React.Fragment>
  );
};

export default SavePlan;
