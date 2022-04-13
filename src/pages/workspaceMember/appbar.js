import React from "react";
import { AppBar, Toolbar } from "@mui/material";
const Appbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${240}px)`, ml: `${240}px` }}
    >
      <Toolbar>
        <h3>Permanent drawer</h3>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
