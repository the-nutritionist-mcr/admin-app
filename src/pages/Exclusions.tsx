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
import Exclusion from "../domain/Exclusion";
import ExclusionRow from "../components/ExclusionRow";
import React from "react";

const Exclusions: React.FC = () => {
  const [exclusions] = React.useState<Exclusion[]>([]);
  return (
    <React.Fragment>
      <Header align="center" justify="start" gap="small">
        <Heading level={2}>Exclusions</Heading>
        <Button primary size="small" label="New" a11yTitle="New Customer" />
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
