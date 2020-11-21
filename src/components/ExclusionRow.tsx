import { Button, CheckBox, TableCell, TableRow } from "grommet";
import { DataStore } from "@aws-amplify/datastore";
import { Exclusion } from "../models";
import OkCancelDialog from "./OkCancelDialog";
import React from "react";
import SimpleTableCellInputField from "./SimpleTableCellInputField";
import { Trash } from "grommet-icons";

interface ExclusionRowProps {
  exclusion: Exclusion;
  onChange: (newExclusion: Exclusion) => void;
}

const ExclusionRow: React.FC<ExclusionRowProps> = (props) => {
  const [showDoDelete, setShowDoDelete] = React.useState(false);
  return (
    <TableRow>
      <TableCell scope="row">
        <SimpleTableCellInputField
          name="name"
          value={props.exclusion.name}
          onChange={(event): void => {
            const newExclusion = Exclusion.copyOf(props.exclusion, (draft) => {
              draft.name = event.target.value;
            });
            props.onChange(newExclusion);
          }}
        />
      </TableCell>
      <TableCell scope="row">
        <CheckBox
          name="allergen"
          onChange={(event): void => {
            const newExclusion = Exclusion.copyOf(props.exclusion, (draft) => {
              draft.allergen = event.target.checked;
            });
            props.onChange(newExclusion);
          }}
          checked={props.exclusion.allergen}
        />
      </TableCell>
      <TableCell scope="row">
        <Button
          secondary
          onClick={(): void => setShowDoDelete(true)}
          a11yTitle="Delete"
          icon={<Trash color="light-6" />}
        />
        <OkCancelDialog
          show={showDoDelete}
          header="Are you sure?"
          onOk={async (): Promise<void> => {
            await DataStore.delete(props.exclusion);
            setShowDoDelete(false);
          }}
          onCancel={(): void => setShowDoDelete(false)}
        >
          Are you sure you want to delete this exclusion?
        </OkCancelDialog>
      </TableCell>
    </TableRow>
  );
};

export default ExclusionRow;
