import { Select, TextInput, ThemeContext } from "grommet";
import MutatorFieldProps from "./MutatorFieldProps";
import React from "react";

interface TableCellSelectFieldProps<V> {
  // eslint-disable-next-line @typescript-eslint/ban-types
  options: (string | boolean | number | JSX.Element | object)[];
  value: V;
  labelKey?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderLabel?: (value: any) => string;
  name?: string;
  multiple?: boolean;
}

function assertFC<P>(
  _component: React.FC<P>
  // eslint-disable-next-line @typescript-eslint/no-empty-function
): asserts _component is React.FC<P> {}

function TableCellSelectField<
  T,
  V extends
    | string
    // eslint-disable-next-line @typescript-eslint/ban-types
    | object
    | JSX.Element
    // eslint-disable-next-line @typescript-eslint/ban-types
    | (string | number | object)[]
    | undefined
>(
  props: MutatorFieldProps<T, { value: V }> & TableCellSelectFieldProps<V>
): React.ReactElement | null {
  const [selected, setSelected] = React.useState<V>(props.value);

  const theme = {
    global: {
      input: {
        padding: {
          horizontal: 0,
          vertical: 0,
        },
        font: {
          weight: 200,
        },
      },
    },
  };

  const onChange = (item: { value: V }): void => {
    const newThing = { ...props.thing };
    props.mutator(newThing, item);
    props.onChange(props.thing, newThing);
    setSelected(item.value);
  };

  const getValueLabelString = (selectedValues: V): string | undefined => {
    if (Array.isArray(selectedValues) && props.renderLabel) {
      return selectedValues.map(props.renderLabel).join(", ");
    }

    const labelKey = props.labelKey;

    if (Array.isArray(selectedValues) && labelKey) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return selectedValues.map((item) => (item as any)[labelKey]).join(", ");
    }

    if (props.renderLabel) {
      return props.renderLabel(selectedValues);
    }
  };

  const valueLabelString = getValueLabelString(selected);

  return (
    <ThemeContext.Extend value={theme}>
      <Select
        placeholder="None"
        multiple={props.multiple}
        closeOnChange={!props.multiple}
        plain={true}
        dropProps={{}}
        name={props.name}
        options={props.options}
        onChange={onChange}
        value={selected}
        valueKey={props.labelKey}
        labelKey={props.labelKey}
        // eslint-disable-next-line react/no-children-prop
        children={props.renderLabel}
        valueLabel={
          valueLabelString && (
            <TextInput
              name={props.name}
              readOnly
              value={valueLabelString}
              plain="full"
            />
          )
        }
        alignSelf="stretch"
      />
    </ThemeContext.Extend>
  );
}

assertFC(TableCellSelectField);

export default TableCellSelectField;
