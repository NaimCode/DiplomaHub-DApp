import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Alert, Chip, Collapse, Divider, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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
export default function ItemRole({ rows, roles }) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead
            style={{ background: "orange" }}
            className="bg-accentué-normal"
          >
            <TableRow>
              <StyledTableCell>Intitulé et Description</StyledTableCell>

              <StyledTableCell>Etablissement</StyledTableCell>
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
                    key={i}
                    className=" transition-all duration-300 hover:border-black hover:text-secondaire-normal hover:border-l-[10px] hover:border-r-[10px]"
                  >
                    <StyledTableCell component="th" scope="row" className="">
                      <p className="text-lg font-semibold mb-1 font-corps_1">
                        {" "}
                        {row.intitule}
                      </p>

                      <p className="opacity-70">{row.description}</p>
                    </StyledTableCell>

                    <StyledTableCell>
                      <div className="flex flex-wrap gap-2 items-center border-l-2 pl-1">
                        {row.etablissement.map((v, i) => (
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

export const ItemRoleMini = ({ roles }) => {
  console.log(roles);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead
            style={{ background: "orange" }}
            className="bg-accentué-normal"
          >
            <TableRow>
              <StyledTableCell>Intitulé et Description</StyledTableCell>

              <StyledTableCell>Etablissement</StyledTableCell>
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
                    key={i}
                    className=" transition-all duration-300 hover:border-black hover:text-secondaire-normal hover:border-l-[10px] hover:border-r-[10px]"
                  >
                    <StyledTableCell component="th" scope="row" className="">
                      <p className="text-lg font-semibold mb-1 font-corps_1">
                        {" "}
                        {row.intitule}
                      </p>

                      <p className="opacity-70">{row.description}</p>
                    </StyledTableCell>

                    <StyledTableCell>
                      <div className="flex flex-wrap gap-2 items-center border-l-2 pl-1">
                        {row.etablissement.map((v, i) => (
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
};
