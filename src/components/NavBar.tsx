import { Alert, Cafeteria, Home, Plan, User } from "grommet-icons";
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
  </Header>
);
export default NavBar;
