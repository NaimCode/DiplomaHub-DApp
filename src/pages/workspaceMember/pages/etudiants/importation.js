/* eslint-disable react-hooks/exhaustive-deps */
import {
  AddTwoTone,
  DeleteTwoTone,
  FileDownloadDoneTwoTone,
  FileUploadTwoTone,
  UploadFileTwoTone,
} from "@mui/icons-material";
import {
  Divider,
  Button,
  Tooltip,
  CircularProgress,
  IconButton,
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

import { SERVER_URL } from "../../../../Data/serveur";
import { AddEtudiant } from "./addEtudiant";
import { notifier } from "../../../../redux/notifSlice";
import ImportDialog from "./importDialog";
import AddDoc from "./addDoc";
const Certification = () => {
  const [openDialog, setopenDialog] = useState(false);
  const [openDialogImport, setopenDialogImport] = useState(false);

  const user = useSelector((state) => state.user.data);
  let [etudiants, setetudiants] = useState(null);
  let [errr, seterrr] = useState(null);
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
      .get(SERVER_URL + "/mesEtudiants/getAll/1/" + user.etablissement_id._id)
      .then((v) => {
        etudiants = v.data;

        setetudiants(etudiants);
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
            <h2>Liste des étudiants</h2>
            <div className="flex flex-row gap-2 items-center">
              <Tooltip title="Effacer la liste">
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  className="my-2"
                  startIcon={<DeleteTwoTone />}
                  onClick={() => deleteAlletudiants()}
                >
                  Effacer
                </Button>
              </Tooltip>
              <Tooltip title="Importer les étudiants">
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  className="my-2"
                  startIcon={<UploadFileTwoTone />}
                  onClick={() => setopenDialogImport(true)}
                >
                  Importer
                </Button>
              </Tooltip>
              <Tooltip title="Ajouter un étudiant">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className="my-2"
                  startIcon={<AddTwoTone />}
                  onClick={() => setopenDialog(true)}
                >
                  Ajouter
                </Button>
              </Tooltip>
            </div>
          </div>
          <Divider />
          {etudiants ? (
            <ItemCertif
              setetudiants={setetudiants}
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

export default Certification;

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

export function ItemCertif({ etudiants, setetudiants, deleteEtudiant }) {
  const [openAssocier, setopenAssocier] = useState(false);
  const [data, setdata] = useState(etudiants[0]);

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
  const OpenAssociation = (e) => {
    setdata(e);
    setopenAssocier(true);
  };
  return (
    <>
      <AddDoc
        open={openAssocier}
        setopenAssocier={setopenAssocier}
        data={data}
        setMesEtudiants={setetudiants}
        mesEtudiants={etudiants}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead
            style={{ background: "orange" }}
            className="bg-accentué-normal"
          >
            <TableRow>
              <StyledTableCell>Nom</StyledTableCell>

              <StyledTableCell>Prenom</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
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
                    <StyledTableCell>{getDateTime(row.date)}</StyledTableCell>
                    <StyledTableCell align="right">
                      <div className="flex flex-row gap-1 justify-end">
                        <IconButton
                          onClick={() => deleteEtudiant(row)}
                          title="Supprimer"
                          className="opacity-0 group-hover:opacity-100 text-red-500"
                        >
                          <DeleteTwoTone />
                        </IconButton>
                        <Button
                          variant="outlined"
                          size="small"
                          style={{ fontSize: 12 }}
                          color="primary"
                          onClick={() => OpenAssociation(row)}
                          startIcon={<FileUploadTwoTone />}
                        >
                          Associer
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
