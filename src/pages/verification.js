import * as animationData from "/public/animations/verification.json";
import * as qrAnimation from "/public/animations/qr.json";
import Lottie from "react-lottie";
import Logo, { Brand } from "../Components/Logo";
import axios from "axios";
import { CodeTwoTone, EmailOutlined, PhotoCamera } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { TextField, Button, Collapse, CircularProgress } from "@mui/material";
import { useState } from "react";
import { SERVER_URL } from "../Data/serveur";

import { QrReader } from "react-qr-reader";
import { notifier } from "../redux/notifSlice";
import DialogDiplome from "./dialogDiplome";

const Verification = () => {
  const [isLaoding, setloading] = useState(false);
  const dispatch = useDispatch();
  const [hash, sethash] = useState();
  const [diplome, setdiplome] = useState(null);
  const Submit = (event) => {
    event.preventDefault();
    setloading(true);
    axios
      .get(SERVER_URL + "/certification/" + hash)
      .then((res) => {
        console.log(res.data);
        dispatch(notifier({ message: "Diplome existe" }));
        setdiplome(res.data);
      })
      .catch((err) =>
        dispatch(notifier({ message: "Diplôme introuvable", type: "error" }))
      )
      .finally(() => setloading(false));
  };
  return (
    <>
      <DialogDiplome open={diplome} setOpen={setdiplome} />
      <div className="h-screen w-screen flex">
        <Rightside />
        <div className="w-1/2 flex flex-col items-center">
          <div className="h-full flex flex-col p-4 max-w-md">
            <div className="flex items-center h-16 ">
              <Brand />
            </div>
            <form
              onSubmit={Submit}
              className="grow flex flex-col justify-center"
            >
              <div className="px-4 py-10">
                <p className="text-accent">Bienvenue sur DiplomaHub</p>
                <h1 className="titre1">
                  Veuillez saisir le hash ou scanner le code QR
                </h1>
                <hr className="my-5" />

                <div className="py-5">
                  <TextField
                    fullWidth
                    value={hash}
                    placeholder="Hash"
                    onChange={(v) => sethash(v.target.value)}
                  />
                  <Scan hash={hash} sethash={sethash} />
                </div>
                {isLaoding ? (
                  <Button fullWidth variant="text" color="primary">
                    <CircularProgress size={30} />
                  </Button>
                ) : (
                  <Button
                    disabled={!hash}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="font-corps_1 "
                  >
                    {"Lancer la vérification"}
                  </Button>
                )}
                <div className="py-3"></div>
              </div>
            </form>

            <div className="grow"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Verification;

const Rightside = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className=" h-full w-1/2 hidden md:flex bg-primaire-normal border-l-2 shadow-md  justify-center items-center">
      <div className="w-1/2">
        <Lottie options={defaultOptions} />
      </div>
    </div>
  );
};

const Scan = ({ sethash, hash }) => {
  const [actif, setactif] = useState(false);
  const dispatch = useDispatch();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: qrAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="w-full flex flex-col justify-center items-center py-3">
      {actif && (
        <div className="relative  w-[60%]">
          <div className="absolute top-0 left-0 z-10">
            <Lottie options={defaultOptions} />
          </div>
          <div>
            <QrReader
              constraints={{
                facingMode: "user",
              }}
              onResult={(result, error) => {
                if (!!result) {
                  console.log(result);
                  sethash(result?.text);
                  dispatch(notifier({ message: "Scan réussi" }));
                }
              }}
              style={{ width: "100%" }}
            />
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <Button
          variant="text"
          color="primary"
          startIcon={<PhotoCamera />}
          onClick={() => setactif(!actif)}
        >
          {actif ? "Désactiver" : "Activer"}
        </Button>
      </div>
    </div>
  );
};
