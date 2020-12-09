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
import { ApiRequestFunction } from "../../lib/apiRequestCreator";
import React from "react";
import assertFC from "../../lib/assertFC";
import { useDispatch } from "react-redux";

interface OkCancelDialogProps<T = undefined> {
  thing?: T;
  thunk?: ApiRequestFunction<T>;
  show?: boolean;
  header: string;
  onOk: () => void;
  onCancel: () => void;
}

function OkCancelDialogContainer<T>(
  props: React.PropsWithChildren<OkCancelDialogProps<T>>
): React.ReactElement | null {
  const thingValue = props.thing ? { ...props.thing } : props.thing;
  const [thing, setThing] = React.useState<T | undefined>(thingValue);
  const dispatch = useDispatch();
  const contents = (
    <React.Fragment>
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
          type={props.thing ? "submit" : undefined}
          icon={<Checkmark color="brand" size="small" />}
          label="Ok"
        />
        <Button
          icon={<Close color="brand" size="small" />}
          onClick={(): void => {
            setThing(thingValue);
            props.onCancel();
          }}
          label="Cancel"
        />
      </CardFooter>
    </React.Fragment>
  );
  const dialogWithOrWithoutForm = props.thing ? (
    <Form
      value={thing}
      onSubmit={async (): Promise<void> => {
        if (thing) {
          await dispatch(props.thunk?.(thing));
        }
        props.onOk();
      }}
      onChange={(nextData: unknown): void => {
        setThing(nextData as T);
      }}
      onReset={(): void => {
        setThing(props.thing ? { ...props.thing } : props.thing);
      }}
    >
      {contents}
    </Form>
  ) : (
    contents
  );

  return (
    <Layer>
      <Card>{dialogWithOrWithoutForm}</Card>
    </Layer>
  );
}

function OkCancelDialog<T>(
  props: React.PropsWithChildren<OkCancelDialogProps<T>>
): React.ReactElement | null {
  return props?.show ? <OkCancelDialogContainer {...props} /> : null;
}

assertFC(OkCancelDialog);
assertFC(OkCancelDialogContainer);

export default OkCancelDialog;
