import { Alert, Cafeteria, Home, Logout, Plan, User } from "grommet-icons";
import { Box, Header, Heading, Text } from "grommet";
import { Auth } from "aws-amplify";
import MenuButton from "./MenuButton";
import React from "react";
import styled from "styled-components";
import { withAuthenticator } from "@aws-amplify/ui-react";

const NonPrintableHeader = styled(Header)`
  @media print {
    display: none;
  }
`;

const UnauthenticatedNavBar: React.FC = () => {
  return (
    <NonPrintableHeader
      align="center"
      justify="start"
      background="brand"
      pad={{ horizontal: "small", vertical: "small" }}
    >
      <Heading level={1} size="small">
        TNM Admin
      </Heading>
      <Box
        flex="grow"
        gap="large"
        justify="stretch"
        direction="row"
        alignContent="stretch"
      >
        <MenuButton icon={<Home />} to="/">
          Home
        </MenuButton>
        <MenuButton icon={<User />} to="/customers">
          Customers
        </MenuButton>
        <MenuButton icon={<Cafeteria />} to="/recipes">
          Recipes
        </MenuButton>
        <MenuButton icon={<Alert />} to="/exclusions">
          Exclusions
        </MenuButton>
        <MenuButton icon={<Plan />} to="/planner">
          Planner
        </MenuButton>
        <MenuButton
          onClick={async (): Promise<void> => {
            await Auth.signOut();
            location.reload();
          }}
          icon={<Logout />}
        >
          Logout
        </MenuButton>
      </Box>
      <Text size="small">Version {process.env.REACT_APP_VERSION_NUMBER}</Text>
    </NonPrintableHeader>
  );
};

const NavBar = withAuthenticator(UnauthenticatedNavBar);

export default NavBar;
