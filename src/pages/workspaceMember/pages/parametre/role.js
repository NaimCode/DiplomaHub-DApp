import { AddTwoTone } from "@mui/icons-material";
import {
  Card,
  Divider,
  Button,
  Tooltip,
  Box,
  MenuItem,
  ButtonGroup,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../../../../Data/serveur";

const eRole = ["Affichage", "Importation", "Certification"];
const rRole = ["Affichage", "Ajoût", "Suppression"];
const etRole = ["Affichage", "Modification"];
const Role = () => {
  const [openDialog, setopenDialog] = useState(false);
  const user = useSelector((state) => state.user.data);
  const [roles, setroles] = useState();
  const [errr, seterrr] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    setisLoading(true);
    console.log(user);
    axios
      .get(SERVER_URL + "/role/getAll/" + user.etablissement_id)
      .then((v) => {
        console.log(v.data);
        setroles(v.data);
      })
      .catch((v) => console.log(v.response))
      .finally(() => setisLoading(false));
  }, [user]);

  return (
    <div className="py-8 px-4 bg-white border-[1px]">
      <Snackbar
        open={errr}
        autoHideDuration={6000}
        onClose={() => seterrr(null)}
      >
        <Alert
          onClose={() => seterrr(null)}
          severity={`${
            errr === "Vous avez ajouté un nouveau rôle" ? "success" : "warning"
          }`}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errr}
        </Alert>
      </Snackbar>
      {isLoading ? (
        <div className="flex items-center justify-center py-10">
          <CircularProgress />
        </div>
      ) : (
        <>
          <RoleDialog
            openDialog={openDialog}
            setopenDialog={setopenDialog}
            seterrr={seterrr}
            etablissement_id={user.etablissement_id}
            roles={roles}
            setroles={setroles}
          />
          <div className="flex flex-row gap-2 justify-between">
            <h2>Gestion des rôles</h2>
            <Tooltip title="Ajouter un nouveau rôle">
              <Button
                variant="contained"
                color="primary"
                size="small"
                className="my-2"
                startIcon={<AddTwoTone />}
                onClick={() => setopenDialog(true)}
              >
                nouveau
              </Button>
            </Tooltip>
          </div>
          <Divider />
          {roles ? (
            <p>Pas de roles</p>
          ) : (
            roles.map((v, i) => <p key={i}>{v}</p>)
          )}
        </>
      )}
    </div>
  );
};

export default Role;

const RoleDialog = ({
  openDialog,
  setopenDialog,
  seterrr,
  etablissement_id,
  setroles,
  roles,
}) => {
  const [membre, setmembre] = useState([]);
  const [etudiant, setetudiant] = useState([]);
  const [role, setrole] = useState([]);
  const [eta, seteta] = useState([]);
  const [intitule, setintitule] = useState();
  const [description, setdescription] = useState();
  const [isLoading, setisLoading] = useState(false);
  const Submit = (e) => {
    e.preventDefault();
    setisLoading(true);
    axios
      .post(SERVER_URL + "/role/add", {
        etablissement_id,
        membre,
        etudiant,
        etablissement: eta,
        role,
        intitule,
        description,
      })
      .then((v) => {
        seterrr("Vous avez ajouté un nouveau rôle");
        console.log(v.data);
        roles.push(v.data);
        setroles(roles);

        console.log(roles);
        setopenDialog(false);
      })
      .catch((v) => seterrr("Erreur d'ajoût"))
      .finally(() => {
        setisLoading(false);
      });
  };

  return (
    <Dialog open={openDialog} onClose={() => setopenDialog(false)}>
      <form onSubmit={Submit}>
        <DialogTitle>
          <h3>Nouveau rôle</h3>
          <TextField
            label="Intitulé"
            variant="filled"
            type={"text"}
            fullWidth
            size="small"
            value={intitule}
            onChange={(v) => setintitule(v.target.value)}
            style={{ marginBottom: 10 }}
          />
          <TextField
            label="Description"
            variant="filled"
            fullWidth
            type={"text"}
            size="small"
            value={description}
            onChange={(v) => setdescription(v.target.value)}
            minRows={3}
            maxRows={5}
            multiline
          />
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            select
            variant="filled"
            label="Gestion de l'établissement"
            fullWidth
            required
            SelectProps={{
              multiple: true,
              value: eta,
              onChange: (v) => {
                const temp = [];
                v.target.value.forEach((element) => {
                  temp.push(element);
                });
                seteta(temp);
              },
            }}
          >
            {etRole.map((v, i) => (
              <MenuItem key={i} value={v}>
                {v}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            variant="filled"
            label="Gestion des membres"
            fullWidth
            required
            SelectProps={{
              multiple: true,
              value: membre,
              onChange: (v) => {
                const temp = [];
                v.target.value.forEach((element) => {
                  temp.push(element);
                });
                setmembre(temp);
              },
            }}
          >
            <MenuItem value="Affichage">Affichage</MenuItem>
            <MenuItem value="Création">Création</MenuItem>
            <MenuItem value="Suppression">Suppression</MenuItem>
          </TextField>
          <TextField
            select
            variant="filled"
            label="Gestion des étudiants"
            fullWidth
            required
            SelectProps={{
              multiple: true,
              value: etudiant,
              onChange: (v) => {
                const temp = [];
                v.target.value.forEach((element) => {
                  temp.push(element);
                });
                setetudiant(temp);
              },
            }}
          >
            {eRole.map((v, i) => (
              <MenuItem key={i} value={v}>
                {v}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            variant="filled"
            label="Gestion des rôles"
            fullWidth
            required
            SelectProps={{
              multiple: true,
              value: role,
              onChange: (v) => {
                const temp = [];
                v.target.value.forEach((element) => {
                  temp.push(element);
                });
                setrole(temp);
              },
            }}
          >
            {rRole.map((v, i) => (
              <MenuItem key={i} value={v}>
                {v}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            color="primary"
            onClick={() => setopenDialog(false)}
          >
            annuler
          </Button>
          {isLoading ? (
            <Button variant="text" color="primary">
              <CircularProgress size={24} />
            </Button>
          ) : (
            <Button type="submit" variant="contained" color="primary">
              Ajouter
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};
