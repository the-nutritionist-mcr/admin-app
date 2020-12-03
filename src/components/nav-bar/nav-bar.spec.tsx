import { Auth } from "aws-amplify";
import { MenuButton } from "..";
import { NavBar } from ".";
import React from "react";
import { Text } from "grommet";
import { act } from "react-dom/test-utils";
import { shallow } from "enzyme";

describe("The <NavBar>", () => {
  afterEach(() => {
    delete process.env.REACT_APP_VERSION_NUMBER;
    delete process.env.REACT_APP_ENVIRONMENT;
  });

  it("renders the version number when provided it with the correct environment variable", () => {
    process.env.REACT_APP_VERSION_NUMBER = "foo";
    const wrapper = shallow(<NavBar />);

    expect(wrapper.find(Text).props().children).toEqual(
      expect.arrayContaining(["Version ", "foo"])
    );
  });

  it("Calls amplify signout then navigates to the root page when clicking on the signout button", () => {
    const wrapper = shallow(<NavBar />);

    const signOut = jest.spyOn(Auth, "signOut");

    const logout = wrapper.findWhere((logoutWrapper) =>
      logoutWrapper.props().children?.includes("Logout")
    );

    act(() => {
      logout.simulate("click");
    });

    expect(signOut).toHaveBeenCalled();
  });

  it("Contains a homepage button with anonymous access", () => {
    const wrapper = shallow(<NavBar />);

    const homeButton = wrapper
      .find(MenuButton)
      .findWhere((button) => button.props().children?.includes("Home"));

    expect(homeButton.props().groups).toEqual(
      expect.arrayContaining(["anonymous"])
    );
  });

  it("Contains a logout button without anonymous access", () => {
    const wrapper = shallow(<NavBar />);

    const homeButton = wrapper
      .find(MenuButton)
      .findWhere((button) => button.props().children?.includes("Logout"));

    expect(homeButton.props().groups).toEqual(
      expect.arrayContaining(["anonymous"])
    );
  });

  it("Does not given anonymous access to MenuButtons other than home and logout", () => {
    const wrapper = shallow(<NavBar />);

    const otherButtons = wrapper
      .find(MenuButton)
      .findWhere((button) => !button.props().children?.includes("Home"))
      .findWhere((button) => !button.props().children?.includes("Logout"))
      .find(MenuButton);

    expect(otherButtons).toHaveLength(4);

    const hasAnonymous = otherButtons.findWhere((button) =>
      button.props().groups?.includes("anonymous")
    );

    expect(hasAnonymous).toHaveLength(0);
  });
});
