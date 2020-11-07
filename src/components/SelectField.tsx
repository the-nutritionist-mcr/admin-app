import React from "react";
import MutatorFieldProps from "./MutatorFieldProps";

type SelectFieldOptions = string[] | { text: string; value: string }[];

interface SelectFieldProps {
  options: SelectFieldOptions;
  multiple?: boolean;
}

function assertFC<P>(
  _component: React.FC<P>
): asserts _component is React.FC<P> {}

function SelectField<T>(
  props: MutatorFieldProps<T, HTMLSelectElement> & SelectFieldProps
): React.ReactElement | null {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newThing = Object.assign({}, props.thing);
    props.mutator(newThing, event);
    props.onChange(props.thing, newThing);
  };

  const isTextOnlyOptions = (
    options: SelectFieldOptions
  ): options is string[] => {
    if (options.length === 0) {
      return true;
    }

    return typeof options[0] === "string";
  };

  const mapOptions = (options: SelectFieldOptions) => {
    if (isTextOnlyOptions(options)) {
      return options.map((option) => <option>{option}</option>);
    }
    return options.map((option) => (
      <option value={option.value}>{option.text}</option>
    ));
  };

  return (
    <select value={props.value} onChange={onChange} multiple={props.multiple}>
      {mapOptions(props.options)}
    </select>
  );
}

assertFC(SelectField);

export default SelectField;
