import * as animationData from "/public/animations/login.json";
import Lottie from "react-lottie";
import Logo from "../Components/Logo";
import { EmailOutlined, LockOutlined } from "@mui/icons-material";
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
const Auth = () => {
  return (
    <div className="h-screen w-screen flex">
      <div className="w-1/2 flex flex-col items-center">
        <div className="h-full flex flex-col p-4 max-w-md">
          <div className="flex items-center h-16 ">
            <Logo />
          </div>
          <div className="grow flex flex-col justify-center">
            <div className="px-4 py-10">
              <p className="text-accent">Content de vous revoir</p>
              <h1 className="titre1">Se connecter à votre espace</h1>
              <hr className="my-5" />

              <div className="py-5">
                <TextField
                  fullWidth
                  label="Email"
                  InputProps={{
                    endAdornment: <EmailOutlined />,
                  }}
                />
                <TextField
                  type={"password"}
                  className="my-4"
                  fullWidth
                  label="Mot de passe"
                  InputProps={{
                    endAdornment: <LockOutlined />,
                  }}
                />
                <RadioGroup
                  className="flex flex-row gap-3 justify-between"
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="etudiant"
                >
                  <FormControlLabel
                    value="etudiant"
                    control={<Radio />}
                    label="Etudiant"
                  />
                  <FormControlLabel
                    value="etablissement"
                    control={<Radio />}
                    label="Etablissement"
                  />
                </RadioGroup>
              </div>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className="font-corps_1 mt-2 py-3"
              >
                Connexion
              </Button>
            </div>
          </div>

          <div className="grow"></div>
        </div>
      </div>

      <Rightside />
    </div>
  );
};

export default Auth;

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
    <div className="h-full w-1/2 hidden md:block  bg-primaire-normal border-l-2 shadow-md">
      <Lottie options={defaultOptions} />
    </div>
  );
};
