import { Heading, Header, Button } from "grommet";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { allRecipesSelector } from "../recipes/recipesSlice";
import Finalize from "./Finalize";
import { clearPlanner, customerSelectionsSelector } from "./planner-reducer";
import generateDeliveryPlanDocumentDefinition from "../../lib/generateDeliveryPlanDocumentDefinition";
import generateCookPlanDocumentDefinition from "../../lib/generateCookPlanDocumentDefinition";
import downloadPdf from "../../lib/downloadPdf";
import { makeCookPlan } from "../../meal-planning";

const Planner: React.FC = () => {
  const dispatch = useDispatch();
  const customerMeals = useSelector(customerSelectionsSelector);
  const recipes = useSelector(allRecipesSelector);

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
