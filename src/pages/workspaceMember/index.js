import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Sidebar from "./sidebar";
import Appbar from "./appbar";
import { Outlet, useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../../Data/serveur";
import { update } from "../../redux/userSlice";

export default function WorkspaceMember() {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const nav = useLocation();
  useEffect(() => {
    axios
      .get(SERVER_URL + "/membre/" + user._id)
      .then((v) => {
        dispatch(update(v.data));
      })
      .catch((v) => console.log(v.response));
  }, []);
  return (
    <Box className="flex">
      {!nav.pathname.includes("etablissement") && <Appbar />}
      <Sidebar />

      <Box
        component="main"
        sx={{ flexGrow: 1, p: !nav.pathname.includes("etablissement") ? 3 : 0 }}
      >
        {!nav.pathname.includes("etablissement") && <Toolbar />}

        <Outlet />
      </Box>
    </Box>
  );
}
