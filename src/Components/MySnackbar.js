import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Fade from "@mui/material/Fade";
import Slide from "@mui/material/Slide";
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "@mui/material";
import { exitNotif } from "../redux/notifSlice";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function MySnackbar() {
  const notif = useSelector((state) => state.notif);
  const dispatch = useDispatch();
  const Close = () => {
    dispatch(exitNotif());
  };
  return (
    <Snackbar
      open={notif.display}
      autoHideDuration={5000}
      onClose={Close}
      TransitionComponent={SlideTransition}
    >
      <Alert
        onClose={Close}
        variant="filled"
        severity={notif.type ?? "success"}
      >
        {notif.message}
      </Alert>
    </Snackbar>
  );
}
