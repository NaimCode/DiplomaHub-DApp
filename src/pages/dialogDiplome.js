import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { CircularProgress, TextField } from "@mui/material";
import { DownloadForOffline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";
import fileDownload from "js-file-download";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogDiplome({ open, setOpen }) {
  const [isLoading, setisLoading] = React.useState(false);
  const handleClose = () => {
    setOpen(null);
  };
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
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {open && (
          <>
            <DialogTitle className="text-xl font-light font-corps_2">
              <h3>Détail du diplôme</h3>
            </DialogTitle>
            <DialogContent dividers>
              <TextField
                // inputProps={{ readOnly: true }}
                label="Intitulé"
                variant="filled"
                fullWidth
                disabled
                value={open.intitule}
              />
              <TextField
                label="Nom"
                variant="filled"
                fullWidth
                disabled
                style={{ marginTop: 10, marginBottom: 10 }}
                value={open.etudiant.nom}
              />

              <TextField
                fullWidth
                // inputProps={{ readOnly: true }}
                label="Prénom"
                disabled
                variant="filled"
                value={open.etudiant.prenom}
              />

              <TextField
                // inputProps={{ readOnly: true }}
                label="Établissement"
                type={"email"}
                variant="filled"
                fullWidth
                disabled
                style={{ marginTop: 10, marginBottom: 10 }}
                value={open.etablissement.nom}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>retour</Button>
              {isLoading ? (
                <Button variant="text" color="primary">
                  <CircularProgress size={20} />
                </Button>
              ) : (
                <Button
                  endIcon={<DownloadForOffline />}
                  disableElevation
                  variant="contained"
                  onClick={() =>
                    handleClick(open.doc, open.etudiant.nom + ".jpg")
                  }
                  type="submit"
                >
                  télécharger le document
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}
