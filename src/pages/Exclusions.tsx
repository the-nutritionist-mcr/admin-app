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
import { DataStore } from "@aws-amplify/datastore";
import { Exclusion } from "../models";
import ExclusionRow from "../components/ExclusionRow";
import React from "react";

const Exclusions: React.FC = () => {
  const [exclusions, setExclusions] = React.useState<Exclusion[]>([]);

  const loadExclusions = async (): Promise<void> => {
    const newExclusions = await DataStore.query(Exclusion);
    setExclusions([...newExclusions]);
  };

  React.useEffect(() => {
    const subscription = DataStore.observe(Exclusion).subscribe(loadExclusions);
    return (): void => subscription.unsubscribe();
  }, [exclusions]);

  return (
    <React.Fragment>
      <Header align="center" justify="start" gap="small">
        <Heading level={2}>Exclusions</Heading>
        <Button
          primary
          size="small"
          onClick={async (): Promise<void> => {
            const exclusion = new Exclusion({
              name: "",
              allergen: false,
              customers: [],
              recipes: [],
            });
            await DataStore.save(exclusion);
          }}
          label="New"
          a11yTitle="New Exclusion"
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
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              .sort((a: Exclusion, b: Exclusion) => (a.id > b.id ? -1 : 1))
              .map((exclusion) => (
                <ExclusionRow
                  key={exclusion.id}
                  exclusion={exclusion}
                  onChange={(): void => {
                    // NOOP
                  }}
                />
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
