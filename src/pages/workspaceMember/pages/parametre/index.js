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
      >
        <Tab value={1} label="rôles" />
      </Tabs>
      <SwipeableViews index={value} onChangeIndex={handleChange}>
        <div />
        <Role />
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
