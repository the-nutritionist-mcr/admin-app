import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
  Heading,
  Layer,
} from "grommet";

import { Checkmark, Close } from "grommet-icons";
import { AsyncThunk } from "@reduxjs/toolkit";
import React from "react";
import assertFC from "../../lib/assertFC";

interface OkCancelDialogProps<T = undefined> {
  thing?: T;
  thunk?: AsyncThunk<T, T, Record<string, unknown>>;
  show?: boolean;
  header: string;
  onOk: () => void;
  onCancel: () => void;
}

function OkCancelDialog<T>(
  props: React.PropsWithChildren<OkCancelDialogProps<T>>
): React.ReactElement | null {
  const [thing, setThing] = React.useState<T | undefined>(props.thing);
  const contents = (
    <Layer>
      <Card>
        <CardHeader margin="none" pad="medium" alignSelf="center">
          <Heading margin="none" level={2}>
            {props.header}
          </Heading>
        </CardHeader>
        <CardBody pad="medium" alignSelf="center">
          {props.children}
        </CardBody>
        <CardFooter pad="medium" alignSelf="center">
          <Button
            type="submit"
            icon={<Checkmark color="brand" size="small" />}
            label="Ok"
          />
          <Button
            icon={<Close color="brand" size="small" />}
            onClick={props.onCancel}
            label="Cancel"
          />
          {props.thing && (
            <Button label="Reset" type="reset" name="reset" id="reset-button" />
          )}
        </CardFooter>
      </Card>
    </Layer>
  );
  const formOrNot = props.thing ? (
    <Form
      value={thing}
      onSubmit={(): void => {
        props.onOk();
      }}
      onChange={(nextData: unknown): void => {
        setThing(nextData as T);
      }}
      onReset={(): void => {
        setThing(props.thing);
      }}
    >
      {contents}
    </Form>
  ) : (
    contents
  );
  return props?.show ? formOrNot : null;
}

assertFC(OkCancelDialog);

export default OkCancelDialog;
