import {
  Box,
  Button,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "grommet";
import {
  createBlankExclusion,
  getExclusions,
  updateExclusion,
} from "../actions/exclusions";
import Exclusion from "../domain/Exclusion";
import ExclusionRow from "../components/ExclusionRow";
import React from "react";
import { exclusionsStore } from "../lib/stores";

const Exclusions: React.FC = () => {
  const [exclusions, setExclusions] = React.useState<Exclusion[]>(
    exclusionsStore.getAll()
  );

  const onChangeExclusions = (): void => {
    setExclusions([...exclusionsStore.getAll()]);
  };

  React.useEffect(() => {
    exclusionsStore.addChangeListener(onChangeExclusions);
    if (exclusionsStore.getAll().length === 0) {
      getExclusions();
    }
    return (): void => exclusionsStore.removeChangeListener(onChangeExclusions);
  }, [exclusions]);

  return (
    <React.Fragment>
      <Heading level={2}>Exclusions</Heading>
      <Table alignSelf="start">
        <TableHeader>
          <TableRow>
            <TableCell scope="col">Name</TableCell>
            <TableCell scope="col">Allergen</TableCell>
            <TableCell scope="col">Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exclusions.map((exclusion) => (
            <ExclusionRow
              key={exclusion.id}
              exclusion={exclusion}
              onChange={updateExclusion}
            />
          ))}
        </TableBody>
      </Table>

      <Box direction="row" pad="medium">
        <Button
          size="large"
          primary
          onClick={createBlankExclusion}
          label="Create New"
        />
      </Box>
    </React.Fragment>
  );
};

export default Exclusions;
