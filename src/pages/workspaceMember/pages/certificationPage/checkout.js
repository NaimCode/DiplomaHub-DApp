import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { SERVER_URL } from "../../../../Data/serveur";
import { notifier } from "../../../../redux/notifSlice";
import useMetaMask from "../../../../web3/hooks";
import Button from "@mui/material/Button";
import { Alert, AlertTitle, Divider } from "@mui/material";

const Checkout = () => {
  const [etudiant, setetudiant] = useState();
  const [etablissement, setetablissement] = useState();
  const dis = useDispatch();
  const { connect, disconnect, isActive, account } = useMetaMask();
  const params = useParams();
  useEffect(() => {
    axios
      .get(SERVER_URL + "/mesEtudiants/get/" + params.id)
      .then((res) => {
        setetudiant(res.data._doc);
        setetablissement(res.data.etablissement);
      })
      .catch((err) =>
        dis(notifier({ message: "Erreur, veuillez réessayer", type: "error" }))
      );
    // console.log({
    //   connect,
    //   disconnect,
    //   isActive,
    //   account,
    // });
  }, []);

  return (
    <div>
      <Alert
        severity={isActive ? "success" : "error"}
        action={
          <Button
            color="inherit"
            size="small"
            onClick={isActive ? disconnect : connect}
          >
            {isActive ? "Déconnexion" : "Connexion"}
          </Button>
        }
      >
        <AlertTitle>
          {isActive ? `Compte actif` : "Non connecté à MetaMask"}
        </AlertTitle>
        {isActive && account}
      </Alert>
      <div className="my-3 p-3 bg-white">
        <div className="flex flex-row gap-2 justify-between">
          <h2>Détail de la transaction</h2>
          <div className="flex flex-row gap-2 items-center"></div>
        </div>
        <Divider />
      </div>
    </div>
  );
};

export default Checkout;
