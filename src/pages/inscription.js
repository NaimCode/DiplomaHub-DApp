import * as React from "react";
import { Brand } from "../Components/Logo";
import { TextField } from "@mui/material";
const Inscription = () => {
  return (
    <div className="flex flex-col items-center py-6 px-2 w-screen">
      <Brand />
      <div className="m-6 p-6 flex flex-col items-center w-full bg-white max-w-3xl shadow-md rounded-md">
        <h2>Demande d'inscription</h2>
        <p className="max-w-xl text-center text-black/50 py-3">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
        <div className="py-4 px-6 flex flex-col w-full gap-8">
          <div className="flex flex-row gap-4">
            <TextField
              type={"text"}
              fullWidth
              label="Abréviation"
              className="w-1/3"
            />
            <TextField type={"text"} fullWidth label="Nom complet" />
          </div>
          <div className="flex flex-row gap-4">
            <TextField type={"email"} fullWidth label="Email" />
            <TextField type={"tel"} fullWidth label="Tel" />
          </div>

          <TextField type={"text"} fullWidth label="Adresse" />
        </div>
      </div>
    </div>
  );
};

export default Inscription;
