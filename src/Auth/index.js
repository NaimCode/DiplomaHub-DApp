import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
  Card,
} from "@mui/material";
import { EmailOutlined, LockOutlined } from "@mui/icons-material";
import * as animationData from "/public/animations/login.json";
import Lottie from "react-lottie";
import Logo from "../Components/Logo";
const Auth = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="h-screen w-screen flex">
      <div className="grow flex flex-col items-center">
        <div className="h-full flex flex-col p-4 max-w-md">
          <div className="flex items-center h-16 ">
            <Logo />
          </div>
          <Box className="grow flex flex-col justify-center">
            <Card className="px-4 py-10">
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
                    value="member"
                    control={<Radio />}
                    label="Membre"
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
            </Card>
          </Box>
          <div className="grow"></div>
        </div>
      </div>
      <div className="h-full w-0 md:w-1/2 bg-primaire-normal border-l-2 shadow-md">
        <Lottie options={defaultOptions} />
      </div>
    </div>
  );
};

export default Auth;
