/* eslint-disable react-hooks/exhaustive-deps */
import CardMedia from "@mui/material/CardMedia";
import {
  TextField,
  Button,
  Divider,
  Collapse,
  Snackbar,
  Alert,
  Box,
  IconButton,
  Menu,
  MenuItem,
  List,
} from "@mui/material";
import { useState, useEffect, Children } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as dataAnimation from "../../../../public/animations/profile.json";
import MyLottie from "../../../Components/MyLottie";
import { update } from "../../../redux/userSlice";
import axios from "axios";
import { SERVER_URL } from "../../../Data/serveur";
import { avatarUrl } from "../../../Data/avatar";
import { useNavigate } from "react-router";
import ItemRole, { ItemRoleMini } from "./parametre/itemRole";

const Compte = () => {
  const user = useSelector((state) => state.user);
  const [nom, setnom] = useState();
  const [prenom, setprenom] = useState();
  const [diff, setdiff] = useState(false);
  const [avatar, setavatar] = useState();
  const [info, setinfo] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    reset();
  }, [user]);
  useEffect(() => {
    setdiff(nom !== user.data.nom || prenom !== user.data.prenom);
  }, [nom, prenom, user]);

  const reset = () => {
    setnom(user.data.nom);
    setprenom(user.data.prenom);
    setavatar(
      user.data.avatar ? avatarUrl[user.data.avatar].src : avatarUrl[0].src
    );
  };
  const updateUser = (id, data) => {
    axios
      .put(SERVER_URL + "/membre/update/" + id, data)
      .then((v) => {
        setinfo("Profil modifié");
        dispatch(update(v.data));
      })
      .catch((v) => console.log(v.response));
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Snackbar
        open={info !== null}
        autoHideDuration={3000}
        onClose={() => setinfo(null)}
      >
        <Alert
          onClose={() => setinfo(null)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {info}
        </Alert>
      </Snackbar>
      <span className="text-sm font-corps_1 text-black/40 uppercase">
        Aperçu de mon compte
      </span>
      <dotlottie-player
        autoplay
        loop
        mode="normal"
        src={avatar}
        style={{ width: "25vw" }}
      ></dotlottie-player>
      <AvatarChange updateAvatar={updateUser} id={user.data._id} />

      <div className="w-full max-w-2xl  rounded-sm flex flex-col gap-6 mt-4">
        <div className="flex flex-row gap-5">
          <TextField
            label="Nom"
            variant="filled"
            fullWidth
            value={nom}
            onChange={(v) => setnom(v.target.value)}
          />
          <TextField
            // inputProps={{ readOnly: true }}
            label="Prénom"
            variant="filled"
            value={prenom}
            onChange={(v) => setprenom(v.target.value)}
            fullWidth
          />
        </div>
        <TextField
          // inputProps={{ readOnly: true }}
          label="Email"
          disabled
          type={"email"}
          inputProps={{
            readOnly: true,
          }}
          variant="filled"
          value={user.data.email}
          fullWidth
        />

        {/* <Button variant="text" color="primary">
          Modifier mon mot de passe
        </Button> */}

        <Collapse in={diff}>
          <Divider />
          <div className="flex flex-row justify-between items-center pt-5">
            <Button variant="outlined" color="warning" onClick={() => reset()}>
              remettre
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => updateUser(user.data._id, { nom, prenom })}
            >
              Confirmer
            </Button>
          </div>
        </Collapse>
      </div>
      <div className="w-full max-w-2xl"></div>
    </div>
  );
};

export default Compte;

const AvatarChange = ({ updateAvatar, id }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigation = useNavigate();
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
        <Button
          variant="outlined"
          color="primary"
          className="-translate-y-4"
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          Changer avatar
        </Button>
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
            maxHeight: "40vh",

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
        <List>
          {avatarUrl.map((v, i) => (
            <MenuItem
              key={i}
              onClick={() => {
                updateAvatar(id, { avatar: i });
                //navigation(0);
              }}
            >
              <dotlottie-player
                //autoplay
                loop
                hover
                mode="normal"
                src={v.src}
                style={{ width: "100px" }}
              ></dotlottie-player>
            </MenuItem>
          ))}
        </List>
      </Menu>
    </>
  );
};
