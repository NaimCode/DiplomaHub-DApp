import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import { EmailOutlined, LockOutlined } from "@mui/icons-material";
const Connexion = () => {
  return (
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
      </div>
    </div>
  );
};

export default Connexion;
