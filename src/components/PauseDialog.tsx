import { Box, Button, Calendar, Paragraph, Text } from "grommet";
import { Customer } from "../redux/reducers/customers";
import OkCancelDialog from "./OkCancelDialog";
import React from "react";
import calendarFormat from "../lib/calendarFormat";
import moment from "moment";

interface PauseDialogProps {
  show: boolean;
  customer: Customer;
  onOk: (newCustomer: Customer) => void;
  onCancel: () => void;
}

const PauseDialog: React.FC<PauseDialogProps> = (props) => {
  const [pauseStart, setPauseStart] = React.useState<string | null>(
    props.customer.pauseStart
  );
  const [pauseEnd, setPauseEnd] = React.useState<string | null>(
    props.customer.pauseEnd
  );

  const friendlyStart = pauseStart
    ? `from ${moment(new Date(pauseStart)).calendar(null, calendarFormat)}`
    : "No pause start";

  const friendlyEnd = pauseEnd
    ? `until ${moment(new Date(pauseEnd)).calendar(null, calendarFormat)}`
    : "No pause end";

  return (
    <OkCancelDialog
      show={props.show}
      header="Add Pause"
      onOk={(): void => {
        props.onOk(props.customer);
      }}
      extraFooterItems={
        <Button
          label="clear"
          onClick={(): void => {
            // eslint-disable-next-line unicorn/no-useless-undefined
            setPauseStart(null);
            // eslint-disable-next-line unicorn/no-useless-undefined
            setPauseEnd(null);
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
        <Box direction="column" gap="small" a11yTitle="Start Pause">
          <Calendar
            size="small"
            date={pauseStart ?? undefined}
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
        <Box direction="column" gap="small" a11yTitle="End Pause">
          <Calendar
            size="small"
            date={pauseEnd ?? undefined}
            a11yTitle="End Pause"
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
