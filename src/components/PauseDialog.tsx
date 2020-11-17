import { Box, Button, Calendar, Paragraph, Text } from "grommet";
import Customer from "../domain/Customer";
import OkCancelDialog from "./OkCancelDialog";
import React from "react";

interface PauseDialogProps {
  show: boolean;
  customer: Customer;
  onOk: (newCustomer: Customer) => void;
  onCancel: () => void;
}

const PauseDialog: React.FC<PauseDialogProps> = (props) => {
  const [pauseStart, setPauseStart] = React.useState<string | undefined>(
    props.customer.pauseStart?.toISOString()
  );
  const [pauseEnd, setPauseEnd] = React.useState<string | undefined>(
    props.customer.pauseEnd?.toISOString()
  );

  const friendlyStart = pauseStart
    ? `from ${new Date(pauseStart).toLocaleDateString("en-GB")}`
    : "No pause start";

  const friendlyEnd = pauseEnd
    ? `until ${new Date(pauseEnd).toLocaleDateString("en-GB")}`
    : "No pause end";

  return (
    <OkCancelDialog
      show={props.show}
      header="Add Pause"
      onOk={(): void => {
        const newCustomer = {
          ...props.customer,
          pauseStart: pauseStart ? new Date(pauseStart) : undefined,
          pauseEnd: pauseEnd ? new Date(pauseEnd) : undefined,
        };
        props.onOk(newCustomer);
      }}
      extraFooterItems={
        <Button
          label="clear"
          onClick={(): void => {
            // eslint-disable-next-line unicorn/no-useless-undefined
            setPauseStart(undefined);
            // eslint-disable-next-line unicorn/no-useless-undefined
            setPauseEnd(undefined);
          }}
        />
      }
      onCancel={props.onCancel}
    >
      <Paragraph margin="none" textAlign="center">
        Use the calendars below to choose a pause start and end date. To pause a
        customer indefinitely, select a start date only.
      </Paragraph>
      <Box direction="row" gap="medium" margin="medium" alignSelf="center">
        <Box direction="column" gap="small">
          <Calendar
            size="small"
            date={pauseStart}
            onSelect={(
              date:
                | (string | string[])
                | React.SyntheticEvent<HTMLDivElement, Event>
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ): any => {
              setPauseStart(date as string);
            }}
          />
          <Text alignSelf="center">
            <strong>{friendlyStart}</strong>
          </Text>
        </Box>
        <Box direction="column" gap="small">
          <Calendar
            size="small"
            date={pauseEnd}
            onSelect={(
              date:
                | (string | string[])
                | React.SyntheticEvent<HTMLDivElement, Event>
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ): any => {
              setPauseEnd(date as string);
            }}
          />
          <Text alignSelf="center">
            <strong>{friendlyEnd}</strong>
          </Text>
        </Box>
      </Box>
    </OkCancelDialog>
  );
};

export default PauseDialog;
