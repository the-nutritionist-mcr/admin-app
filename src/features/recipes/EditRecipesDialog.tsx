import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
  FormField,
  Heading,
  Layer,
  Select,
  TextInput,
} from "grommet";
import { Checkmark, Close } from "grommet-icons";
import { useDispatch, useSelector } from "react-redux";
import { AsyncThunk } from "@reduxjs/toolkit";
import React from "react";
import Recipe from "../../domain/Recipe";
import { allExclusionsSelector } from "../../features/exclusions/exclusionsSlice";

interface EditRecipesDialogProps {
  recipe: Recipe;
  thunk: AsyncThunk<Recipe, Recipe, Record<string, unknown>>;
  onOk: () => void;
  title: string;
  onCancel: () => void;
}

const EditRecipesDialog: React.FC<EditRecipesDialogProps> = (props) => {
  const [recipe, setRecipe] = React.useState(props.recipe);
  const dispatch = useDispatch();
  const exclusions = useSelector(allExclusionsSelector);

  return (
    <Layer>
      <Card>
        <Form
          value={recipe}
          onReset={(): void => {
            setRecipe(props.recipe);
          }}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(nextRecipeData: any): void => {
            setRecipe(nextRecipeData);
          }}
          onSubmit={async (): Promise<void> => {
            await dispatch(props.thunk(recipe));
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
            <FormField name="description" label="Description">
              <TextInput name="description" />
            </FormField>
            <FormField name="potentialExclusions" label="Exclusions">
              <Select
                multiple
                closeOnChange={false}
                name="exclusions"
                options={exclusions}
                labelKey="name"
                valueKey="name"
              />
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

export default EditRecipesDialog;
