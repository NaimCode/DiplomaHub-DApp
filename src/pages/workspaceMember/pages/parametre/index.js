import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SwipeableViews from "react-swipeable-views";
import Role from "./role";
import { EnDeveloppementMini } from "../../../../Components/EnDeveloppement";

const ColorTabs = () => {
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        variant="fullWidth"
      >
        <Tab value={1} label="rôles" />
        <Tab value={2} label="paramètre 2" />
        <Tab value={3} label="paramètre 3" />
      </Tabs>
      <SwipeableViews index={value} onChangeIndex={handleChange}>
        <div />
        <Role />
        <div className="flex pt-10 justify-center items-center">
          <EnDeveloppementMini />
        </div>
        <div className="flex pt-10 justify-center items-center">
          <EnDeveloppementMini />
        </div>
      </SwipeableViews>
    </Box>
  );
};
const Parametre = () => {
  return (
    <div>
      <ColorTabs />
    </div>
  );
};

export default Parametre;
