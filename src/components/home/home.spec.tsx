import Home from "./home";
import React from "react";
import { mocked } from "ts-jest/utils";
import { shallow } from "enzyme";
import { useHome } from "./hooks";

jest.mock("./hooks");

describe("The home component", () => {
  it("should render the currently active plans", () => {
    mocked(useHome, true).mockReturnValue({ activePlans: 3, inActivePlans: 2, totalPlans: 5});

    const wrapper = shallow(<Home />);

    expect(wrapper.text().includes("Currently Active plans: 3"));
  });
});
