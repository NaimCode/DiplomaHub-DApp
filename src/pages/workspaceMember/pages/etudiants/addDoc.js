import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import { Buffer } from "buffer";
import { useState, useEffect } from "react";
import { create } from "ipfs-http-client";

const client = create("https://ipfs.infura.io:5001/api/v0");

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddDoc({ open, setopenAssocier, data, setmembres }) {
  const [file, setfile] = useState();
  const [fileData, setfileData] = useState();
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const created = await client.add(file);
  //       const url = `https://ipfs.infura.io/ipfs/${created.path}`;
  //       setUrlArr((prev) => [...prev, url]);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
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
  const HashingIpfs = (data) => {
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      console.log("Buffer data: ", Buffer(reader.result));
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
              {data.nom} {data.prenom}
            </Typography>

            <Button disabled={!file} color="inherit" onClick={handleClose}>
              valider
            </Button>
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
        </Stack>
      </Dialog>
    </div>
  );
}
