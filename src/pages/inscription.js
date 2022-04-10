import * as React from "react";
import { Brand } from "../Components/Logo";
import * as dataAnimation from "../../public/animations/validated.json";
import { TextField, Button, Alert, Collapse } from "@mui/material";
import { useState } from "react";
import MyLottie from "../Components/MyLottie";

import { HomeTwoTone } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../Data/serveur";

const Inscription = () => {
  //Initialisation des variables
  const [abrev, setabrev] = useState();
  const [nom, setnom] = useState();
  const [email, setemail] = useState();
  const [num, setnum] = useState();
  const [site, setsite] = useState();
  const [adresse, setadresse] = useState();
  const [pays, setpays] = useState();
  const [ville, setville] = useState();
  const [data, setdata] = useState();
  const [isLaoding, setloading] = useState(false);
  const [error, seterror] = useState();
  //Fonction associé a la form, elle s'execute lorsqu'on submit
  const Envoyer = (event) => {
    //Empecher le reload de la page
    event.preventDefault();
    setloading(true);
    const d = {
      abrev,
      nom,
      email,
      num,
      site,
      adresse,
      pays,
      ville,
    };

    axios
      .post(SERVER_URL + "/inscription", d)
      .then((v) => setdata(v.data))
      .catch(() => seterror("Erreur du serveur, veuillez réessayer"))
      .finally(() => setloading(false));
  };
  return (
    <div className="flex flex-col items-center py-6 px-2 w-screen">
      <Brand />
      {data !== undefined ? (
        <InscriptionEnvoye demande={data} />
      ) : (
        <div className="m-6 p-6 flex flex-col items-center w-full bg-white max-w-3xl shadow-md rounded-md">
          <h2>Demande d'inscription</h2>
          <p className="max-w-xl text-center text-black/50 py-3">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <form
            onSubmit={Envoyer}
            className="py-4 px-6 flex flex-col w-full gap-8"
          >
            <div className="flex flex-row gap-8">
              <TextField
                value={abrev}
                onChange={(v) => setabrev(v.target.value)}
                type={"text"}
                fullWidth
                label="Abréviation"
                className="w-1/3"
              />
              <TextField
                type={"text"}
                fullWidth
                label="Nom complet"
                value={nom}
                onChange={(v) => setnom(v.target.value)}
              />
            </div>
            <div className="flex flex-row gap-8">
              <TextField
                type={"email"}
                fullWidth
                label="Email"
                value={email}
                onChange={(v) => setemail(v.target.value)}
              />
              <TextField
                type={"tel"}
                fullWidth
                label="Tel"
                value={num}
                onChange={(v) => setnum(v.target.value)}
              />
            </div>
            <TextField
              type={"url"}
              fullWidth
              label="Site internet"
              value={site}
              onChange={(v) => setsite(v.target.value)}
            />
            <div className="flex flex-row gap-8">
              <TextField
                type={"text"}
                fullWidth
                label="Pays"
                value={pays}
                onChange={(v) => setpays(v.target.value)}
              />
              <TextField
                type={"text"}
                fullWidth
                label="Ville"
                value={ville}
                onChange={(v) => setville(v.target.value)}
              />
            </div>
            <TextField
              type={"text"}
              fullWidth
              label="Adresse"
              value={adresse}
              onChange={(v) => setadresse(v.target.value)}
            />

            <Button
              disabled={isLaoding}
              type="submit"
              variant="contained"
              color="primary"
            >
              {isLaoding ? "Traitement..." : "Envoyer"}
            </Button>

            <Collapse in={error !== undefined}>
              <Alert
                severity="error"
                onClose={() => {
                  seterror(undefined);
                }}
              >
                {error}
              </Alert>
            </Collapse>
          </form>
        </div>
      )}
    </div>
  );
};

const InscriptionEnvoye = ({ demande }) => {
  return (
    <div className="flex flex-col items-center text-center px-2">
      <MyLottie data={dataAnimation} size="w-[20vw]" />
      <div className="max-w-xl">
        <p>
          Votre demande d'inscription a été envoyée avec succès. Une fois que
          l'authenticité de votre établissement <strong>{demande.nom}</strong>{" "}
          est vérifiée, vous recevriez, sur l'email{" "}
          <strong>{demande.email}</strong>, les informations nécessaires pour la
          connexion à la plateforme.
        </p>
        <hr className="my-4" />
        <Button variant="outlined" color="primary" startIcon={<HomeTwoTone />}>
          <Link to={"/"}> accueil</Link>
        </Button>
      </div>
    </div>
  );
};

export default Inscription;
