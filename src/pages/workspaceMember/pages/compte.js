/* eslint-disable react-hooks/exhaustive-deps */
import CardMedia from "@mui/material/CardMedia";
import {
  TextField,
  Button,
  Divider,
  Collapse,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as dataAnimation from "../../../../public/animations/profile.json";
import MyLottie from "../../../Components/MyLottie";
import { update } from "../../../redux/userSlice";
import axios from "axios";
import { SERVER_URL } from "../../../Data/serveur";

const Compte = () => {
  const user = useSelector((state) => state.user);
  const [nom, setnom] = useState();
  const [prenom, setprenom] = useState();
  const [diff, setdiff] = useState(false);
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
  };
  const updateUser = (id, data) => {
    axios
      .put(SERVER_URL + "/membre/update/" + id, data)
      .then((v) => {
        setinfo("Profil modifié");
        dispatch(update(v.data));
      })
      .catch(console.log("Erreur d'update"));
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
      <MyLottie data={dataAnimation} size="h-[200px]" />
      <div className="w-full max-w-2xl  rounded-sm flex flex-col gap-6">
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
              onClick={() => updateUser(user.id, { nom, prenom })}
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
