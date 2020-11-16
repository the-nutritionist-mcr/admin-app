import {
  Button,
  Header,
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
      <Header align="center" justify="start" gap="small">
        <Heading level={2}>Exclusions</Heading>
        <Button
          primary
          size="small"
          onClick={createBlankExclusion}
          label="New"
          a11yTitle="New Customer"
        />
      </Header>
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
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            .sort((a: Exclusion, b: Exclusion) => (a.id > b.id ? -1 : 1))
            .map((exclusion) => (
              <ExclusionRow
                key={exclusion.id}
                exclusion={exclusion}
                onChange={updateExclusion}
              />
            ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default Exclusions;
