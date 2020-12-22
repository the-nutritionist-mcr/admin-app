import { Box, Button, Heading, Select } from "grommet";

import {
  clearPlanner,
  deliveryDaySelector,
  generateCustomerMeals,
  plannedMealsSelector,
  selectDay,
  selectMeal,
} from "./planner-reducer";
import { useDispatch, useSelector } from "react-redux";

import DeliveryDay from "../../types/DeliveryDay";
import { ExtendedParagraph } from "../../components";
import React from "react";
import Recipe from "../../domain/Recipe";
import { allRecipesSelector } from "../../features/recipes/recipesSlice";

interface ChooseMealsProps {
  onNext: () => void;
}

const ChooseMeals: React.FC<ChooseMealsProps> = (props) => {
  const dispatch = useDispatch();
  const planned = useSelector(plannedMealsSelector);
  const activeSelections = planned.filter(Boolean);
  const recipes = useSelector(allRecipesSelector);
  const day = useSelector(deliveryDaySelector);
  return (
    <React.Fragment>
      <ExtendedParagraph margin={{ top: "medium" }}>
        Welcome to the delivery planner. Please note that data in this section
        is stored <strong>locally</strong> only.
      </ExtendedParagraph>
      <ExtendedParagraph>
        Use the selection boxes below to choose what delivery day you are
        planning for and what meals you would like to include in the delivery.
        When you are ready, click the <strong>next</strong> button to generate a
        delivery plan, or <strong>clear</strong> to start again
      </ExtendedParagraph>
      <Box
        direction="row"
        gap="small"
        margin={{ top: "medium", bottom: "large" }}
      >
        <Button
          primary
          onClick={() => {
            dispatch(generateCustomerMeals());
            props.onNext();
          }}
          label="Generate"
        />
        {activeSelections.length > 0 || day !== "" ? (
          <Button
            onClick={(): void => {
              dispatch(clearPlanner());
            }}
            label="Clear"
          />
        ) : null}
      </Box>
      <Heading level={3}>Delivery Day</Heading>
      <Select
        placeholder="Select Day"
        name="selectDay"
        options={["Monday", "Thursday"]}
        value={day}
        onChange={(event: { value: DeliveryDay }): void => {
          dispatch(selectDay(event.value));
        }}
      />
      <Heading level={3}>Meals</Heading>

      <Box direction="row" gap="small" align="start">
        {planned.map((plan, index) => (
          <Select
            key={index}
            dropAlign={{
              bottom: "top",
            }}
            name={`meal-${index}`}
            options={recipes}
            placeholder="None"
            value={plan ?? ""}
            valueKey={plan?.name}
            labelKey={(labelPlan: undefined | Recipe): string | undefined =>
              labelPlan?.name
            }
            onChange={(event: { value: Recipe | undefined }): void => {
              const newChoice = recipes.find(
                (recipe) => recipe.id === event?.value?.id
              );
              dispatch(selectMeal({ index, recipe: newChoice }));
            }}
          />
        ))}
      </Box>
    </React.Fragment>
  );
};

export default ChooseMeals;
