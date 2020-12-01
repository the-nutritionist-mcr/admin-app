import { Alert, Cafeteria, Home, Logout, Plan, User } from "grommet-icons";
import { Box, Header, Heading, Text } from "grommet";
import { Auth } from "aws-amplify";
import MenuButton from "./MenuButton";
import React from "react";
import styled from "styled-components";

const NonPrintableHeader = styled(Header)`
  @media print {
    display: none;
  }
`;

const NavBar: React.FC = () => {
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
        <MenuButton to="/" icon={<Home />}>
          Home
        </MenuButton>
        <MenuButton to="/customers" icon={<User />}>
          Customers
        </MenuButton>
        <MenuButton to="/recipes" icon={<Cafeteria />}>
          Recipes
        </MenuButton>
        <MenuButton to="/planner" icon={<Plan />}>
          Planner
        </MenuButton>
        <MenuButton to="/exclusions" icon={<Alert />}>
          Exclusions
        </MenuButton>
        <MenuButton
          onClick={async (): Promise<void> => {
            await Auth.signOut();
            location.replace("/");
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

export default NavBar;
