import React from "react";
import { Heading, Pane, majorScale } from "evergreen-ui";
import MenuLink from "./MenuLink";

const NavBar: React.FC = () => (
  <Pane>
    <Pane
      is="header"
      elevation={1}
      paddingLeft={majorScale(2)}
      paddingRight={majorScale(2)}
      height={72}
      display="flex"
      alignItems="center"
    >
      <Pane
        width={960}
        display="flex"
        alignItems="center"
        marginLeft="auto"
        marginRight="auto"
      >
        <Heading
          marginRight={majorScale(2)}
          size={500}
          letterSpacing="2px"
          fontWeight={700}
        >
          TNM
        </Heading>
        <MenuLink to="/">Home</MenuLink>
        <MenuLink to="/customers">Customers</MenuLink>
        <MenuLink to="/recipes">Recipes</MenuLink>
        <MenuLink to="/planner">Planner</MenuLink>
      </Pane>
    </Pane>
  </Pane>
);
export default NavBar;
