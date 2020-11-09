import React from "react";
import MutatorFieldProps from "./MutatorFieldProps";
import { TextInput } from "evergreen-ui";

interface InputFieldProps {
  value?: string | number | readonly string[] | undefined;
  type?: string | undefined;
}

function assertFC<P>(
  _component: React.FC<P>
): asserts _component is React.FC<P> {}

function InputField<T>(
  props: MutatorFieldProps<T, React.ChangeEvent<HTMLInputElement>> &
    InputFieldProps
): React.ReactElement | null {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newThing = Object.assign({}, props.thing);
    props.mutator(newThing, event);
    props.onChange(props.thing, newThing);
  };

  return (
    <TextInput
      width="100%"
      type={props.type}
      value={props.value}
      onChange={onChange}
    />
  );
}

assertFC(InputField);

export default InputField;
