import * as React from "react";
import Button from "@mui/material/Button";
import { avatarUrl } from "../../../../Data/avatar";
import { useNavigate } from "react-router-dom";
import {
  Chip,
  Divider,
  IconButton,
  TextField,
  Dialog,
  Snackbar,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
} from "@mui/material";
import "@dotlottie/player-component";
import { useState } from "react";
import { notifier } from "../../../../redux/notifSlice";
import { DeleteTwoTone, EditTwoTone } from "@mui/icons-material";
import SelectableTextField from "../../../../Components/workspace/roleSelection";
import axios from "axios";
import { SERVER_URL } from "../../../../Data/serveur";
import { useDispatch, useSelector } from "react-redux";
const ItemMembre = ({ membre }) => {
  const [open, setOpen] = React.useState(false);
  const [openD, setOpenD] = React.useState(false);
  const user_id = useSelector((state) => state.user.data._id);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenD = () => {
    setOpenD(true);
  };

  const handleCloseD = () => {
    setOpenD(false);
  };
  return (
    <>
      <EditRoles open={open} handleClose={handleClose} membre={membre} />
      <ConfirmationPassword
        open={openD}
        handleClose={handleCloseD}
        membre={membre}
      />
      <div className="w-full p-4 lg:w-1/2 transition-all duration-300 group">
        <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
          <dotlottie-player
            //  autoplay
            loop
            hover
            mode="normal"
            className="transition-all duration-300"
            src={
              membre.avatar ? avatarUrl[membre.avatar].src : avatarUrl[0].src
            }
            style={{ height: "200px", width: "200px" }}
          ></dotlottie-player>
          <div className="flex-grow sm:pl-4">
            <h6 className="title-font font-medium text-lg text-gray-900">
              {membre.nom ?? "---"} {membre.prenom ?? "---"}
            </h6>
            <Divider />
            <p className="text-gray-500 ">{membre.email}</p>
            <br className="grow" />
            <div className="flex flex-wrap gap-2 items-center">
              {membre.roles.map((v, i) => (
                <Chip key={i} label={v.intitule} />
              ))}
              {membre._id !== user_id && (
                <>
                  <IconButton
                    onClick={handleClickOpen}
                    size="small"
                    variant="outlined"
                    title="Modifier les rôles"
                    color="secondary"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm"
                  >
                    <EditTwoTone />
                  </IconButton>
                  <IconButton
                    size="small"
                    variant="outlined"
                    title="Supprimer ce membre"
                    color="error"
                    onClick={handleClickOpenD}
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-sm"
                  >
                    <DeleteTwoTone />
                  </IconButton>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ItemMembre;

const EditRoles = ({ open, handleClose, membre }) => {
  const [isLoading, setisLoading] = useState(false);
  const [roles, setroles] = useState([]);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const Submit = (event) => {
    event.preventDefault();

    axios
      .put(SERVER_URL + "/membre/update/roles/" + membre._id, {
        roles: roles.size === 0 ? [] : roles.map((e) => e._id),
      })
      .then((v) => {
        dispatch(
          notifier({
            message: "Modification réussie",
          })
        );
        nav(0);
      })
      .catch((v) =>
        dispatch(
          notifier({
            message: "Echec de modification",
            type: "error",
          })
        )
      )
      .finally(() => setisLoading(false));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      maxWidth={600}
    >
      <DialogTitle className="text-xl font-light font-corps_2">
        <h3>Modification de rôles</h3>
      </DialogTitle>
      <form onSubmit={Submit}>
        <DialogContent dividers>
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
              Enregistrer
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};

const ConfirmationPassword = ({ open, handleClose, membre }) => {
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();
  const [pass, setpass] = useState();
  const user = useSelector((state) => state.user.data);
  const nav = useNavigate();
  const Submit = (event) => {
    event.preventDefault();

    if (pass === user.password) {
      setisLoading(true);
      axios
        .delete(SERVER_URL + "/membre/delete/" + membre._id)
        .then((v) => {
          dispatch(notifier({ message: "Suppression d'un membre" }));
          nav(0);
        })
        .catch((v) =>
          dispatch(
            notifier({
              message: "Impossible de supprimer, erreur du serveur",
              type: "error",
            })
          )
        )
        .finally(() => setisLoading(false));
    } else {
      dispatch(notifier({ message: "Mot de passe erroné", type: "error" }));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      maxWidth={600}
    >
      <DialogTitle className="text-xl font-light font-corps_2">
        <h3>Suppression de membre</h3>
      </DialogTitle>
      <form onSubmit={Submit}>
        <DialogContent dividers>
          <TextField
            label="Confirmation de mot de passe"
            variant="filled"
            fullWidth
            required
            value={pass}
            onChange={(v) => setpass(v.target.value)}
          />
        </DialogContent>

        <DialogActions className="flex flex-row justify-between items-center">
          <Button onClick={handleClose}>Annuler</Button>

          {isLoading ? (
            <Button variant="text" color="primary">
              <CircularProgress size={20} />
            </Button>
          ) : (
            <Button disableElevation variant="contained" type="submit">
              Confirmer
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};
