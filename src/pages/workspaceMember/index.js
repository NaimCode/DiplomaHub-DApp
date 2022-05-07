/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Sidebar from "./sidebar";
import Appbar from "./appbar";
import { Outlet, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../../Data/serveur";
import { update } from "../../redux/userSlice";
import { Helmet } from "react-helmet";

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
    <>
      <Helmet>
        <title>{user.etablissement_id.nom}</title>
        <meta
          name="description"
          content="Bienvenue sur la plateforme de certification numérique"
        />
      </Helmet>
      <Box className="flex">
        {!nav.pathname.includes("statistiques") && <Appbar />}
        <Sidebar />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: !nav.pathname.includes("statistiques") ? 3 : 0,
          }}
        >
          {!nav.pathname.includes("statistiques") && <Toolbar />}

          <Outlet />
        </Box>
      </Box>
    </>
  );
}
