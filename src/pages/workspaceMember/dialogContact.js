import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { SERVER_URL } from "../../Data/serveur";
import { useDispatch, useSelector } from "react-redux";
import { notifier } from "../../redux/notifSlice";
import { CircularProgress } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogContact() {
  const user = useSelector((state) => state.user.data);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [bug, setbug] = React.useState("");
  const [suggest, setsuggest] = React.useState("");
  const [modif, setmodif] = React.useState("");
  const [isLoading, setisLoading] = React.useState(false);
  const dis = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    setbug("");
    setsuggest("");
    setmodif("");
  }, [open]);
  const Send = (e) => {
    e.preventDefault();
    setisLoading(true);

    axios
      .post(SERVER_URL + `/auth/contact/${value}`, {
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        text: value === 0 ? bug : value === 1 ? suggest : modif,
      })
      .then((res) => {
        handleClose();
        dis(
          notifier({
            message: "Message envoyé, vous aurez la réponse sur votre email",
          })
        );
      })
      .catch((err) =>
        dis(
          notifier({
            message: "Erreur de l'envoi du message",
            type: "error",
          })
        )
      )
      .finally(() => setisLoading(false));
  };
  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        className="-translate-y-[30px]"
        onClick={handleClickOpen}
      >
        Contactez-nous
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={Send}>
          <DialogTitle>{"Contact"}</DialogTitle>
          <DialogContent dividers>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Signaler un bug" {...a11yProps(0)} />
                  <Tab label="Suggestion" {...a11yProps(1)} />
                  <Tab label="Demande de modification" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <TextField
                  label="Message"
                  variant="filled"
                  color="primary"
                  margin="none"
                  multiline
                  fullWidth
                  minRows={5}
                  maxRows={5}
                  value={bug}
                  onChange={(e) => setbug(e.target.value)}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <TextField
                  label="Message"
                  variant="filled"
                  color="primary"
                  margin="none"
                  multiline
                  fullWidth
                  minRows={5}
                  maxRows={5}
                  value={suggest}
                  onChange={(e) => setsuggest(e.target.value)}
                />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <TextField
                  label="Message"
                  variant="filled"
                  color="primary"
                  margin="none"
                  multiline
                  fullWidth
                  minRows={5}
                  maxRows={5}
                  value={modif}
                  onChange={(e) => setmodif(e.target.value)}
                />
              </TabPanel>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Annuler</Button>
            {isLoading ? (
              <Button variant="text" color="primary">
                <CircularProgress size={30} />
              </Button>
            ) : (
              <Button
                disabled={
                  value === 0
                    ? bug === ""
                    : value === 1
                    ? suggest === ""
                    : modif === ""
                }
                type="submit"
                variant="contained"
                color="primary"
              >
                Envoyer
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
