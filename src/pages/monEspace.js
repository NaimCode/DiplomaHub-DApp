/* eslint-disable react-hooks/exhaustive-deps */
import {
  Divider,
  List,
  Paper,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import fileDownload from "js-file-download";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { SERVER_URL } from "../Data/serveur";
import { notifier } from "../redux/notifSlice";
import EtudiantAppbar from "./etudiantAppbar";

const MonEspace = () => {
  const user = useSelector((state) => state.user.data);
  const [diplomes, setdiplomes] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const dis = useDispatch();
  useEffect(() => {
    setisLoading(true);
    axios
      .get(SERVER_URL + "/diplome/get/all/" + user._id)
      .then((res) => {
        console.log(res.data);
        setdiplomes((old) => [...res.data]);
      })
      .catch((err) =>
        dis(notifier({ message: "Erreur du serveur", type: "error" }))
      )
      .finally(() => setisLoading(false));
  }, []);
  return (
    <div>
      <Helmet>
        <title>{user.nom} | Mon Espace</title>
        <meta
          name="description"
          content="Bienvenue sur la plateforme de certification numérique"
        />
      </Helmet>
      <EtudiantAppbar />
      <List className="px-4 py-[80px] flex flex-wrap gap-5 justify-center items-center">
        {diplomes.map((d, i) => (
          <ItemDiplome diplome={d} index={i} etudiant={user} />
        ))}
      </List>
    </div>
  );
};

export default MonEspace;

const ItemDiplome = ({ diplome, index, etudiant }) => {
  const [isLoading, setisLoading] = React.useState(false);

  const handleClick = (url, filename) => {
    setisLoading(true);
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      })
      .finally(() => setisLoading(false));
  };
  return (
    <Paper
      elevation={2}
      key={index}
      className="w-full md:w-[45%] lg:w-[30%] rounded-md p-4"
    >
      <div className="py-3 ">
        <div className="flex flex-row  items-center">
          <div className="gap-3 flex flex-col w-full">
            <div className="flex flex-row gap-3">
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                size="small"
                label="Nom"
                variant="outlined"
                value={etudiant?.nom}
              />
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                size="small"
                fullWidth
                label="Prénom"
                variant="outlined"
                value={etudiant?.prenom}
              />
            </div>
            <TextField
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              size="small"
              label="Intitulé"
              variant="outlined"
              value={diplome?.intitule}
            />
            <TextField
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              size="small"
              label="Établissement"
              variant="outlined"
              value={diplome?.etablissement.nom}
            />
            <TextField
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              multiline
              size="small"
              label="Hash"
              variant="outlined"
              value={diplome?.hash}
            />
          </div>
        </div>

        <div className="flex flex-row justify-center pt-2 ">
          <QRCodeCanvas value={diplome.hash} />
        </div>
        <Divider className="my-2" />
        <div>
          <Button
            variant="text"
            fullWidth
            color="primary"
            onClick={() => {
              if (!isLoading)
                handleClick(diplome.doc, diplome.intitule + ".jpg");
            }}
          >
            {isLoading ? <CircularProgress /> : "Télécharger le document"}
          </Button>
        </div>
      </div>
    </Paper>
  );
};
