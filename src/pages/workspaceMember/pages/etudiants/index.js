import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import SwipeableViews from "react-swipeable-views";
import { EnDeveloppementMini } from "../../../../Components/EnDeveloppement";
import Role from "../parametre/role";
import EnAttente from "./enAttente";
import Certification from "./importation";

const Etudiants = () => {
  const loc = useLocation();
  console.log();
  const [value, setValue] = React.useState(loc.pathname.split("/")[3] ?? "1");
  const nav = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    nav(`${newValue}`);
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
          variant="fullWidth"
        >
          <Tab value={"1"} label="Importation" />
          <Tab value={"2"} label="En Attente" />
          <Tab value={"3"} label="Certifiés" />
        </Tabs>
        {/* <SwipeableViews index={value} onChangeIndex={handleChange}>
          <div />
        </SwipeableViews> */}
        <Outlet />
      </Box>
    </div>
  );
};

export default Etudiants;
