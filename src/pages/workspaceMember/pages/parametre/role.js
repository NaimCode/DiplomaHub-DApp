/* eslint-disable react-hooks/exhaustive-deps */
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
  List,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../../../../Data/serveur";
import ItemRole from "./itemRole";

const eRole = ["Affichage", "Importation", "Certification"];
const rRole = ["Affichage", "Ajoût", "Suppression"];
const etRole = ["Affichage", "Modification"];

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
const Role = () => {
  const [openDialog, setopenDialog] = useState(false);
  const user = useSelector((state) => state.user.data);
  let [roles, setroles] = useState(null);
  let [errr, seterrr] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    getRoles();
  }, []);
  function getRoles() {
    setisLoading(true);

    axios
      .get(SERVER_URL + "/role/getAll/" + user.etablissement_id._id)
      .then((v) => {
        roles = v.data;
        setroles(roles);
      })
      .catch((v) => console.log(v.response))
      .finally(() => setisLoading(false));
  }
  return (
    <div className="py-8 px-4 bg-white border-[1px]">
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
            errr={errr}
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
            <ItemRole rows={rows} roles={roles.reverse()} />
          ) : (
            <p className="pt-4 opacity-30">Vous n'avez aucun rôle encore</p>
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
  errr,
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
        errr = "Vous avez ajouté un nouveau rôle";
        seterrr(errr);
        roles.push(v.data);
        setroles(roles);
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
            required
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
            <Button
              disableElevation
              type="submit"
              variant="contained"
              color="primary"
            >
              Ajouter
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};
