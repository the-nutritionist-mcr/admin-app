import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Layer,
} from "grommet";

interface YesNoDialogProps {
  show?: boolean;
  header: string;
  onYes: () => void;
  onNo: () => void;
}

const YesNoDialog: React.FC<YesNoDialogProps> = (props) =>
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
          <Button onClick={props.onYes} label="Yes" />
          <Button onClick={props.onNo} label="No" />
        </CardFooter>
      </Card>
    </Layer>
  ) : null;

export default YesNoDialog;
