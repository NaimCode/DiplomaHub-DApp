import React from "react";
import { AppBar, Toolbar, Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import { LogoutTwoTone, PersonOutlineTwoTone } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { deconnexion } from "../../redux/userSlice";

const Appbar = () => {
  const user = useSelector((state) => state.user.data);
  const etablissement = user.etablissement_id;

  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${240}px)`, ml: `${240}px` }}
      className="flex flex-row justify-between items-center pr-3"
    >
      <Toolbar>
        <h3>{etablissement && etablissement.nom}</h3>
      </Toolbar>
      <AccountMenu />
    </AppBar>
  );
};
export default Appbar;

const AccountMenu = ({ drawer }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar className="bg-white text-darker uppercase">
            {user.email[0]}
          </Avatar>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link to={"compte"}>
          <MenuItem>
            <ListItemIcon>
              <PersonOutlineTwoTone />
            </ListItemIcon>
            Mon compte
          </MenuItem>
        </Link>

        <Divider />

        <MenuItem onClick={() => dispatch(deconnexion())}>
          <ListItemIcon>
            <LogoutTwoTone fontSize="small" />
          </ListItemIcon>
          Déconnexion
        </MenuItem>
      </Menu>
    </>
  );
};
