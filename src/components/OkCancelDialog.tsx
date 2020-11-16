import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Layer,
} from "grommet";

import { Checkmark, Close } from "grommet-icons";

import React from "react";

interface OkCancelDialogProps {
  show?: boolean;
  header: string;
  onOk: () => void;
  onCancel: () => void;
}

const OkCancelDialog: React.FC<OkCancelDialogProps> = (props) =>
  props?.show ? (
    <Layer>
      <Card>
        <CardHeader pad="medium" alignSelf="center">
          <Heading margin="none" level={3}>
            {props.header}
          </Heading>
        </CardHeader>
        <CardBody pad="medium" alignSelf="center">
          {props.children}
        </CardBody>
        <CardFooter pad="medium" alignSelf="center">
          <Button
            icon={<Checkmark color="brand" size="small" />}
            onClick={props.onOk}
            label="Ok"
          />
          <Button
            icon={<Close color="brand" size="small" />}
            onClick={props.onCancel}
            label="Cancel"
          />
        </CardFooter>
      </Card>
    </Layer>
  ) : null;

export default OkCancelDialog;
