import React from "react";
import {
  render,
  screen,
  act,
  getByText,
  getAllByRole,
  getByRole,
} from "@testing-library/react";
import PlanPanel from "./PlanPanel";
import userEvent from "@testing-library/user-event";

describe("The plan panel", () => {
  it("renders without errors when supplied the appropriate props", () => {
    render(
      <PlanPanel
        plannerConfig={{
          defaultDeliveryDays: ["Monday", "Thursday"],
          extrasLabels: ["One", "Two"],
          planLabels: ["Another", "Meal", "Type"],
        }}
      />
    );
  });

  it("defaults to 6 days per week, 2 meals per day and the first item in the variant list", () => {
    render(
      <PlanPanel
        plannerConfig={{
          defaultDeliveryDays: ["Monday", "Thursday"],
          extrasLabels: ["One", "Two"],
          planLabels: ["EQ", "Mass"],
        }}
      />
    );

    const daysPerWeek = screen.getByTestId("daysPerWeek");
    expect(daysPerWeek).toHaveDisplayValue("6");

    const mealsPerDay = screen.getByTestId("mealsPerDay");
    expect(mealsPerDay).toHaveDisplayValue("2");

    const planName = screen.getByTestId("planVariant");
    expect(planName).toHaveDisplayValue("EQ");
  });

  const getRowCells = (rowHeader: string) =>
    getAllByRole(
      screen.getByRole("row", { name: (name) => name.startsWith(rowHeader) }),
      "cell"
    );

  const clickCheckBox = (label: string) =>
    act(() => {
      const checkbox = screen.getByLabelText(label);
      userEvent.click(checkbox);
    });

  const clickDropItem = (item: string) =>
    userEvent.click(getByText(screen.getByRole("menubar"), item));

  const changeSelectBox = (testId: string, newValue: string) => {
    const box = screen.getByTestId(testId);
    act(() => {
      userEvent.click(box);
    });
    act(() => {
      clickDropItem(newValue);
    });
  };

  it("zeros the other rows when you change the plan to a different variant", () => {
    render(
      <PlanPanel
        plannerConfig={{
          defaultDeliveryDays: ["Monday", "Thursday"],
          extrasLabels: ["One", "Two"],
          planLabels: ["EQ", "Mass", "Micro"],
        }}
      />
    );

    changeSelectBox("daysPerWeek", "2");
    changeSelectBox("mealsPerDay", "4");
    changeSelectBox("totalPlans", "1");
    changeSelectBox("planVariant", "Micro");

    const cells = getRowCells("EQ");

    expect(getByRole(cells[0], "textbox")).toHaveDisplayValue(String("0"));
    expect(getByRole(cells[1], "textbox")).toHaveDisplayValue(String("0"));
  });

  it("displays the correct total at the end of a row when the amounts were filled in by a preset plan", () => {
    render(
      <PlanPanel
        plannerConfig={{
          defaultDeliveryDays: ["Monday", "Thursday"],
          extrasLabels: ["One", "Two"],
          planLabels: ["EQ", "Mass", "Micro"],
        }}
      />
    );

    changeSelectBox("daysPerWeek", "5");
    changeSelectBox("mealsPerDay", "4");
    changeSelectBox("totalPlans", "2");
    changeSelectBox("planVariant", "Micro");

    const cells = getRowCells("Micro");
    expect(cells[2]).toHaveTextContent("40");
  });

  it("adds some extras to the distribution when the relavent extras checkbox is selected", () => {
    render(
      <PlanPanel
        plannerConfig={{
          defaultDeliveryDays: ["Monday", "Thursday"],
          extrasLabels: ["Smoothie", "Breakfast", "Snack", "Large Snack"],
          planLabels: ["EQ", "Mass", "Micro"],
        }}
      />
    );

    clickCheckBox("Breakfast");
    clickCheckBox("Large Snack");

    const breakfast = getRowCells("Breakfast");
    changeSelectBox("daysPerWeek", "5");
    expect(getByRole(breakfast[0], "textbox")).toHaveDisplayValue("3");
    expect(getByRole(breakfast[1], "textbox")).toHaveDisplayValue("2");

    const largeSnack = getRowCells("Large Snack");
    changeSelectBox("daysPerWeek", "5");
    expect(getByRole(largeSnack[0], "textbox")).toHaveDisplayValue("3");
    expect(getByRole(largeSnack[1], "textbox")).toHaveDisplayValue("2");

    const smoothie = getRowCells("Smoothie");
    changeSelectBox("daysPerWeek", "5");
    expect(getByRole(smoothie[0], "textbox")).toHaveDisplayValue("0");
    expect(getByRole(smoothie[1], "textbox")).toHaveDisplayValue("0");
  });

  it("does not change snacks based on meals per day", () => {
    render(
      <PlanPanel
        plannerConfig={{
          defaultDeliveryDays: ["Monday", "Thursday"],
          extrasLabels: ["Smoothie", "Breakfast", "Snack", "Large Snack"],
          planLabels: ["EQ", "Mass", "Micro"],
        }}
      />
    );

    clickCheckBox("Breakfast");

    const cells = getRowCells("Breakfast");

    changeSelectBox("daysPerWeek", "5");
    changeSelectBox("mealsPerDay", "3");

    expect(getByRole(cells[0], "textbox")).toHaveDisplayValue("3");
    expect(getByRole(cells[1], "textbox")).toHaveDisplayValue("2");
  });

  it.each`
    daysPerWeek | mealsPerDay | totalPlans | variant   | delivery1 | delivery2
    ${1}        | ${1}        | ${1}       | ${"EQ"}   | ${1}      | ${0}
    ${6}        | ${2}        | ${1}       | ${"EQ"}   | ${6}      | ${6}
    ${6}        | ${2}        | ${3}       | ${"EQ"}   | ${18}     | ${18}
    ${1}        | ${1}        | ${1}       | ${"Mass"} | ${1}      | ${0}
    ${6}        | ${2}        | ${1}       | ${"Mass"} | ${6}      | ${6}
    ${5}        | ${2}        | ${1}       | ${"Mass"} | ${6}      | ${4}
    ${7}        | ${1}        | ${1}       | ${"Mass"} | ${3}      | ${4}
    ${7}        | ${2}        | ${1}       | ${"Mass"} | ${6}      | ${8}
    ${7}        | ${2}        | ${2}       | ${"Mass"} | ${12}     | ${16}
  `(
    `displays $delivery1 and $delivery2 in the $variant row when you change the plan selection to $totalPlans $variant, $mealsPerDay meals per day, $daysPerWeek days per week`,
    ({
      daysPerWeek,
      mealsPerDay,
      totalPlans,
      variant,
      delivery1,
      delivery2,
    }) => {
      render(
        <PlanPanel
          plannerConfig={{
            defaultDeliveryDays: ["Monday", "Thursday"],
            extrasLabels: ["One", "Two"],
            planLabels: ["EQ", "Mass"],
          }}
        />
      );

      changeSelectBox("daysPerWeek", daysPerWeek);
      changeSelectBox("mealsPerDay", mealsPerDay);
      changeSelectBox("totalPlans", totalPlans);
      changeSelectBox("planVariant", variant);

      const cells = getRowCells(variant);

      expect(getByRole(cells[0], "textbox")).toHaveDisplayValue(
        String(delivery1)
      );
      expect(getByRole(cells[1], "textbox")).toHaveDisplayValue(
        String(delivery2)
      );
    }
  );
});
