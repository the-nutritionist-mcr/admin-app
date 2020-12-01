import { Box, Header, Heading, Text } from "grommet";
import { Auth } from "aws-amplify";
import LoadableRoute from "../types/LoadableRoute";
import { Logout } from "grommet-icons";
import MenuButton from "./MenuButton";
import React from "react";
import { getRoutePath } from "../pages";
import styled from "styled-components";

const NonPrintableHeader = styled(Header)`
  @media print {
    display: none;
  }
`;

interface NavBarProps {
  routes: LoadableRoute[];
}

const NavBar: React.FC<NavBarProps> = (props) => {
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
        {props.routes
          .slice()
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          .sort((a, b) => (a.sortKey > b.sortKey ? 1 : -1))
          .map((route) => (
            <MenuButton
              icon={<route.icon />}
              key={route.name}
              to={getRoutePath(route)}
            >
              {route.name}
            </MenuButton>
          ))}
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
