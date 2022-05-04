import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  CERTIFICATION_SMART_CONTRACT_ADDRESS,
  IPFS_NODE,
  SERVER_URL,
} from "../../../../Data/serveur";
import { notifier } from "../../../../redux/notifSlice";
import useMetaMask from "../../../../web3/hooks";
import ABI from "../../../../../Truffle/build/contracts/Certification.json";

import Button from "@mui/material/Button";
import { ethers } from "ethers";
import {
  Alert,
  AlertTitle,
  Backdrop,
  CircularProgress,
  Divider,
  TextField,
  Tooltip,
} from "@mui/material";
import * as animationData from "../../../../../public/animations/lf30_editor_czhd4lar.json";
import MyLottie from "../../../../Components/MyLottie";
const Checkout = () => {
  const [etudiant, setetudiant] = useState();
  const [etablissement, setetablissement] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [loadingWeb3, setloadingWeb3] = useState(false);
  const dis = useDispatch();
  const { connect, disconnect, isActive, account } = useMetaMask();
  const params = useParams();
  const nav = useNavigate();
  useEffect(() => {
    setisLoading(true);
    axios
      .get(SERVER_URL + "/mesEtudiants/get/" + params.id)
      .then((res) => {
        setetudiant(res.data._doc);
        setetablissement(res.data.etablissement);

        setisLoading(false);
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
  const intoBlockchain = async () => {
    setloadingWeb3(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const certifSmartContract = new ethers.Contract(
      CERTIFICATION_SMART_CONTRACT_ADDRESS,
      ABI.abi,
      provider
    );
    const signer = provider.getSigner();
    const contractSigner = certifSmartContract.connect(signer);
    let transactionHash;
    try {
      transactionHash = await contractSigner.NouveauDiplome(
        etudiant.intitule,
        etablissement.nom,
        etablissement._id,
        etudiant.hash,
        IPFS_NODE + etudiant.hash,
        etudiant.nom,
        etudiant.prenom,
        etudiant._id
      );
    } catch (error) {
      dis(notifier({ message: "Une erreur est survenue", type: "error" }));
    }

    if (transactionHash) {
      const data = {
        nom: etudiant.nom,
        prenom: etudiant.prenom,
        email: etudiant.email,
        intitule: etudiant.intitule,
        etudiant: etudiant._id,
        doc: IPFS_NODE + etudiant.hash,
        etablissement: etablissement._id,
        nomEtablissement: etablissement.nom,
        hash: transactionHash.hash,
        chainId: transactionHash.chainId,
        blockHash: transactionHash.blockHash,

        blockNumber: transactionHash.blockNumber,
      };
      axios
        .post(SERVER_URL + "/certification", data)
        .then((res) => {
          dis(
            notifier({
              message: "Certification réussie ",
            })
          );
          nav("/transaction/envoye/" + res.data.hash, { replace: true });
        })
        .catch((err) =>
          dis(notifier({ message: "Problème rencontré", type: "error" }))
        )
        .finally(() => setloadingWeb3(false));
    } else setloadingWeb3(false);
  };
  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center py-10">
          <CircularProgress />
        </div>
      ) : (
        <>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loadingWeb3}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
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
          <div className="w-full flex">
            <div className="flex-grow my-3 p-3 bg-white ">
              <div className="flex flex-row gap-2 justify-between">
                <h2>Détail de la transaction</h2>
                <div className="flex flex-row gap-2 items-center">
                  <Tooltip title="Effacer la liste">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      disabled={!isActive}
                      className="my-2"
                      onClick={intoBlockchain}
                    >
                      Confirmer
                    </Button>
                  </Tooltip>
                </div>
              </div>

              <Divider />
              <div className="py-3">
                <div className="flex flex-row  items-center">
                  <div className="gap-3 flex flex-col w-full">
                    <div className="flex flex-row gap-3">
                      <TextField
                        disabled
                        fullWidth
                        label="Nom"
                        variant="outlined"
                        value={etudiant?.nom}
                      />
                      <TextField
                        disabled
                        fullWidth
                        label="Prénom"
                        variant="outlined"
                        value={etudiant?.prenom}
                      />
                    </div>
                    <TextField
                      disabled
                      fullWidth
                      label="Intitulé"
                      variant="outlined"
                      value={etudiant?.intitule}
                    />
                    <TextField
                      disabled
                      fullWidth
                      label="Établissement"
                      variant="outlined"
                      value={etablissement?.nom}
                    />
                  </div>
                </div>

                <div className="max-h-[400px] flex justify-center pt-2">
                  <img
                    src={IPFS_NODE + etudiant?.hash}
                    alt="document"
                    style={{
                      objectFit: "contain",

                      maxHeight: "400px",
                    }}
                  />
                </div>
              </div>
            </div>
            <Animation />
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
const Animation = () => {
  return (
    <div className="w-1/2 flex justify-center">
      <MyLottie data={animationData} />
    </div>
  );
};
