import { OkCancelDialog } from ".";
import React from "react";

import { shallow } from "enzyme";

describe("The OkCancelDialog", () => {
  it("Is visible if show is true", () => {
    const wrapper = shallow(
      <OkCancelDialog
        show={true}
        header="Foo"
        onOk={jest.fn()}
        onCancel={jest.fn()}
      />
    );

    expect(wrapper.type()).not.toEqual(null);
  });

  it("Is a null component if show is false", () => {
    const wrapper = shallow(
      <OkCancelDialog
        show={false}
        header="Foo"
        onOk={jest.fn()}
        onCancel={jest.fn()}
      />
    );

    expect(wrapper.type()).toEqual(null);
  });
});
