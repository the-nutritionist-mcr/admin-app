import { Alert, Cafeteria, Home, Plan, User } from "grommet-icons";
import { Box, Header, Heading, Text } from "grommet";
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
      </Box>
      <Text size="small">Version {process.env.REACT_APP_VERSION_NUMBER}</Text>
    </NonPrintableHeader>
  );
};
export default NavBar;
