import { AnyAction, createAction } from "@reduxjs/toolkit";
import AppState from "../../types/AppState";
import Customer from "../../domain/Customer";
import CustomerMealsSelection from "../../types/CustomerMealsSelection";
import DeliveryDay from "../../types/DeliveryDay";
import DeliveryMealsSelection from "../../types/DeliveryMealsSelection";
import Recipe from "../../domain/Recipe";
import { chooseMeals } from "../../lib/plan-meals";

export interface PlannerState {
  selectedMeals: DeliveryMealsSelection;
  deliveryDay: DeliveryDay;
  customerSelections?: CustomerMealsSelection;
}

const initialState: PlannerState = {
  deliveryDay: "",
  selectedMeals: [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ],
};

interface RecipeSelectPayload {
  index: number;
  recipe: Recipe | undefined;
}

interface CustomerSelectionAdjustPayload {
  index: number;
  customer: Customer;
  recipe: Recipe | undefined;
}

const executeAction = <T>(
  state: AppState,
  action: AnyAction | undefined,
  type: string,
  actionCallBack: (
    state: AppState,
    action: { type: string; payload: T }
  ) => AppState
): AppState => {
  const isActionType = (
    testedAction: AnyAction | undefined
  ): testedAction is { type: string; payload: T } =>
    testedAction?.type === type;

  if (isActionType(action)) {
    return actionCallBack(state, action);
  }
  return state;
};

export const clearPlanner = createAction("clearPlanner");
export const adjustCustomerSelection = createAction<CustomerSelectionAdjustPayload>(
  "adjustCustomerSelection"
);
export const selectMeal = createAction<RecipeSelectPayload>("selectMeal");
export const selectDay = createAction<DeliveryDay>("selectDay");
export const generateCustomerMeals = createAction("generateCustomerMeals");

const plannerReducer = (state: AppState, action?: AnyAction): AppState => {
  const planner = state.planner;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!planner) {
    return {
      ...state,
      planner: initialState,
    };
  }

  const stateAfterRecipeChange = executeAction<RecipeSelectPayload>(
    state,
    action,
    selectMeal.type,
    (newState, executingAction) => {
      const newSelections = [...newState.planner.selectedMeals];
      newSelections[executingAction.payload.index] =
        executingAction.payload.recipe;
      return {
        ...newState,
        planner: {
          ...newState.planner,
          selectedMeals: newSelections,
        },
      };
    }
  );

  const stateAfterMealGenerate = executeAction(
    stateAfterRecipeChange,
    action,
    generateCustomerMeals.type,
    (newState) => ({
      ...newState,
      planner: {
        ...newState.planner,
        customerSelections: chooseMeals(
          newState.planner.deliveryDay,
          newState.planner.selectedMeals,
          newState.customers.items
        ),
      },
    })
  );

  const stateAfterDayChange = executeAction<DeliveryDay>(
    stateAfterMealGenerate,
    action,
    selectDay.type,
    (newState, executingAction) => ({
      ...newState,
      planner: {
        ...newState.planner,
        deliveryDay: executingAction.payload,
      },
    })
  );

  const stateAfterClearAll = executeAction(
    stateAfterDayChange,
    action,
    clearPlanner.type,
    (newState) => ({
      ...newState,
      planner: {
        ...initialState,
      },
    })
  );

  return executeAction<CustomerSelectionAdjustPayload>(
    stateAfterClearAll,
    action,
    adjustCustomerSelection.type,
    (newState, executingAction) => {
      if (!newState.planner.customerSelections) {
        return { ...newState };
      }

      const newSelections = newState.planner.customerSelections.map((item) => ({
        customer: {
          ...item.customer,
          plan: { ...item.customer.plan },
          exclusions: item.customer.exclusions.map((exclusion) => ({
            ...exclusion,
          })),
        },
        meals: item.meals.map((meal) => ({
          ...meal,
          potentialExclusions: meal.potentialExclusions.map((exclusion) => ({
            ...exclusion,
          })),
        })),
      }));

      const customerIndex = newSelections.findIndex(
        (selection) =>
          selection.customer.id === executingAction.payload.customer.id
      );

      const newSelection = { ...newSelections[customerIndex] };
      const recipe = executingAction.payload.recipe;
      if (recipe) {
        newSelection.meals[executingAction.payload.index] = {
          ...recipe,
        };
      }
      newSelections[customerIndex] = newSelection;

      return {
        ...newState,
        planner: {
          ...newState.planner,
          customerSelections: newSelections,
        },
      };
    }
  );
};

export const plannedMealsSelector = (state: AppState): DeliveryMealsSelection =>
  state.planner.selectedMeals;

export const deliveryDaySelector = (state: AppState): DeliveryDay =>
  state.planner.deliveryDay;

export const customerSelectionsSelector = (
  state: AppState
): CustomerMealsSelection | undefined => state.planner.customerSelections;

export default plannerReducer;
