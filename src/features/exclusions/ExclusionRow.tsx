import { Button, TableCell, TableRow } from "grommet";
import { Edit, Trash } from "grommet-icons";
import { removeExclusion, updateExclusion } from "./exclusionsSlice";
import EditExclusionDialog from "./EditExclusionDialog";
import Exclusion from "../../domain/Exclusion";
import OkCancelDialog from "../../components/OkCancelDialog";
import React from "react";
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
      <TableCell scope="row">{props.exclusion.name}</TableCell>
      <TableCell scope="row">
        {props.exclusion.allergen ? "Yes" : "No"}
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
            await dispatch(removeExclusion(props.exclusion));
            setShowDoDelete(false);
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
