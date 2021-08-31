import { Heading, Header, Button } from "grommet";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { fetchCustomers } from "../customers/customersSlice";
import { fetchRecipes } from "../../features/recipes/recipesSlice";
import Finalize from "./Finalize";
import { clearPlanner, customerSelectionsSelector } from "./planner-reducer";
import generateDeliveryPlanDocumentDefinition from "../../lib/generateDeliveryPlanDocumentDefinition";
import useRecipes from "../recipes/useRecipes";
import downloadPdf from "../../lib/downloadPdf";

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
          label="Delivery Plan"
          disabled={Boolean(!customerMeals)}
          onClick={() => {
            const plan = generateDeliveryPlanDocumentDefinition(
              customerMeals ?? [],
              recipes
            );
            downloadPdf(plan, "delivery-plan.pdf");
          }}
        />
        <Button primary size="small" label="Cook Plan" disabled={true} />
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
