import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CheckBox,
  Form,
  FormField,
  Heading,
  Layer,
  TextInput,
} from "grommet";
import { Checkmark, Close } from "grommet-icons";
import { AsyncThunk } from "@reduxjs/toolkit";
import Exclusion from "../../domain/Exclusion";
import React from "react";
import { useDispatch } from "react-redux";

interface EditExclusionDialogProps {
  exclusion: Exclusion;
  // eslint-disable-next-line @typescript-eslint/ban-types
  thunk: AsyncThunk<Exclusion, Exclusion, {}>;
  onOk: () => void;
  title: string;
  onCancel: () => void;
}

const EditExclusionDialog: React.FC<EditExclusionDialogProps> = (props) => {
  const [exclusion, setExclusion] = React.useState(props.exclusion);
  const dispatch = useDispatch();
  return (
    <Layer>
      <Card>
        <Form
          value={exclusion}
          onReset={(): void => {
            setExclusion(props.exclusion);
          }}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(nextExclusionData: any): void => {
            setExclusion(nextExclusionData);
          }}
          onSubmit={async (): Promise<void> => {
            await dispatch(props.thunk(exclusion));
            props.onOk();
          }}
        >
          <CardHeader margin="none" pad="medium" alignSelf="center">
            <Heading margin="none" level={3}>
              {props.title}
            </Heading>
          </CardHeader>
          <CardBody pad="medium" alignSelf="center">
            <FormField name="name" label="Name" required>
              <TextInput name="name" />
            </FormField>
            <FormField name="allergen" label="Allergen">
              <CheckBox name="allergen" />
            </FormField>
          </CardBody>
          <CardFooter pad="medium" alignSelf="center" justify="center">
            <Button
              icon={<Checkmark color="brand" size="small" />}
              label="Ok"
              type="submit"
              name="submit"
            />
            <Button
              icon={<Close color="brand" size="small" />}
              onClick={props.onCancel}
              label="Cancel"
            />
            <Button type="reset" name="reset" label="Reset" />
          </CardFooter>
        </Form>
      </Card>
    </Layer>
  );
};

export default EditExclusionDialog;
