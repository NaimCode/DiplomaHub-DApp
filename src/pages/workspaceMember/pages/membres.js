/* eslint-disable react-hooks/exhaustive-deps */
import "@dotlottie/player-component";
import React from "react";
import {
  Fab,
  Tooltip,
  Button,
  DialogActions,
  Dialog,
  TextField,
  Collapse,
  Alert,
  CircularProgress,
  Snackbar,
  Divider,
  List,
  Chip,
} from "@mui/material";
import { Add, AddTwoTone } from "@mui/icons-material";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../../../Data/serveur";
import { useSelector } from "react-redux";
import MyLottie from "../../../Components/MyLottie";
import Lottie from "react-lottie";
import { avatarUrl } from "../../../Data/avatar";
import SelectableTextField from "../../../Components/workspace/roleSelection";
const MembresPage = () => {
  const [open, setOpen] = React.useState(false);
  const [openDialog, setopenDialog] = useState(false);
  const user = useSelector((state) => state.user.data);
  let [membres, setmembres] = useState(null);

  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    getmembres();
  }, []);
  function getmembres() {
    setisLoading(true);

    axios
      .get(SERVER_URL + "/membre/getAll/" + user.etablissement_id._id)
      .then((v) => {
        membres = v.data;
        setmembres(membres);
      })
      .catch((v) => console.log(v.response))
      .finally(() => setisLoading(false));
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <AddComponent
        open={open}
        handleClose={handleClose}
        membres={membres}
        setmembres={setmembres}
      />

      <div className="py-8 px-4 bg-white border-[1px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className="flex flex-row gap-2 justify-between">
              <h2>Gestion des membres</h2>
              <Tooltip title="Ajouter un nouveau rôle">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className="my-2"
                  startIcon={<AddTwoTone />}
                  onClick={handleClickOpen}
                >
                  nouveau
                </Button>
              </Tooltip>
            </div>
            <Divider />
            {membres ? (
              <List className="flex flex-wrap -m-4">
                {membres.map((v, i) => (
                  <ItemMembre membre={v} key={i} />
                ))}
              </List>
            ) : (
              <p className="p-5 opacity-0">Pas de membre</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MembresPage;

const AddComponent = ({ open, handleClose, membres, setmembres }) => {
  const [errr, seterrr] = useState();
  const [nom, setnom] = useState();
  const [prenom, setprenom] = useState();
  const [email, setemail] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [roles, setroles] = useState([]);

  const etablissement_id = useSelector(
    (state) => state.user.data.etablissement_id
  );

  const Submit = (event) => {
    event.preventDefault();
    setisLoading(true);
    // console.log(roles);
    const data = {
      nom,
      prenom,
      email,
      etablissement_id,
      roles: roles.map((v) => v._id),
    };

    axios
      .post(SERVER_URL + "/membre/add", data)
      .then((v) => {
        seterrr("success");
        console.log(v.data);
        membres.push({ ...data, roles });
        setmembres(membres);
        handleClose();
      })
      .catch((v) => seterrr(v.response.data.error))
      .finally(() => setisLoading(false));
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <Snackbar
        open={errr}
        autoHideDuration={6000}
        onClose={() => seterrr(null)}
      >
        <Alert
          onClose={() => seterrr(null)}
          severity={`${errr === "success" ? "success" : "warning"}`}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errr}
        </Alert>
      </Snackbar>

      <DialogTitle className="text-xl font-light font-corps_2">
        <h3>Création de membre</h3>
      </DialogTitle>
      <form onSubmit={Submit}>
        <DialogContent dividers>
          <TextField
            label="Nom"
            variant="filled"
            fullWidth
            required
            value={nom}
            onChange={(v) => setnom(v.target.value)}
          />

          <TextField
            fullWidth
            // inputProps={{ readOnly: true }}
            label="Prénom"
            variant="filled"
            style={{ marginTop: 10, marginBottom: 10 }}
            value={prenom}
            onChange={(v) => setprenom(v.target.value)}
            required
          />

          <TextField
            // inputProps={{ readOnly: true }}
            label="Email"
            type={"email"}
            variant="filled"
            required
            fullWidth
            value={email}
            onChange={(v) => setemail(v.target.value)}
          />
          <SelectableTextField list={roles} setlist={setroles} label="Rôles" />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>

          {isLoading ? (
            <Button variant="text" color="primary">
              <CircularProgress size={20} />
            </Button>
          ) : (
            <Button disableElevation variant="contained" type="submit">
              Créer
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};

const ItemMembre = ({ membre }) => {
  return (
    <div className="w-full p-4 lg:w-1/2 transition-all duration-300 ">
      <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
        <dotlottie-player
          //  autoplay
          loop
          hover
          mode="normal"
          src={membre.avatar ? avatarUrl[membre.avatar].src : avatarUrl[0].src}
          style={{ height: "200px", width: "200px" }}
        ></dotlottie-player>
        <div className="flex-grow sm:pl-4">
          <h6 className="title-font font-medium text-lg text-gray-900">
            {membre.nom ?? "---"} {membre.prenom ?? "---"}
          </h6>
          <Divider />
          <p className="text-gray-500 ">{membre.email}</p>
          <br className="grow" />
          <div className="flex flex-wrap gap-2">
            {membre.roles.map((v, i) => (
              <Chip key={i} label={v.intitule} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
