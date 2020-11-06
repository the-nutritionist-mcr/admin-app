import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

const NavBar: React.FC = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">Planner</Typography>
    </Toolbar>
  </AppBar>
);
export default NavBar;
