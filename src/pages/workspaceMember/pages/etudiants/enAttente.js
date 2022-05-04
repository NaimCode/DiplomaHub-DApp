/* eslint-disable react-hooks/exhaustive-deps */
import {
  AddTwoTone,
  Delete,
  DeleteTwoTone,
  FileDownloadDoneTwoTone,
  FileUploadTwoTone,
  UploadFileTwoTone,
  Visibility,
} from "@mui/icons-material";
import { GiCrossedChains } from "react-icons/gi";
import {
  Divider,
  Button,
  Tooltip,
  CircularProgress,
  IconButton,
  Link,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Chip } from "@mui/material";

import { IPFS_NODE, SERVER_URL } from "../../../../Data/serveur";
import { AddEtudiant } from "./addEtudiant";
import { notifier } from "../../../../redux/notifSlice";
import ImportDialog from "./importDialog";
import { useNavigate } from "react-router";
const EnAttente = () => {
  const [openDialog, setopenDialog] = useState(false);
  const [openDialogImport, setopenDialogImport] = useState(false);
  const user = useSelector((state) => state.user.data);
  let [etudiants, setetudiants] = useState(null);

  const [isLoading, setisLoading] = useState(false);

  const dis = useDispatch();
  const Close = () => {
    setopenDialog(false);
  };
  useEffect(() => {
    getetudiants();
  }, []);
  function getetudiants() {
    setisLoading(true);

    axios
      .get(SERVER_URL + "/mesEtudiants/getAll/2/" + user.etablissement_id._id)
      .then((v) => {
        setetudiants(v.data);
      })
      .catch((v) => console.log(v.response))
      .finally(() => setisLoading(false));
  }
  function deleteAlletudiants() {
    setisLoading(true);

    axios
      .delete(
        SERVER_URL + "/mesEtudiants/deleteAll/" + user.etablissement_id._id
      )
      .then((v) => {
        setetudiants([]);
        dis(
          notifier({
            message: "Effacement de la liste",
          })
        );
      })
      .catch((v) =>
        dis(
          notifier({
            message: "Impossible d'effacer",
            type: "error",
          })
        )
      )
      .finally(() => setisLoading(false));
  }
  const deleteEtudiant = (e) => {
    axios
      .delete(SERVER_URL + "/mesEtudiants/delete/" + e._id)
      .then((v) => {
        const temp = etudiants.filter((item) => item._id !== e._id);
        setetudiants(temp);
        dis(
          notifier({
            message: "Suppression d'un étudiant",
          })
        );
      })
      .catch((v) =>
        dis(
          notifier({
            message: "Impossible de supprimer",
            type: "error",
          })
        )
      )
      .finally(() => setisLoading(false));
  };
  return (
    <div className="py-8 px-4 bg-white border-[1px]">
      {isLoading ? (
        <div className="flex items-center justify-center py-10">
          <CircularProgress />
        </div>
      ) : (
        <>
          <AddEtudiant
            open={openDialog}
            handleClose={Close}
            etudiants={etudiants}
            setetudiants={setetudiants}
          />
          <ImportDialog
            open={openDialogImport}
            setOpen={setopenDialogImport}
            mesEtudiants={etudiants}
            setmesEtudiants={setetudiants}
          />
          <div className="flex flex-row gap-2 justify-between">
            <h2>Liste en attente de certification</h2>
            <div className="flex flex-row gap-2 items-center"></div>
          </div>
          <Divider />
          {etudiants ? (
            <ItemCertif
              etudiants={etudiants.reverse()}
              deleteEtudiant={deleteEtudiant}
            />
          ) : (
            <p className="pt-4 opacity-30">Vous n'avez aucun rôle encore</p>
          )}
        </>
      )}
    </div>
  );
};

export default EnAttente;

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

function ItemCertif({ etudiants, deleteEtudiant }) {
  const nav = useNavigate();
  const getDateTime = (t) => {
    const today = new Date(t);
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    // var time =
    //   today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date;
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="customized table" className="">
          <TableHead
            style={{ background: "orange" }}
            className="bg-accentué-normal"
          >
            <TableRow>
              <StyledTableCell>Nom</StyledTableCell>

              <StyledTableCell>Prenom</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Intitulé</StyledTableCell>
              <StyledTableCell>Diplôme</StyledTableCell>

              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {etudiants.map((row, i) => {
              return (
                <>
                  <StyledTableRow
                    key={i}
                    className="group transition-all duration-300 hover:border-darker hover:text-secondaire-normal hover:border-l-[2px] hover:border-r-[2px]"
                  >
                    <StyledTableCell component="th" scope="row" className="">
                      <p className=" font-semibold mb-1 font-corps_1 uppercase">
                        {row.nom}
                      </p>
                    </StyledTableCell>

                    <StyledTableCell>
                      <p className="">{row.prenom}</p>
                    </StyledTableCell>

                    <StyledTableCell>
                      <p className="opacity-70 underline underline-offset-2">
                        {row.email}
                      </p>
                    </StyledTableCell>
                    <StyledTableCell>{row?.intitule}</StyledTableCell>
                    <StyledTableCell>
                      <Link to={""}>
                        <a
                          href={`${IPFS_NODE + row.hash}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {" "}
                          voir diplôme
                        </a>
                      </Link>
                    </StyledTableCell>

                    <StyledTableCell align="right">
                      <div className="flex flex-row gap-1 justify-end">
                        <IconButton
                          title="Voir le diplôme"
                          onClick={() => deleteEtudiant(row)}
                          className="opacity-0 group-hover:opacity-100 text-red-500"
                        >
                          <DeleteTwoTone />
                        </IconButton>
                        <Button
                          variant="outlined"
                          size="small"
                          style={{ fontSize: 12 }}
                          color="secondary"
                          onClick={() =>
                            nav("/workspace/certification/" + row._id)
                          }
                          startIcon={<GiCrossedChains />}
                        >
                          certifier
                        </Button>
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
