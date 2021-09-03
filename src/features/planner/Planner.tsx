import { Heading, Header, Button } from "grommet";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { fetchCustomers } from "../customers/customersSlice";
import { fetchRecipes } from "../../features/recipes/recipesSlice";
import Finalize from "./Finalize";
import { clearPlanner, customerSelectionsSelector } from "./planner-reducer";
import generateDeliveryPlanDocumentDefinition from "../../lib/generateDeliveryPlanDocumentDefinition";
import generateCookPlanDocumentDefinition from "../../lib/generateCookPlanDocumentDefinition";
import useRecipes from "../recipes/useRecipes";
import downloadPdf from "../../lib/downloadPdf";
import { makeCookPlan } from "../../lib/plan-meals";

const Planner: React.FC = () => {
  const dispatch = useDispatch();
  const customerMeals = useSelector(customerSelectionsSelector);
  const { recipes } = useRecipes();

  React.useEffect(() => {
    (async () => {
      await dispatch(fetchCustomers());
      await dispatch(fetchRecipes());
    })();
  }, [dispatch]);

  return (
    <>
      <Header align="center" justify="start" gap="small">
        <Heading level={2}>Planner</Heading>
        <Button
          primary
          size="small"
          label="Pack Plan"
          disabled={Boolean(!customerMeals || !recipes)}
          onClick={() => {
            const plan = generateDeliveryPlanDocumentDefinition(
              customerMeals ?? [],
              recipes
            );
            downloadPdf(plan, "pack-plan.pdf");
          }}
        />
        <Button
          primary
          size="small"
          label="Cook Plan"
          disabled={Boolean(!customerMeals || !recipes)}
          onClick={() => {
            const plan = makeCookPlan(customerMeals ?? [], recipes);
            downloadPdf(
              generateCookPlanDocumentDefinition(plan),
              "cook-plan.pdf"
            );
          }}
        />
        <Button
          primary
          size="small"
          label="Reset"
          onClick={(): void => {
            dispatch(clearPlanner());
          }}
        />
      </Header>
      <Finalize />
    </>
  );
};

export default Planner;
