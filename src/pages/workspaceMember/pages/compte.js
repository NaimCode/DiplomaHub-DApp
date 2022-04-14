import CardMedia from "@mui/material/CardMedia";
import { TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as dataAnimation from "../../../../public/animations/profile.json";
import MyLottie from "../../../Components/MyLottie";
const Compte = () => {
  const user = useSelector((state) => state.user);
  const [nom, setnom] = useState();
  const [prenom, setprenom] = useState();
  useEffect(() => {
    setnom(user.data.nom);
    setprenom(user.data.prenom);
  });

  return (
    <div className="w-full flex flex-col justify-center items-center">
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
            onChange={(v) => setnom(v.target.v)}
          />
          <TextField
            // inputProps={{ readOnly: true }}
            label="Prénom"
            variant="filled"
            value={prenom}
            onChange={(v) => setprenom(v.target.v)}
            fullWidth
          />
        </div>
        <TextField
          // inputProps={{ readOnly: true }}
          label="Email"
          type={"email"}
          inputProps={{
            readOnly: true,
          }}
          variant="filled"
          value={user.data.email}
          fullWidth
        />
        <TextField
          // inputProps={{ readOnly: true }}
          label="Mot de passe"
          type={"password"}
          inputProps={{
            readOnly: true,
          }}
          variant="filled"
          value={user.data.password}
          fullWidth
        />
        <Button variant="text" color="primary">
          Modifier mon mot de passe
        </Button>
        <div className="flex flex-row justify-between items-center">
          <Button variant="outlined" color="warning">
            Annuler
          </Button>
          <Button variant="contained" color="primary">
            Confirmer
          </Button>
        </div>
      </div>
      <div className="w-full max-w-2xl"></div>
    </div>
  );
};

export default Compte;
