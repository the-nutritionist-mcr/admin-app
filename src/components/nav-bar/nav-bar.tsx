import { Box, Header, Heading, Text } from "grommet";
import { Cafeteria, Configure, Home, Logout, Plan, User } from "grommet-icons";
import { Auth } from "@aws-amplify/auth";
import { MenuButton } from "..";
import React from "react";
import styled from "styled-components";

const NonPrintableHeader = styled(Header)`
  @media print {
    display: none;
  }
`;

const BoxWithGap = styled(Box)`
  gap: 40px;
`;

const NavBar: React.FC = () => {
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
        <Text size="small" alignSelf="center">
          Version {process.env.REACT_APP_VERSION_NUMBER}
          {env ? ` (${env})` : null}
        </Text>
      </Box>
    </NonPrintableHeader>
  );
};

export default NavBar;
