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
} from "@mui/material";
import { Add } from "@mui/icons-material";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../../Data/serveur";
import { useSelector } from "react-redux";
const MembresPage = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <AddComponent open={open} handleClose={handleClose} />
      <Fab
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
        onClick={handleClickOpen}
        aria-label={"Ajouter"}
        color="primary"
      >
        <Tooltip title="créer un membre">
          <Add />
        </Tooltip>
      </Fab>
    </div>
  );
};

export default MembresPage;

const AddComponent = ({ open, handleClose }) => {
  const [errr, seterrr] = useState();
  const [nom, setnom] = useState();
  const [prenom, setprenom] = useState();
  const [email, setemail] = useState();
  const [isLoading, setisLoading] = useState(false);
  const etablissement_id = useSelector(
    (state) => state.user.data.etablissement_id
  );
  const Submit = (event) => {
    event.preventDefault();
    setisLoading(true);
    axios
      .post(SERVER_URL + "/membre/add", {
        nom,
        prenom,
        email,
        etablissement_id,
      })
      .then((v) => {
        seterrr("success");
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
