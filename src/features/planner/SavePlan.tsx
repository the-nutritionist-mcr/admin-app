import { Anchor, Box, Button, Heading } from "grommet";
import { Plan, Restaurant, Tag } from "grommet-icons";
import { ExtendedParagraph } from "../../components";
import React from "react";
import { clearPlanner } from "./planner-reducer";
import styled from "styled-components";
import { useDispatch } from "react-redux";

const ListWithMargin = styled.ul`
  margin-top: 1rem;
  padding-left: 0;
`;

const IconListItem = styled.li`
  list-style: none;
  align-items: flex-end;
  display: flex;
  margin-bottom: 1rem;
  & > * {
    padding-right: 0.5rem;
  }
`;

interface SavePlanProps {
  onClear: () => void;
}

const FlexAnchor = styled(Anchor)``;

const SavePlan: React.FC<SavePlanProps> = (props) => {
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <ExtendedParagraph>
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
          <FlexAnchor
            onClick={() => {
              // NOOP
            }}
          >
            Delivery Plan
          </FlexAnchor>
        </IconListItem>
        <IconListItem>
          <Restaurant />
          <FlexAnchor
            onClick={() => {
              // NOOP
            }}
          >
            Cook Plan
          </FlexAnchor>
        </IconListItem>
        <IconListItem>
          <Tag />
          <FlexAnchor
            onClick={() => {
              // NOOP
            }}
          >
            Labels
          </FlexAnchor>
        </IconListItem>
      </ListWithMargin>
    </React.Fragment>
  );
};

export default SavePlan;
