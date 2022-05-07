import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Buffer } from "buffer";
import { useState, useEffect } from "react";
import { create } from "ipfs-http-client";
import { useDispatch } from "react-redux";
import { notifier } from "../../../../redux/notifSlice";
import axios from "axios";
import { SERVER_URL } from "../../../../Data/serveur";
export const client = create("https://ipfs.infura.io:5001/api/v0");

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddDoc({
  open,
  setopenAssocier,
  data,
  setMesEtudiants,
  mesEtudiants,
}) {
  const [file, setfile] = useState();
  const [fileData, setfileData] = useState();
  const [isLoading, setisLoading] = useState();
  const [intitule, setintitule] = useState();
  const dis = useDispatch();
  const handleSubmit = async (file) => {
    setisLoading(true);
    try {
      const created = await client.add(file);
      axios
        .put(SERVER_URL + "/mesEtudiants/setDiplomeHash/" + data._id, {
          hash: created.path,
          intitule,
        })
        .then((v) => {
          setMesEtudiants((old) => old.filter((o) => o._id !== data._id));
          dis(
            notifier({
              message: "Association réussie",
            })
          );
          setopenAssocier(false);
        })
        .catch((error) =>
          dis(
            notifier({
              message: "Erreur de chargement du document",
              type: "error",
            })
          )
        );
    } catch (error) {
      dis(
        notifier({ message: "Erreur de chargement du document", type: "error" })
      );
    }
    setisLoading(false);
  };
  const handleClose = () => {
    setopenAssocier(false);
  };
  const onFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setfileData(event.target.files[0]);
      let reader = new FileReader();

      reader.onload = (e) => {
        setfile(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  useEffect(() => {
    setfile(null);
  }, [data]);
  const HashingIpfs = () => {
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(fileData);
    reader.onloadend = () => {
      handleSubmit(Buffer(reader.result));
    };
  };
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {data?.nom} {data?.prenom}
            </Typography>

            {isLoading ? (
              <CircularProgress color="inherit" size={30} />
            ) : (
              <Button
                disabled={!file || !intitule}
                color="inherit"
                onClick={HashingIpfs}
              >
                valider
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          style={{ padding: 20 }}
        >
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            style={{
              padding: 20,
              height: "80vh",
              width: "90vw",
            }}
          >
            {file && (
              <img
                src={file}
                alt="diplome"
                style={{ objectFit: "contain", height: "80vh", width: "90vw" }}
              />
            )}
          </Stack>
          <div className="flex flex-row gap-3 items-center">
            <TextField
              label="Intitulé"
              variant="outlined"
              value={intitule}
              size="small"
              style={{ marginRight: 10 }}
              onChange={(v) => setintitule(v.target.value)}
            />
            <label htmlFor="contained-button-file">
              <input
                accept="image/*"
                id="contained-button-file"
                type="file"
                style={{ display: "none" }}
                onChange={onFileChange}
              />
              <Button variant="outlined" color="primary" component="span">
                Selectionner le document
              </Button>
            </label>
          </div>
        </Stack>
      </Dialog>
    </div>
  );
}
