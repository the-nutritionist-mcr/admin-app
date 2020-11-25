import { Button, TableCell, TableRow } from "grommet";

import Exclusion from "../domain/Exclusion";
import OkCancelDialog from "./OkCancelDialog";
import React from "react";
import TableCellCheckbox from "./TableCellCheckbox";
import TableCellInputField from "./TableCellInputField";
import { Trash } from "grommet-icons";

interface ExclusionRowProps {
  exclusion: Exclusion;
}

const ExclusionRow: React.FC<ExclusionRowProps> = (props) => {
  const [showDoDelete, setShowDoDelete] = React.useState(false);
  return (
    <TableRow>
      <TableCell scope="row">
        <TableCellInputField
          name="name"
          thing={props.exclusion}
          mutator={(newExclusion, event): void => {
            newExclusion.name = event.target.value;
          }}
          value={props.exclusion.name}
          onChange={(): void => {
            // NOOP
          }}
        />
      </TableCell>
      <TableCell scope="row">
        <TableCellCheckbox
          name="allergen"
          thing={props.exclusion}
          mutator={(newExclusion, event): void => {
            newExclusion.allergen = event.target.checked;
          }}
          checked={props.exclusion.allergen}
          onChange={(): void => {
            // NOOP
          }}
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
          onOk={(): void => {
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
