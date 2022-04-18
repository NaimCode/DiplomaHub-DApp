import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { SERVER_URL } from "../../Data/serveur";

const SelectableTextField = ({ list, setlist, label }) => {
  const [choics, setchoics] = useState();
  const etablissement_id = useSelector(
    (state) => state.user.data.etablissement_id._id
  );
  useEffect(() => {
    axios
      .get(SERVER_URL + "/role/getAll/" + etablissement_id)
      .then((v) => {
        //  console.log(v.data);
        setchoics(v.data);
      })
      .catch((v) => console.log(v.response));
  }, []);

  return (
    <TextField
      select
      variant="filled"
      label={label}
      fullWidth
      //disabled={choics}
      SelectProps={{
        multiple: true,
        value: list,
        onChange: (v) => {
          const temp = [];
          v.target.value.forEach((element) => {
            temp.push(element);
          });
          setlist(temp);
        },
      }}
    >
      {(choics ?? []).map((v, i) => (
        <MenuItem key={i} value={v}>
          {v.intitule}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectableTextField;
