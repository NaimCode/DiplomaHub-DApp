import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as XLSX from "xlsx";
import { notifier } from "../../../../redux/notifSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import styled from "@emotion/styled";
import axios from "axios";
import template from "./templateImport.xlsx";
import { SERVER_URL } from "../../../../Data/serveur";
const Input = styled("input")({
  display: "none",
});

export default function ImportDialog({
  open,
  setOpen,
  mesEtudiants,
  setmesEtudiants,
}) {
  const etablissement_id = useSelector(
    (state) => state.user.data.etablissement_id._id
  );
  const dis = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const [isLoading, setisLoading] = useState(false);
  const onLoadList = (e) => {
    setisLoading(true);

    const [file] = e.target.files;
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      console.log(data);
      const etudiants_temp = data.map((e) => ({
        nom: e["Nom"],
        prenom: e["Prénom"],
        email: e["Email"],
        etablissement_id,
      }));
      let etudiants = [];
      for (let index = 0; index < etudiants_temp.length; index++) {
        if (
          etudiants_temp[index].nom &&
          etudiants_temp[index].prenom &&
          etudiants_temp[index].email
        ) {
          etudiants.push(etudiants_temp[index]);
        }
      }
      axios
        .post(SERVER_URL + "/mesEtudiants/addAll", etudiants)
        .then((v) => {
          setmesEtudiants((old) => [...v.data, ...old]);
          dis(
            notifier({
              message: "Importation réussie",
            })
          );
        })
        .catch((v) =>
          dis(
            notifier({
              message: "Impossible d'importer",
              type: "error",
            })
          )
        )
        .finally((v) => {
          handleClose();
          setisLoading(false);
        });
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Importation de la liste des étudiants
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            Pour importer votre liste, vous devez respecter certains points
            notamment: le fichier doit être du type excel, ayant 3 colonne. A
            noter que la liste importé ne peut plus être modifier donc
            assuerz-vous de la validité des données avant l'import.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            color="info"
            style={{ marginRight: 10 }}
            onClick={handleClose}
          >
            annuler
          </Button>
          <a href={template} download>
            <Button variant="outlined" color="info" style={{ marginRight: 10 }}>
              Télécharger une template
            </Button>
          </a>
          {isLoading ? (
            <CircularProgress
              size={40}
              style={{ marginRight: 10, marginLeft: 10 }}
            />
          ) : (
            <label htmlFor="contained-button-file">
              <Input
                accept=".xlsx, .xls, .csv"
                id="contained-button-file"
                type="file"
                onChange={onLoadList}
              />
              <Button variant="contained" color="primary" component="span">
                Importer
              </Button>
            </label>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
