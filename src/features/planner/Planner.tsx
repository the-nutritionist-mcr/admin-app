import { Anchor, Heading, Tab, Tabs, ThemeContext, base } from "grommet";

import ChooseMeals from "./ChooseMeals";
import React from "react";
import ToPackTable from "./ToPackTable";
import { fetchCustomers } from "../customers/customersSlice";
import { fetchRecipes } from "../../features/recipes/recipesSlice";
import { useDispatch } from "react-redux";

const Planner: React.FC = () => {
  const dispatch = useDispatch();

  const [tab, setTab] = React.useState(0);

  const nextTab = React.useCallback(() => setTab((oldTab) => oldTab + 1), [
    setTab,
  ]);

  React.useEffect(() => {
    (async () => {
      await dispatch(fetchCustomers());
      await dispatch(fetchRecipes());
    })();
  }, [dispatch]);

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
              <ChooseMeals onNext={nextTab} />
            </ThemeContext.Extend>
          </Tab>
          <Tab title="Allocate">
            <ThemeContext.Extend value={resetEdgeSize}>
              <ToPackTable onNext={nextTab} />
            </ThemeContext.Extend>
          </Tab>
          <Tab title="Plan">
            <ThemeContext.Extend value={resetEdgeSize}>
              <ul>
                <li>
                  <Anchor
                    onClick={() => {
                      // NOOP
                    }}
                  >
                    Labels
                  </Anchor>
                </li>
              </ul>
            </ThemeContext.Extend>
          </Tab>
        </Tabs>
      </ThemeContext.Extend>
    </React.Fragment>
  );
};

export default Planner;
