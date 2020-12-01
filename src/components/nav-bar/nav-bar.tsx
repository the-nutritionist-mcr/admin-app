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
  const buttons = [
    <MenuButton
      key="/"
      to="/"
      groups={["anonymous", "user", "admin"]}
      icon={<Home />}
    >
      Home
    </MenuButton>,
    <MenuButton
      key="/customers"
      to="/customers"
      groups={["user", "admin"]}
      icon={<User />}
    >
      Customers
    </MenuButton>,
    <MenuButton
      key="/recipes"
      to="/recipes"
      groups={["user", "admin"]}
      icon={<Cafeteria />}
    >
      Recipes
    </MenuButton>,
    <MenuButton
      key="/planner"
      to="/planner"
      groups={["user", "admin"]}
      icon={<Plan />}
    >
      Planner
    </MenuButton>,
    <MenuButton
      key="/exclusions"
      to="/exclusions"
      groups={["user", "admin"]}
      icon={<Alert />}
    >
      Exclusions
    </MenuButton>,
    <MenuButton
      key="logout"
      groups={["anonymous", "user", "admin"]}
      onClick={async (): Promise<void> => {
        await Auth.signOut();
        location.replace("/");
      }}
      icon={<Logout />}
    >
      Logout
    </MenuButton>,
  ].filter(Boolean);
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
        {buttons}
      </Box>
      <Text size="small">Version {process.env.REACT_APP_VERSION_NUMBER}</Text>
    </NonPrintableHeader>
  );
};

export default NavBar;
