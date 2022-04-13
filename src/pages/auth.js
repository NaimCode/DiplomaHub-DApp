import * as animationData from "/public/animations/login.json";
import Lottie from "react-lottie";
import Logo from "../Components/Logo";
import axios from "axios";
import { EmailOutlined, LockOutlined } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { connexion, deconnexion } from "../redux/userSlice";
import {
  TextField,
  InputLabel,
  Collapse,
  FormControl,
  Select,
  Button,
  MenuItem,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { SERVER_URL } from "../Data/serveur";
const Auth = () => {
  const [isLaoding, setloading] = useState(false);
  const [error, seterror] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [isMember, setisMember] = useState();
  const user_id = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  const Connexion = (event) => {
    event.preventDefault();
    setloading(true);
    axios
      .post(SERVER_URL + "/auth", {
        email,
        password,
        isMember,
      })
      .then((v) =>
        dispatch(
          connexion({ id: v.data._id, email: v.data.email, isMember: true })
        )
      )
      .catch((v) => seterror(v.response.data.error))
      .finally(() => setloading(false));
  };
  return (
    <div className="h-screen w-screen flex">
      <div className="w-1/2 flex flex-col items-center">
        <div className="h-full flex flex-col p-4 max-w-md">
          <div className="flex items-center h-16 ">
            <Logo />
          </div>
          <form
            onSubmit={Connexion}
            className="grow flex flex-col justify-center"
          >
            <div className="px-4 py-10">
              <p className="text-accent">Content de vous revoir</p>
              <h1 className="titre1">Se connecter à votre espace</h1>
              <hr className="my-5" />

              <div className="py-5">
                <TextField
                  fullWidth
                  value={email}
                  onChange={(v) => setemail(v.target.value)}
                  label="Email"
                  InputProps={{
                    endAdornment: <EmailOutlined />,
                  }}
                />
                <TextField
                  type={"password"}
                  className="my-4"
                  fullWidth
                  value={password}
                  onChange={(v) => setpassword(v.target.value)}
                  label="Mot de passe"
                  InputProps={{
                    endAdornment: <LockOutlined />,
                  }}
                />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-standard-label">
                    Je suis
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={isMember}
                    onChange={(v) => setisMember(v.target.value)}
                    label="Je suis"
                  >
                    <MenuItem value={false}>Etudiant</MenuItem>
                    <MenuItem value={true}>Etablissement ou Member</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <Button
                disabled={isLaoding}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="font-corps_1 mt-2 py-3"
              >
                {isLaoding ? "Traitement" : "Connexion"}
              </Button>
              <div className="py-3"></div>
              <Collapse in={user_id}>
                <Alert
                  severity="error"
                  onClose={() => {
                    dispatch(deconnexion());
                  }}
                >
                  {user_id}
                </Alert>
              </Collapse>
              <Collapse in={error !== undefined}>
                <Alert
                  severity="error"
                  onClose={() => {
                    seterror(undefined);
                  }}
                >
                  {error}
                </Alert>
              </Collapse>
            </div>
          </form>

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
