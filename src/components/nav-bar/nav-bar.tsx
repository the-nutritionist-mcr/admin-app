import { Box, Header, Heading, Text } from "grommet";
import { Cafeteria, Configure, Home, Logout, Plan, User } from "grommet-icons";
import { Auth } from "@aws-amplify/auth";
import LoadingState from "../../types/LoadingState";
import { MenuButton } from "..";
import React from "react";
import { Spinning } from "grommet-controls";
import { loadingSelector } from "../../lib/rootReducer";
import styled from "styled-components";

import { useSelector } from "react-redux";

const NonPrintableHeader = styled(Header)`
  @media print {
    display: none;
  }
`;

const BoxWithGap = styled(Box)`
  gap: 40px;
`

const NavBar: React.FC = () => {
  const loading = useSelector(loadingSelector);
  const env = process.env.REACT_APP_ENVIRONMENT;
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
      key="/customisations"
      to="/customisations"
      groups={["user", "admin"]}
      icon={<Configure />}
    >
      Customisations
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

  // eslint-disable-next-line no-console
  buttons.forEach(button => console.log(button.type))
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
      <BoxWithGap
        flex="grow"
        justify="stretch"
        direction="row"
        alignContent="stretch"
      >
        {buttons}
      </BoxWithGap>
      <Box direction="row" gap="medium" alignContent="start">
        {loading === LoadingState.Loading ? <Spinning size="medium" /> : null}
        <Text size="small" alignSelf="center">
          Version {process.env.REACT_APP_VERSION_NUMBER}
          {env ? ` (${env})` : null}
        </Text>
      </Box>
    </NonPrintableHeader>
  );
};

export default NavBar;
