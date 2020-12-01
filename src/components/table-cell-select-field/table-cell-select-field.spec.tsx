import { act, fireEvent, render } from "@testing-library/react";
import { Grommet } from "grommet";
import React from "react";
import { TableCellSelectField } from ".";

window.scrollTo = jest.fn();

describe("The <TableCellSelectField /> component", () => {
  describe("In multiple mode", () => {
    describe("when options is an array of objects", () => {
      it("should concatanate values with a comma when no renderLabel prop is present", () => {
        const options = [
          { id: 1, name: "foo-name", otherThing: "bash" },
          { id: 2, name: "bar-name", otherThing: "bop" },
          { id: 3, name: "baz-name", otherThing: "bip" },
        ];

        const thing = {
          field1: "baz",
          field2: [
            { id: 2, name: "bar-name", otherThing: "bop" },
            { id: 3, name: "baz-name", otherThing: "bip" },
          ],
        };

        const { getByDisplayValue } = render(
          <Grommet plain>
            <TableCellSelectField
              multiple
              thing={thing}
              value={thing.field2}
              options={options}
              labelKey="name"
              mutator={(): void => {
                // NOOP
              }}
              onChange={(): void => {
                // NOOP
              }}
            />
          </Grommet>
        );

        expect(getByDisplayValue("bar-name, baz-name")).not.toBeNull();
      });

      it("should correctly render the value label using the renderLabel prop when it is present", () => {
        const options = [
          { id: 1, name: "foo-name", otherThing: "bash" },
          { id: 2, name: "bar-name", otherThing: "bop" },
          { id: 3, name: "baz-name", otherThing: "bip" },
        ];

        const thing = {
          field1: "baz",
          field2: [
            { id: 2, name: "bar-name", otherThing: "bop" },
            { id: 3, name: "baz-name", otherThing: "bip" },
          ],
        };

        const { getByDisplayValue } = render(
          <Grommet plain>
            <TableCellSelectField
              multiple
              thing={thing}
              value={thing.field2}
              options={options}
              renderLabel={(value): string =>
                `${value.name}${value.otherThing}`
              }
              mutator={(): void => {
                // NOOP
              }}
              onChange={(): void => {
                // NOOP
              }}
            />
          </Grommet>
        );

        expect(getByDisplayValue("bar-namebop, baz-namebip")).not.toBeNull();
      });

      it("should render the drop correctly using the renderLabel prop when it is present", () => {
        const options = [
          { id: 1, name: "foo-name", otherThing: "bash" },
          { id: 2, name: "bar-name", otherThing: "bop" },
          { id: 3, name: "baz-name", otherThing: "bip" },
        ];

        const thing = {
          field1: "baz",
          field2: [
            { id: 2, name: "bar-name", otherThing: "bop" },
            { id: 3, name: "baz-name", otherThing: "bip" },
          ],
        };

        const { getByText, getByDisplayValue } = render(
          <Grommet plain>
            <TableCellSelectField
              multiple
              thing={thing}
              value={thing.field2}
              options={options}
              renderLabel={(value): string =>
                `${value.name}${value.otherThing}`
              }
              mutator={(): void => {
                // NOOP
              }}
              onChange={(): void => {
                // NOOP
              }}
            />
          </Grommet>
        );

        act(() => {
          const control = getByDisplayValue("bar-namebop, baz-namebip");
          fireEvent.click(control);
        });

        expect(getByText("foo-namebash")).not.toBeNull();
        expect(getByText("bar-namebop")).not.toBeNull();
        expect(getByText("baz-namebip")).not.toBeNull();
      });
    });
  });

  describe("In single mode", () => {
    describe("when options is an array of objects", () => {
      it("should correctly render the value label using the renderLabel prop when it is present", () => {
        const options = [
          { id: 1, name: "foo-name", otherThing: "bash" },
          { id: 2, name: "bar-name", otherThing: "bop" },
        ];

        const thing = {
          field1: "baz",
          field2: { id: 2, name: "bar-name", otherThing: "bop" },
        };

        const { getByDisplayValue } = render(
          <Grommet plain>
            <TableCellSelectField
              thing={thing}
              value={thing.field2}
              options={options}
              renderLabel={(value): string =>
                `${value.name}${value.otherThing}`
              }
              mutator={(): void => {
                // NOOP
              }}
              onChange={(): void => {
                // NOOP
              }}
            />
          </Grommet>
        );

        expect(getByDisplayValue("bar-namebop")).not.toBeNull();
      });

      it("should correctly render the option labels using the renderLabel prop when it is present", () => {
        const options = [
          { id: 1, name: "foo-name", otherThing: "bash" },
          { id: 2, name: "bar-name", otherThing: "bop" },
        ];

        const thing = {
          field1: "baz",
          field2: { id: 2, name: "bar-name", otherThing: "bop" },
        };

        const { getByText, getByDisplayValue, getAllByText } = render(
          <Grommet plain>
            <TableCellSelectField
              thing={thing}
              value={thing.field2}
              options={options}
              renderLabel={(value): string =>
                `${value.name}${value.otherThing}`
              }
              mutator={(): void => {
                // NOOP
              }}
              onChange={(): void => {
                // NOOP
              }}
            />
          </Grommet>
        );

        act(() => {
          const control = getByDisplayValue("bar-namebop");
          fireEvent.click(control);
        });

        expect(getByText("foo-namebash")).not.toBeNull();
        expect(getAllByText("bar-namebop")).not.toBeNull();
      });

      it("should correctly render the value label using the label key to identify the value and controlled by the value prop", () => {
        const options = [
          { id: 1, name: "foo-name" },
          { id: 2, name: "bar-name" },
        ];

        const thing = {
          field1: "baz",
          field2: { id: 2, name: "bar-name" },
        };

        const { getByDisplayValue } = render(
          <Grommet plain>
            <TableCellSelectField
              thing={thing}
              value={thing.field2}
              options={options}
              labelKey="name"
              mutator={(): void => {
                // NOOP
              }}
              onChange={(): void => {
                // NOOP
              }}
            />
          </Grommet>
        );
        expect(getByDisplayValue("bar-name")).not.toBeNull();
      });

      it("should correctly render the drop when clicked using the label key to identify the option labels", () => {
        const options = [
          { id: 1, name: "foo-name" },
          { id: 2, name: "bar-name" },
        ];

        const thing = {
          field1: "baz",
          field2: { id: 2, name: "bar-name" },
        };

        const { getByText, getByDisplayValue } = render(
          <Grommet plain>
            <TableCellSelectField
              thing={thing}
              value={thing.field2}
              options={options}
              labelKey="name"
              mutator={(): void => {
                // NOOP
              }}
              onChange={(): void => {
                // NOOP
              }}
            />
          </Grommet>
        );

        act(() => {
          const control = getByDisplayValue("bar-name");
          fireEvent.click(control);
        });

        expect(getByText("foo-name")).not.toBeNull();
        expect(getByText("bar-name")).not.toBeNull();
      });
    });

    describe("when options is an array of strings", () => {
      it("should correctly render the value label controlled by the value prop", () => {
        const thing = {
          field1: "foo-value",
          field2: "bar-value",
        };

        const { getByDisplayValue } = render(
          <Grommet plain>
            <TableCellSelectField
              thing={thing}
              value={thing.field2}
              options={["bash-value", "bar-value"]}
              mutator={(): void => {
                // NOOP
              }}
              onChange={(): void => {
                // NOOP
              }}
            />
          </Grommet>
        );
        expect(getByDisplayValue("bar-value")).not.toBeNull();
      });

      it("should correctly render the drop when clicked", () => {
        const thing = {
          field1: "foo-value",
          field2: "bar-value",
        };

        const { getByDisplayValue, getByText } = render(
          <Grommet plain>
            <TableCellSelectField
              thing={thing}
              value={thing.field2}
              options={["bash-value", "bar-value"]}
              mutator={(): void => {
                // NOOP
              }}
              onChange={(): void => {
                // NOOP
              }}
            />
          </Grommet>
        );

        act(() => {
          const control = getByDisplayValue("bar-value");
          fireEvent.click(control);
        });

        expect(getByText("bash-value")).not.toBeNull();
        expect(getByText("bar-value")).not.toBeNull();
      });

      it("should correctly change the displayed value when clicked", () => {
        const thing = {
          field1: "foo-value",
          field2: "bar-value",
        };

        let value = "bash-value";

        const { getByDisplayValue, getByText } = render(
          <Grommet plain>
            <TableCellSelectField
              thing={thing}
              options={["bash-value", "bar-value"]}
              mutator={(): void => {
                // NOOP
              }}
              onChange={(): void => {
                value = "bar-value";
              }}
              value={value}
            />
          </Grommet>
        );

        act(() => {
          const control = getByDisplayValue("bash-value");
          fireEvent.click(control);
        });

        act(() => {
          const selection = getByText("bar-value");
          fireEvent.click(selection);
        });

        expect(getByDisplayValue("bar-value")).not.toBeNull();
      });

      it("should correctly fire the mutator and then onChange handlers, supplying the appropriate args when an option is selected", () => {
        const thing = {
          field1: "foo-value",
          field2: "bar-value",
        };

        const value = "bash-value";

        const mutator = jest.fn();
        const onChange = jest.fn();

        const { getByDisplayValue, getByText } = render(
          <Grommet plain>
            <TableCellSelectField
              thing={thing}
              options={["bash-value", "bar-value"]}
              mutator={mutator}
              onChange={onChange}
              value={value}
            />
          </Grommet>
        );

        act(() => {
          const control = getByDisplayValue("bash-value");
          fireEvent.click(control);
        });

        act(() => {
          const selection = getByText("bar-value");
          fireEvent.click(selection);
        });

        const mutatorFirstArg = mutator.mock.calls[0][0];
        expect(mutatorFirstArg).not.toBe(thing);
        expect(mutatorFirstArg).toEqual(thing);
        expect(mutator).toHaveBeenCalledWith(
          expect.anything(),
          expect.objectContaining({ value: "bar-value" })
        );

        const onChangeFirstArg = onChange.mock.calls[0][0];
        expect(onChangeFirstArg).toEqual(thing);

        const onChangeSecondArg = onChange.mock.calls[0][1];
        expect(onChangeSecondArg).not.toBe(thing);
      });
    });
  });
});
