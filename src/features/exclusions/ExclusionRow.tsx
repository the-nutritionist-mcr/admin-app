import { Button, TableCell, TableRow } from "grommet";
import { Edit, Trash } from "grommet-icons";
import { removeExclusion, updateExclusion } from "./exclusionsSlice";
import EditExclusionDialog from "./EditExclusionDialog";
import Exclusion from "../../domain/Exclusion";
import OkCancelDialog from "../../components/OkCancelDialog";
import React from "react";
import TableCellCheckbox from "../../components/TableCellCheckbox";
import TableCellInputField from "../../components/TableCellInputField";
import { useDispatch } from "react-redux";

interface ExclusionRowProps {
  exclusion: Exclusion;
}

const ExclusionRow: React.FC<ExclusionRowProps> = (props) => {
  const [showDoDelete, setShowDoDelete] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const dispatch = useDispatch();
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
          onChange={(exclusion): void => {
            dispatch(updateExclusion(exclusion));
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
          onChange={(exclusion): void => {
            dispatch(updateExclusion(exclusion));
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
            dispatch(removeExclusion(props.exclusion));
          }}
          onCancel={(): void => setShowDoDelete(false)}
        >
          Are you sure you want to delete this exclusion?
        </OkCancelDialog>

        <Button
          secondary
          onClick={(): void => setShowEdit(true)}
          a11yTitle="Edit"
          icon={<Edit color="light-6" />}
        />
        {showEdit && (
          <EditExclusionDialog
            exclusion={props.exclusion}
            title="Edit Exclusion"
            thunk={updateExclusion}
            onOk={(): void => {
              setShowEdit(false);
            }}
            onCancel={(): void => {
              setShowEdit(false);
            }}
          />
        )}
      </TableCell>
    </TableRow>
  );
};

export default ExclusionRow;
