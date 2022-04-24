import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { SERVER_URL } from "../../../../Data/serveur";
import { notifier } from "../../../../redux/notifSlice";
export const AddEtudiant = ({ open, handleClose, etudiants, setetudiants }) => {
  const [errr, seterrr] = useState();
  const [nom, setnom] = useState();
  const [prenom, setprenom] = useState();
  const [email, setemail] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [roles, setroles] = useState([]);
  const [conf, setconf] = useState();
  const nav = useNavigate();
  const dis = useDispatch();
  const etablissement_id = useSelector(
    (state) => state.user.data.etablissement_id
  );

  const Submit = (event) => {
    event.preventDefault();

    // console.log(roles);
    if (email === conf) {
      setisLoading(true);
      const data = {
        nom,
        prenom,
        email,
        etablissement_id,
      };

      handleClose();
      axios
        .post(SERVER_URL + "/mesEtudiants/add", data)
        .then((v) => {
          //   etudiants.push(v.data);
          //   console.log(etudiants);
          setetudiants((es) => [...es, v.data]);
          dis(
            notifier({
              message: "Etudiant ajouté",
            })
          );
          handleClose();
        })
        .catch((v) =>
          dis(
            notifier({
              message: "Erreur d'ajoût",
              type: "error",
            })
          )
        )
        .finally(() => setisLoading(false));
    } else {
      dis(
        notifier({
          message: "Les deux emails sont différents",
          type: "warning",
        })
      );
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle className="text-xl font-light font-corps_2">
        <h3>Ajouter un étudiant</h3>
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
            style={{ marginBottom: 10 }}
            value={email}
            onChange={(v) => setemail(v.target.value)}
          />
          <TextField
            // inputProps={{ readOnly: true }}
            label="Confirmation de l'email"
            type={"email"}
            variant="filled"
            required
            fullWidth
            value={conf}
            onChange={(v) => setconf(v.target.value)}
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
