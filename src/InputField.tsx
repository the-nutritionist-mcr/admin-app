import React from "react";
import MutatorFieldProps from "./MutatorFieldProps";

function assertFC<P>(
  _component: React.FC<P>
): asserts _component is React.FC<P> {}

function InputField<T>(
  props: MutatorFieldProps<T, HTMLInputElement>
): React.ReactElement | null {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newThing = Object.assign({}, props.thing);
    props.mutator(newThing, event);
    props.onChange(props.thing, newThing);
  };

  return <input type="text" value={props.value} onChange={onChange} />;
}

assertFC(InputField);

export default InputField;
