import { Box, Button, Heading, Paragraph, Select, Tab, Tabs } from "grommet";
import {
  LOCALSTORAGE_KEY_DAY,
  LOCALSTORAGE_KEY_PLANNED,
} from "../../lib/constants";

import DeliveryDay from "../../types/DeliveryDay";
import DeliveryMealsSelection from "../../types/DeliveryMealsSelection";
import React from "react";
import Recipe from "../../domain/Recipe";
import ToPackTable from "./ToPackTable";
import { allCustomersSelector } from "../../features/customers/customersSlice";
import { allRecipesSelector } from "../../features/recipes/recipesSlice";
import { chooseMeals } from "../../lib/plan-meals";
import { useSelector } from "react-redux";

const defaultPlans: DeliveryMealsSelection = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];

const Planner: React.FC = () => {
  const [day, setDay] = React.useState<DeliveryDay>(
    (localStorage.getItem(LOCALSTORAGE_KEY_DAY) as DeliveryDay) ?? ""
  );

  const [planned, setPlanned] = React.useState<DeliveryMealsSelection>(
    defaultPlans
  );

  const customers = useSelector(allCustomersSelector);
  const recipes = useSelector(allRecipesSelector);

  const chosenMeals = chooseMeals(day, planned, customers);

  const activeSelections = planned.filter(Boolean);

  return (
    <React.Fragment>
      <Heading level={2}>Planner</Heading>
      <Tabs alignControls="start" margin={"0"}>
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
          <Heading level={3}>Delivery Day</Heading>
          <Select
            placeholder="Select Day"
            name="selectDay"
            options={["Monday", "Thursday"]}
            value={day}
            onChange={(event: { value: DeliveryDay }): void => {
              setDay(event.value);
              localStorage.setItem(LOCALSTORAGE_KEY_DAY, event.value);
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
                  const newPlanned = [...planned];
                  newPlanned[index] = recipes.find(
                    (recipe) => recipe.id === event?.value?.id
                  );
                  localStorage.setItem(
                    LOCALSTORAGE_KEY_PLANNED,
                    JSON.stringify(newPlanned.map((item) => item?.id))
                  );
                  setPlanned(newPlanned);
                }}
              />
            ))}
            {activeSelections.length > 0 || day !== "" ? (
              <Button
                onClick={(): void => {
                  setDay("");
                  setPlanned(defaultPlans);
                  localStorage.setItem(
                    LOCALSTORAGE_KEY_PLANNED,
                    JSON.stringify(defaultPlans)
                  );
                }}
                label="Clear"
              />
            ) : null}
          </Box>
        </Tab>
        <Tab title="Allocate">
          <ToPackTable
            customerMeals={chosenMeals}
            deliveryMeals={defaultPlans}
          />
        </Tab>
        <Tab title="Plan"></Tab>
      </Tabs>
    </React.Fragment>
  );
};

export default Planner;
