import React from "react";
import { Select } from "evergreen-ui";
import MutatorFieldProps from "./MutatorFieldProps";

type SelectFieldOptions = string[] | { label: string; value: string }[];

interface SelectFieldProps {
  options: SelectFieldOptions;
  value: string;
}

function assertFC<P>(
  _component: React.FC<P>
): asserts _component is React.FC<P> {}

function SelectField<T>(
  props: MutatorFieldProps<T, React.ChangeEvent<HTMLSelectElement>> &
    SelectFieldProps
): React.ReactElement | null {
  const [selected, setSelected] = React.useState<string>(props.value);

  const onChange = (item: React.ChangeEvent<HTMLSelectElement>) => {
    const newThing = Object.assign({}, props.thing);
    props.mutator(newThing, item);
    props.onChange(props.thing, newThing);
    setSelected(item.target.value);
  };

  const isTextOnlyOptions = (
    options: SelectFieldOptions
  ): options is string[] => {
    if (options.length === 0) {
      return true;
    }

    return typeof options[0] === "string";
  };

  const mapOptions = (options: SelectFieldOptions) =>
    isTextOnlyOptions(options)
      ? options.map((label) => ({ label, value: label }))
      : options;

  const mappedOptions = mapOptions(props.options);

  return (
    <Select value={selected} onChange={onChange}>
      {mappedOptions.map((item) => (
        <option value={item.value}>{item.label}</option>
      ))}
    </Select>
  );
}

assertFC(SelectField);

export default SelectField;
