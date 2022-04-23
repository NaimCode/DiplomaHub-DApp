import React from "react";
import { useDispatch } from "react-redux";
import { notifier } from "../redux/notifSlice";
import Button from "@mui/material/Button";

const Test = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <div>Test</div>
      <Button
        onClick={() =>
          dispatch(notifier({ message: "Notifiaction", type: "warning" }))
        }
        variant="outlined"
        color="primary"
      >
        Notifier
      </Button>
    </div>
  );
};

export default Test;
