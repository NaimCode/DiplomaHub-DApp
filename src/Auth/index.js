import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import { EmailOutlined, LockOutlined } from "@mui/icons-material";
import * as animationData from "/public/animations/login.json";
import Lottie from "react-lottie";
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
      <div className="h-full grow flex flex-col justify-center items-center">
        <div className="p-3 w-2/3">
          <p>Bienvenue sur</p>
          <h1>Certification Enligne</h1>
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
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className="font-corps_1 my-2 py-3"
          >
            Connexion
          </Button>
        </div>
      </div>
      <div className="h-full w-0 lg:w-1/2 bg-primaire-normal border-l-2 border-gray-500">
        <Lottie options={defaultOptions} />
      </div>
    </div>
  );
};

export default Auth;
