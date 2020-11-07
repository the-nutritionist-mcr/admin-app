import React from "react";
import { Button, SelectMenu, SelectMenuItem } from "evergreen-ui";
import MutatorFieldProps from "./MutatorFieldProps";

type MultiSelectFieldOptions = string[] | { label: string; value: string }[];

interface MultiSelectFieldProps<T>
  extends MutatorFieldProps<T, SelectMenuItem> {
  options: MultiSelectFieldOptions;
  remover: (newThing: T, itemToRemove: SelectMenuItem) => void;
  value: string[];
}

function assertFC<P>(
  _component: React.FC<P>
): asserts _component is React.FC<P> {}

function SelectField<T>(
  props: MultiSelectFieldProps<T>
): React.ReactElement | null {
  const [selected, setSelected] = React.useState<string[]>(props.value);

  const onSelect = (item: SelectMenuItem) => {
    const newThing = Object.assign({}, props.thing);
    props.mutator(newThing, item);
    props.onChange(props.thing, newThing);
    setSelected([...selected, item.label]);
  };

  const onDeSelect = (itemToRemove: SelectMenuItem) => {
    const newThing = Object.assign({}, props.thing);
    props.remover(newThing, itemToRemove);
    props.onChange(props.thing, newThing);
    setSelected(selected.filter((item) => item !== itemToRemove.label));
  };

  const isTextOnlyOptions = (
    options: MultiSelectFieldOptions
  ): options is string[] => {
    if (options.length === 0) {
      return true;
    }

    return typeof options[0] === "string";
  };

  const mapOptions = (options: MultiSelectFieldOptions) =>
    isTextOnlyOptions(options)
      ? options.map((label) => ({ label, value: label }))
      : options;

  return (
    <SelectMenu
      options={mapOptions(props.options)}
      onSelect={onSelect}
      onDeselect={onDeSelect}
      selected={selected}
      isMultiSelect={true}
    >
      {<Button>{selected.length > 0 ? selected.join(", ") : "None"}</Button>}
    </SelectMenu>
  );
}

assertFC(SelectField);

export default SelectField;
