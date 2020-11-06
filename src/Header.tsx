import React from "react";
import { Pane, Heading } from "evergreen-ui";

const Header: React.FC = () => (
  <Pane
    display="flex"
    padding={16}
    background="tint2"
    borderRadius={3}
    margin={16}
  >
    <Heading size={900}>Planner</Heading>
  </Pane>
);

export default Header;
