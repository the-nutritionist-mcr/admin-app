import plannerReducer, {
  adjustCustomerSelection,
  clearPlanner,
  generateCustomerMeals,
  selectDay,
  selectMeal,
} from "./planner-reducer";
import { resetAllWhenMocks, when } from "jest-when";
import AppState from "../../types/AppState";
import Customer from "../../domain/Customer";
import CustomerMealsSelection from "../../types/CustomerMealsSelection";
import Recipe from "../../domain/Recipe";
import { chooseMeals } from "../../lib/plan-meals";
import { mock } from "jest-mock-extended";
import { mocked } from "ts-jest/utils";

jest.mock("../../lib/plan-meals");

describe("The planner slice", () => {
  beforeEach(() => {
    resetAllWhenMocks();
  });

  it("Should start out with meals to select, all set to undefined", () => {
    const initialState = mock<AppState>();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (initialState.planner as any) = undefined;

    const state = plannerReducer(initialState);

    expect(state.planner.selectedMeals).toHaveLength(6);
    expect(state.planner.selectedMeals[0]).toBeUndefined();
    expect(state.planner.selectedMeals[1]).toBeUndefined();
    expect(state.planner.selectedMeals[2]).toBeUndefined();
    expect(state.planner.selectedMeals[3]).toBeUndefined();
    expect(state.planner.selectedMeals[4]).toBeUndefined();
    expect(state.planner.selectedMeals[5]).toBeUndefined();
  });

  describe("selectDay", () => {
    it("should result in a the day changing", () => {
      const initialState = mock<AppState>();
      initialState.planner.selectedMeals = [undefined, undefined, undefined];
      const state = plannerReducer(initialState, selectDay("Monday"));
      expect(state.planner.deliveryDay).toEqual("Monday");
    });
  });

  describe("adjustCustomerSelection", () => {
    it("should result in an individual customers selection being changed", () => {
      const mockRecipe = mock<Recipe>();
      mockRecipe.potentialExclusions = [];
      mockRecipe.id = "recipe-0";
      const mockRecipe1 = mock<Recipe>();
      mockRecipe1.id = "recipe-1";
      mockRecipe1.potentialExclusions = [];
      const mockRecipe2 = mock<Recipe>();
      mockRecipe2.id = "recipe-2";
      mockRecipe2.potentialExclusions = [];
      const mockRecipe3 = mock<Recipe>();
      mockRecipe3.id = "recipe-3";
      mockRecipe3.potentialExclusions = [];
      const mockRecipe4 = mock<Recipe>();
      mockRecipe4.id = "recipe-4";
      mockRecipe4.potentialExclusions = [];
      const mockRecipe5 = mock<Recipe>();
      mockRecipe5.id = "recipe-5";
      mockRecipe5.potentialExclusions = [];

      const initialState = mock<AppState>();

      initialState.planner.deliveryDay = "Monday";

      initialState.planner.selectedMeals = [
        mockRecipe,
        mockRecipe1,
        mockRecipe2,
        mockRecipe3,
        mockRecipe4,
        mockRecipe5,
      ];

      const mockCustomer1 = mock<Customer>();
      mockCustomer1.exclusions = [];
      mockCustomer1.id = "id-1";
      const mockCustomer2 = mock<Customer>();
      mockCustomer2.exclusions = [];
      mockCustomer2.id = "id-2";

      initialState.planner.customerSelections = [
        {
          customer: mockCustomer1,
          meals: [mockRecipe1, mockRecipe2, mockRecipe3],
        },

        {
          customer: mockCustomer2,
          meals: [mockRecipe5, mockRecipe2],
        },
      ];

      const state = plannerReducer(
        initialState,
        adjustCustomerSelection({
          index: 1,
          customer: mockCustomer2,
          recipe: mockRecipe3,
        })
      );

      expect(
        state.planner.customerSelections?.find(
          (selection) => selection.customer.id === mockCustomer2.id
        )?.meals[1].id
      ).toEqual(mockRecipe3.id);
    });
  });

  describe("selectMeal", () => {
    it("Should result in a meal selection being changed", () => {
      const initialState = mock<AppState>();

      initialState.planner.selectedMeals = [undefined, undefined, undefined];

      const mockRecipe = mock<Recipe>();

      const state = plannerReducer(
        initialState,
        selectMeal({ index: 2, recipe: mockRecipe })
      );

      expect(state.planner.selectedMeals[0]).toBeUndefined();
      expect(state.planner.selectedMeals[2]).toBe(mockRecipe);
    });
  });

  describe("clearPlanner", () => {
    it("Should clear all planner state", () => {
      const mockRecipe = mock<Recipe>();
      const mockRecipe1 = mock<Recipe>();
      const mockRecipe2 = mock<Recipe>();
      const mockRecipe3 = mock<Recipe>();
      const mockRecipe4 = mock<Recipe>();
      const mockRecipe5 = mock<Recipe>();

      const initialState = mock<AppState>();

      initialState.planner.deliveryDay = "Monday";

      initialState.planner.selectedMeals = [
        mockRecipe,
        mockRecipe1,
        mockRecipe2,
        mockRecipe3,
        mockRecipe4,
        mockRecipe5,
      ];

      const mockCustomer1 = mock<Customer>();
      const mockCustomer2 = mock<Customer>();

      initialState.planner.customerSelections = [
        {
          customer: mockCustomer1,
          meals: [mockRecipe1, mockRecipe2, mockRecipe3],
        },

        {
          customer: mockCustomer2,
          meals: [mockRecipe5, mockRecipe2],
        },
      ];

      const state = plannerReducer(initialState, clearPlanner());

      expect(state.planner.selectedMeals[0]).toBeUndefined();
      expect(state.planner.selectedMeals[1]).toBeUndefined();
      expect(state.planner.selectedMeals[2]).toBeUndefined();
      expect(state.planner.selectedMeals[3]).toBeUndefined();
      expect(state.planner.selectedMeals[4]).toBeUndefined();
      expect(state.planner.selectedMeals[5]).toBeUndefined();
      expect(state.planner.deliveryDay).toEqual("");
      expect(state.planner.customerSelections).toBeUndefined();
    });
  });

  describe("generateCustomerMeals", () => {
    it("Should change 'customerSelections' to the result of 'selectedMeals' being fed through 'planMeals'", () => {
      const mockRecipe = mock<Recipe>();

      const mockRecipe1 = mock<Recipe>();
      const mockRecipe2 = mock<Recipe>();
      const mockRecipe3 = mock<Recipe>();
      const mockRecipe4 = mock<Recipe>();
      const mockRecipe5 = mock<Recipe>();

      const mockCustomer1 = mock<Customer>();
      const mockCustomer2 = mock<Customer>();

      const initialState = mock<AppState>();

      initialState.planner.deliveryDay = "Monday";

      initialState.planner.selectedMeals = [
        mockRecipe,
        mockRecipe1,
        mockRecipe2,
        mockRecipe3,
        mockRecipe4,
        mockRecipe5,
      ];

      initialState.customers.items = [mockCustomer1, mockCustomer2];

      const mockOutcome: CustomerMealsSelection = [
        {
          customer: mockCustomer1,
          meals: [mockRecipe1, mockRecipe2, mockRecipe3],
        },

        {
          customer: mockCustomer2,
          meals: [mockRecipe5, mockRecipe2],
        },
      ];

      when(mocked(chooseMeals, true))
        .calledWith(
          initialState.planner.deliveryDay,
          initialState.planner.selectedMeals,
          initialState.customers.items
        )
        .mockReturnValue(mockOutcome);

      const state = plannerReducer(initialState, generateCustomerMeals());

      expect(state.planner.customerSelections).toEqual(mockOutcome);
    });
  });
});
