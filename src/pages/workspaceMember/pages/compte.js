import CardMedia from "@mui/material/CardMedia";
import { TextField } from "@mui/material";
import { useState } from "react";
const Compte = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <span className="text-sm font-corps_1 text-black/40 mb-4 uppercase">
        Aperçu de mon compte
      </span>
      <div className="w-full max-w-3xl h-[400px]  rounded-sm">
        <div className="flex flex-row gap-5">
          <TextField label="Nom" variant="filled" fullWidth />
          <TextField
            inputProps={{ readOnly: true }}
            label="Prénom"
            variant="filled"
            fullWidth
          />
        </div>
      </div>
      <div className="w-full max-w-3xl"></div>
    </div>
  );
};

export default Compte;
