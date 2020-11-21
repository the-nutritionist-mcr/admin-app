import { TextInput, ThemeContext } from "grommet";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

interface SimpleTableCellInputFieldProps {
  bold?: boolean;
  value?: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const BoldWeight = 600;
const NormalWeight = 300;
const DebounceTime = 500;

const SimpleTableCellInputField: React.FC<SimpleTableCellInputFieldProps> = (
  props
) => {
  const [value, setValue] = React.useState(props.value);

  const theme = {
    global: {
      input: {
        font: {
          weight: props.bold ? BoldWeight : NormalWeight,
        },
      },
    },
  };
  const onChangeDebounced = useDebouncedCallback(
    props.onChange ??
      ((): void => {
        // NOOP
      }),
    DebounceTime
  );

  return (
    <ThemeContext.Extend value={theme}>
      <TextInput
        plain="full"
        onChange={(event): void => {
          onChangeDebounced?.callback(event);
          setValue(event.target.value);
        }}
        onBlur={props.onChange}
        value={value}
      />
    </ThemeContext.Extend>
  );
};

export default SimpleTableCellInputField;
