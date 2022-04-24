import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import { EnDeveloppementMini } from "../../../../Components/EnDeveloppement";
import Role from "../parametre/role";
import Certification from "./certification";

const Etudiants = () => {
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          <Tab value={1} label="Certification" />
          <Tab value={2} label="Déjà certifiés" />
        </Tabs>
        <SwipeableViews index={value} onChangeIndex={handleChange}>
          <div />
          <Certification />
          <div className="flex pt-10 justify-center items-center">
            <EnDeveloppementMini />
          </div>
        </SwipeableViews>
      </Box>
    </div>
  );
};

export default Etudiants;
