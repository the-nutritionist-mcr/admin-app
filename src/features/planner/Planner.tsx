import { Heading, Header, Button } from "grommet";
import { useDispatch } from "react-redux";

import React from "react";
import { fetchCustomers } from "../customers/customersSlice";
import { fetchRecipes } from "../../features/recipes/recipesSlice";
import Finalize from "./Finalize";
import { clearPlanner } from "./planner-reducer";

const Planner: React.FC = () => {
  const dispatch = useDispatch();

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
          disabled={true}
        />
        <Button
          primary
          size="small"
          label="Cook Plan"
          disabled={true}
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
