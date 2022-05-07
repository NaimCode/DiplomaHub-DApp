import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Alert,
  Button,
  Chip,
  CircularProgress,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import { notifier } from "../../../../redux/notifSlice";
import { useState } from "react";
import { DeleteTwoTone, EditTwoTone } from "@mui/icons-material";
import axios from "axios";
import { SERVER_URL } from "../../../../Data/serveur";
import { eRole, etRole, rRole } from "./role";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#000000",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const getColor = (i) => {
  const op = "50";
  switch (i) {
    case 0:
      return "bg-blue-300/50";
    case 1:
      return "bg-accentué-normal/40";
    case 2:
      return "bg-pink-500/40";
    default:
      return "";
  }
};
//  <div className="flex-row gap-[1px] items-center border-l-2 pl-1 hidden group-hover:flex ">
//    <IconButton size="small">
//      <EditTwoTone className="text-[20px]" />
//    </IconButton>
//    <IconButton size="small">
//      <DeleteTwoTone className="text-[20px]" />
//    </IconButton>
//  </div>;
export default function ItemRole({ roles }) {
  const [role, setrole] = useState(null);
  return (
    <>
      {role && (
        <UpdateRole role={role} openDialog={role} setopenDialog={setrole} />
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead
            style={{ background: "orange" }}
            className="bg-accentué-normal"
          >
            <TableRow>
              <StyledTableCell>Intitulé et Description</StyledTableCell>

          
              <StyledTableCell>Membre</StyledTableCell>
              <StyledTableCell>Etudiant</StyledTableCell>
              <StyledTableCell>Rôle</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((row, i) => {
              return (
                <>
                  <StyledTableRow
                    onClick={() => setrole(row)}
                    key={i}
                    className="cursor-pointer group transition-all duration-300 hover:border-darker hover:text-secondaire-normal hover:border-l-[2px] hover:border-r-[2px]"
                  >
                    <StyledTableCell component="th" scope="row" className="">
                      <p className="text-lg font-semibold mb-1 font-corps_1">
                        {row.intitule}
                      </p>

                      <p className="opacity-70">{row.description}</p>
                    </StyledTableCell>

                    <StyledTableCell>
                      <div className="flex flex-wrap gap-2 items-center border-l-2 pl-1">
                        {row.membre.map((v, i) => (
                          <Chip
                            label={v}
                            key={i}
                            size="small"
                            className={`text-[10px] ${getColor(i)} font-light`}
                          />
                        ))}
                      </div>
                    </StyledTableCell>
                    <StyledTableCell>
                      <div className="flex flex-wrap gap-2 items-center border-l-2 pl-1">
                        {row.etudiant.map((v, i) => (
                          <Chip
                            label={v}
                            key={i}
                            size="small"
                            className={`text-[10px] ${getColor(i)} font-light`}
                          />
                        ))}
                      </div>
                    </StyledTableCell>
                    <StyledTableCell>
                      <div className="flex flex-wrap gap-2 items-center border-l-2 pl-1">
                        {row.role.map((v, i) => (
                          <Chip
                            label={v}
                            key={i}
                            size="small"
                            className={`text-[10px] ${getColor(i)} font-light`}
                          />
                        ))}
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

const UpdateRole = ({ openDialog, setopenDialog, role }) => {
  const [membre, setmembre] = useState(role.membre);
  const [etudiant, setetudiant] = useState(role.etudiant);
  const [rolep, setrolep] = useState(role.role);
  const [eta, seteta] = useState(role.etablissement);
  const [intitule, setintitule] = useState(role.intitule ?? "");
  const [description, setdescription] = useState(role.description ?? "");
  const [isLoading, setisLoading] = useState(false);
  const nav = useNavigate();
  const dis = useDispatch();
  const Submit = (e) => {
    e.preventDefault();
    setisLoading(true);
    axios
      .put(SERVER_URL + "/role/update/" + role._id, {
        membre,
        etudiant,
        etablissement: eta,
        role: rolep,
        intitule,
        description,
      })
      .then((v) => {
        dis(notifier({ message: "Modification réussie" }));
        nav(0);
      })
      .catch((v) =>
        dis(notifier({ message: "Echech de modification", type: "error" }))
      )
      .finally(() => {
        setisLoading(false);
        setopenDialog(null);
      });
  };
  const Delete = () => {
    setisLoading(true);
    axios
      .delete(SERVER_URL + "/role/delete/" + role._id)
      .then((v) => nav(0))
      .catch((v) => setopenDialog(null))
      .finally(() => {
        setisLoading(false);
        setopenDialog(null);
      });
  };
  return (
    <Dialog open={openDialog} onClose={() => setopenDialog(null)}>
      <form onSubmit={Submit}>
        <DialogTitle>
          <h3>Modifier le rôle</h3>
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
              value: rolep,
              onChange: (v) => {
                const temp = [];
                v.target.value.forEach((element) => {
                  temp.push(element);
                });
                setrolep(temp);
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
            <>
              <Button variant="outlined" color="error" onClick={() => Delete()}>
                supprimer
              </Button>

              <Button
                disableElevation
                type="submit"
                variant="contained"
                color="primary"
              >
                modifier
              </Button>
            </>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};
