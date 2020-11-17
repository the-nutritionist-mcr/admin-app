import { Button, DateInput } from "grommet";
import React from "react";

const Test: React.FC = () => {
  const [, setDate] = React.useState<string | undefined>();

  return (
    <>
      <DateInput
        format="dd/mm/yyyy"
        value={undefined}
        onChange={(event): void => {
          const correctlyTypedEvent = (event as unknown) as { value: string };
          setDate(correctlyTypedEvent.value);
        }}
      />
      <Button
        onClick={(): void =>
          // eslint-disable-next-line unicorn/no-useless-undefined
          setDate(undefined)
        }
        label="clear"
      />
    </>
  );
};

export default Test;
