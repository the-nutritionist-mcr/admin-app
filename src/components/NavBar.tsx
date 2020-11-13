import { Box, Header, Heading } from "grommet";
import MenuButton from "./MenuButton";
import React from "react";

const NavBar: React.FC = () => (
  <Header
    align="center"
    justify="start"
    background="brand"
    pad={{ horizontal: "small", vertical: "small" }}
  >
    <Heading level={1} size="small">
      TNM Admin
    </Heading>
    <Box gap="large" justify="stretch" direction="row" alignContent="stretch">
      <MenuButton to="/">Home</MenuButton>
      <MenuButton to="/customers">Customers</MenuButton>
      <MenuButton to="/recipes">Recipes</MenuButton>
      <MenuButton to="/planner">Planner</MenuButton>
    </Box>
  </Header>
);
export default NavBar;
