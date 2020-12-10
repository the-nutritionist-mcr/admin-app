import {
  Button,
  Header,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from "grommet";
import {
  allExclusionsSelector,
  createExclusion,
  fetchExclusions,
} from "./exclusionsSlice";
import { useDispatch, useSelector } from "react-redux";
import EditExclusionDialog from "./EditExclusionDialog";
import ExclusionRow from "./ExclusionRow";
import React from "react";

const Exclusions: React.FC = () => {
  const exclusions = useSelector(allExclusionsSelector);
  const [showCreate, setShowCreate] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchExclusions());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Header align="center" justify="start" gap="small">
        <Heading level={2}>Customisations</Heading>
        <Button
          primary
          size="small"
          label="New"
          a11yTitle="New Customer"
          onClick={(): void => {
            setShowCreate(true);
          }}
        />
        <EditExclusionDialog
          exclusion={{
            id: "0",
            name: "",
            allergen: false,
          }}
          show={showCreate}
          title="Create Exclusion"
          thunk={createExclusion}
          onOk={(): void => {
            setShowCreate(false);
          }}
          onCancel={(): void => {
            setShowCreate(false);
          }}
        />
      </Header>
      {exclusions.length > 0 ? (
        <Table alignSelf="start">
          <TableHeader>
            <TableRow>
              <TableCell scope="col">
                <strong>Name</strong>
              </TableCell>
              <TableCell scope="col">
                <strong>Allergen</strong>
              </TableCell>
              <TableCell scope="col">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exclusions
              .slice()
              .reverse()
              .map((exclusion) => (
                <ExclusionRow key={exclusion.id} exclusion={exclusion} />
              ))}
          </TableBody>
        </Table>
      ) : (
        <Text>
          You&apos;ve not added any exclusions yet... Click the &apos;new&apos;
          button above to get started!
        </Text>
      )}
    </React.Fragment>
  );
};

export default Exclusions;
