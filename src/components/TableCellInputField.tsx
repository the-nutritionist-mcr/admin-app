import React from "react";
import MutatorFieldProps from "./MutatorFieldProps";
import { TextInput, ThemeContext } from "grommet";

interface InputFieldProps {
  value?: string | number | (string & readonly string[]) | undefined;
  type?: string | undefined;
  bold?: boolean;
}

function assertFC<P>(
  _component: React.FC<P>
): asserts _component is React.FC<P> {}

function TableCellInputField<T>(
  props: MutatorFieldProps<T, React.ChangeEvent<HTMLInputElement>> &
    InputFieldProps
): React.ReactElement | null {
  const theme = {
    global: {
      input: {
        font: {
          weight: props.bold ? 600 : 200,
        },
      },
    },
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newThing = Object.assign({}, props.thing);
    props.mutator(newThing, event);
    props.onChange(props.thing, newThing);
  };

  return (
    <ThemeContext.Extend value={theme}>
      <TextInput
        type={props.type}
        value={props.value}
        onChange={onChange}
        placeholder="None"
        plain="full"
      />
    </ThemeContext.Extend>
  );
}

assertFC(TableCellInputField);

export default TableCellInputField;
