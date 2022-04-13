import * as React from "react";
import Drawer from "@mui/material/Drawer";

import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";

import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Brand } from "../../Components/Logo";
import {
  FaSchool as EtablissementIcon,
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
import { Link } from "react-router-dom";
const drawerWidth = 240;

export default function Sidebar() {
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
      <Toolbar className="h-[130px]">
        <Brand />
      </Toolbar>
      <List>
        {menu.map((m, i) => (
          <>
            <Divider />
            {i !== 0 && (
              <span className="pt-2 pl-2 font-corps_2 font-semibold uppercase text-[11px] text-darker">
                {m.head}
              </span>
            )}
            <List>
              {m.menu.map((text, index) => (
                <Link to={text.route}>
                  <ListItem
                    button
                    key={text}
                    className="hover:text-primaire-normal hover:bg-primaire-normal/10 group"
                  >
                    <ListItemIcon className=" group-hover:text-primaire-normal">
                      {text.icon("text-2xl")}
                    </ListItemIcon>
                    <ListItemText primary={text.titre} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </>
        ))}
      </List>
    </Drawer>
  );
}

const menu = [
  {
    head: "",
    menu: [
      {
        titre: "Etablissement",
        route: "/",
        icon: (style) => <EtablissementIcon className={style} />,
      },
    ],
  },
  {
    head: "Gestion",
    menu: [
      {
        titre: "Membres",
        route: "/membres",
        icon: (style) => <MembreIcon className={style} />,
      },
      {
        titre: "Etudiants",
        route: "/etudiants",
        icon: (style) => <EtudiantsIcon className={style} />,
      },
      {
        titre: "Formations",
        route: "/formations",
        icon: (style) => <FormationsIcon className={style} />,
      },
    ],
  },
  {
    head: "jumelage",
    menu: [
      {
        titre: "Contrats",
        route: "/contrats",
        icon: (style) => <ContractIcon className={style} />,
      },
      {
        titre: "Parténariats",
        route: "/partenariats",
        icon: (style) => <PartenaireIcon className={style} />,
      },
    ],
  },
  {
    head: "plus",
    menu: [
      {
        titre: "Transactions",
        route: "/transactions",
        icon: (style) => <TransactionIcon className={style} />,
      },
    ],
  },
];
