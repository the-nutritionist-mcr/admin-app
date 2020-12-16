import { Box, Button, Heading, Paragraph, Select, Tab, Tabs } from "grommet";
import {
  allRecipesSelector,
  fetchRecipes,
} from "../../features/recipes/recipesSlice";
import {
  clearPlanner,
  customerSelectionsSelector,
  deliveryDaySelector,
  generateCustomerMeals,
  plannedMealsSelector,
  selectDay,
  selectMeal,
} from "./planner-reducer";
import { useDispatch, useSelector } from "react-redux";

import DeliveryDay from "../../types/DeliveryDay";
import DeliveryMealsSelection from "../../types/DeliveryMealsSelection";
import React from "react";
import Recipe from "../../domain/Recipe";
import ToPackTable from "./ToPackTable";
import { fetchCustomers } from "../customers/customersSlice";

const defaultPlans: DeliveryMealsSelection = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];

const Planner: React.FC = () => {
  const dispatch = useDispatch();

  const day = useSelector(deliveryDaySelector);
  const planned = useSelector(plannedMealsSelector);
  const recipes = useSelector(allRecipesSelector);
  const chosenMeals = useSelector(customerSelectionsSelector);
  const [tab, setTab] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      await dispatch(fetchCustomers());
      await dispatch(fetchRecipes());
    })();
  }, [dispatch]);

  const activeSelections = planned.filter(Boolean);

  return (
    <React.Fragment>
      <Heading level={2}>Planner</Heading>
      <Tabs
        alignControls="start"
        margin={"0"}
        activeIndex={tab}
        onActive={(index) => setTab(index)}
      >
        <Tab title="Choose">
          <Paragraph>
            Welcome to the delivery planner. Please note that data in this
            section is stored <strong>locally</strong> only.
          </Paragraph>
          <Paragraph>
            Use the selection boxes below to choose what delivery day you are
            planning for and what meals you would like to include in the
            delivery.
          </Paragraph>
          <Paragraph>
            When you are ready, click the <strong>next</strong> button to
            generate a delivery plan, or <strong>clear</strong> to start again
          </Paragraph>
          <Box direction="row" gap="small">
            <Button
              primary
              onClick={() => {
                dispatch(generateCustomerMeals());
                setTab((oldTab) => oldTab + 1);
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
          <Box direction="column" gap="small" align="start">
            {planned.map((plan, index) => (
              <Select
                key={index}
                name={`meal-${index}`}
                options={recipes}
                placeholder="None"
                value={plan ?? ""}
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
        </Tab>
        <Tab title="Allocate">
          <ToPackTable
            customerMeals={chosenMeals ?? []}
            deliveryMeals={defaultPlans}
          />
        </Tab>
        <Tab title="Plan"></Tab>
      </Tabs>
    </React.Fragment>
  );
};

export default Planner;
