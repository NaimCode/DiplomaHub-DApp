import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Sidebar from "./sidebar";
import Appbar from "./appbar";
import { Outlet } from "react-router";

export default function WorkspaceMember() {
  return (
    <Box className="flex">
      <Appbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
