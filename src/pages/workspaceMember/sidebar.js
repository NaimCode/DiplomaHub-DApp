import * as React from "react";
import Drawer from "@mui/material/Drawer";
import * as contactusAnimation from "../../../public/animations/contactus.json";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";

import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Person, Settings } from "@mui/icons-material";
import { Brand } from "../../Components/Logo";
import {
  FaChartBar as EtablissementIcon,
  FaHandshake as PartenaireIcon,
} from "react-icons/fa";
import {
  BsPeopleFill as MembreIcon,
  BsFileEarmarkTextFill as ContractIcon,
} from "react-icons/bs";

import { BiTransferAlt as TransactionIcon } from "react-icons/bi";
import {
  IoIosPeople as EtudiantsIcon,
  IoIosSchool as FormationsIcon,
} from "react-icons/io";
import {
  Link,
  useNavigate,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import MyLottie from "../../Components/MyLottie";
import { Button } from "@mui/material";
import DialogContact from "./dialogContact";
const drawerWidth = 240;

export default function Sidebar() {
  let navigation = useNavigate();
  let location = useLocation();
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar className="h-[200px]">
        <Brand />
      </Toolbar>
      <List>
        {menu.map((m, i) => (
          <>
            <Divider />

            <List>
              {m.menu.map((text, index) => {
                const isCurrent = location.pathname.includes(text.route);
                return (
                  <Link to={text.route}>
                    <ListItem
                      button
                      key={text}
                      className={`hover:text-primaire-normal hover:bg-primaire-normal/10 group text-darker hover:opacity-100 opacity-100 font-corps_1 ${
                        isCurrent &&
                        "text-primaire-normal bg-primaire-normal/10 opacity-100"
                      }`}
                    >
                      <ListItemIcon
                        className={` group-hover:text-primaire-normal text-darker ${
                          isCurrent && "text-primaire-normal "
                        }`}
                      >
                        {text.icon("text-2xl")}
                      </ListItemIcon>
                      <ListItemText
                        primary={text.titre}
                        className="text-sm font-titre1 !important"
                      />
                    </ListItem>
                  </Link>
                );
              })}
            </List>
          </>
        ))}
      </List>
      <div className="flex flex-col justify-end h-full items-center">
        <MyLottie data={contactusAnimation} />
        <DialogContact />
      </div>
    </Drawer>
  );
}

const menu = [
  {
    head: "",
    menu: [
      {
        titre: "Compte",
        route: "compte",
        icon: (style) => <Person className={style} />,
      },
      {
        titre: "Statistiques",
        route: "statistiques",
        icon: (style) => <EtablissementIcon className={style} />,
      },
      {
        titre: "Membres",
        route: "membres",
        icon: (style) => <MembreIcon className={style} />,
      },
      {
        titre: "Etudiants",
        route: "etudiants",
        icon: (style) => <EtudiantsIcon className={style} />,
      },
      {
        titre: "Transactions",
        route: "transactions",
        icon: (style) => <TransactionIcon className={style} />,
      },
      {
        titre: "Paramètre",
        route: "parametre",
        icon: (style) => <Settings className={style} />,
      },
    ],
  },
];
