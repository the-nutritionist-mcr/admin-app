import {
  Box,
  Button,
  Heading,
  Select,
  Tab,
  Tabs,
  ThemeContext,
  base,
} from "grommet";
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
import { ExtendedParagraph } from "../../components";
import React from "react";
import Recipe from "../../domain/Recipe";
import ToPackTable from "./ToPackTable";
import { fetchCustomers } from "../customers/customersSlice";

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

  const resetEdgeSize = {
    global: {
      edgeSize: {
        small: base.global?.edgeSize?.small,
      },
    },
  };

  return (
    <React.Fragment>
      <Heading level={2}>Planner</Heading>
      <ThemeContext.Extend
        value={{
          tabs: {
            gap: "medium",
          },
          global: {
            edgeSize: {
              small: "0",
            },
          },
        }}
      >
        <Tabs
          alignControls="start"
          margin="none"
          activeIndex={tab}
          onActive={(index) => setTab(index)}
        >
          <Tab title="Choose">
            <ThemeContext.Extend value={resetEdgeSize}>
              <ExtendedParagraph margin={{ top: "medium" }}>
                Welcome to the delivery planner. Please note that data in this
                section is stored <strong>locally</strong> only.
              </ExtendedParagraph>
              <ExtendedParagraph>
                Use the selection boxes below to choose what delivery day you
                are planning for and what meals you would like to include in the
                delivery. When you are ready, click the <strong>next</strong>{" "}
                button to generate a delivery plan, or <strong>clear</strong> to
                start again
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

              <Box direction="row" gap="small" align="start">
                {planned.map((plan, index) => (
                  <Select
                    key={index}
                    name={`meal-${index}`}
                    options={recipes}
                    placeholder="None"
                    value={plan ?? ""}
                    labelKey={(
                      labelPlan: undefined | Recipe
                    ): string | undefined => labelPlan?.name}
                    onChange={(event: { value: Recipe | undefined }): void => {
                      const newChoice = recipes.find(
                        (recipe) => recipe.id === event?.value?.id
                      );
                      dispatch(selectMeal({ index, recipe: newChoice }));
                    }}
                  />
                ))}
              </Box>
            </ThemeContext.Extend>
          </Tab>
          <Tab title="Allocate">
            <ThemeContext.Extend value={resetEdgeSize}>
              <ToPackTable
                onNext={() => setTab((oldTab) => oldTab + 1)}
                customerMeals={chosenMeals ?? []}
                deliveryMeals={planned}
              />
            </ThemeContext.Extend>
          </Tab>
          <Tab title="Plan">
            <ThemeContext.Extend value={resetEdgeSize}></ThemeContext.Extend>
          </Tab>
        </Tabs>
      </ThemeContext.Extend>
    </React.Fragment>
  );
};

export default Planner;
