import { CircularProgress, List, TextField } from "@mui/material";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../../../Data/serveur";
import { notifier } from "../../../redux/notifSlice";

const Transaction = () => {
  const [diplomes, setdiplomes] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const dis = useDispatch();
  const etablissement = useSelector(
    (state) => state.user.data.etablissement_id
  );
  useEffect(() => {
    setisLoading(true);
    axios
      .get(SERVER_URL + "/diplome/getAll/" + etablissement._id)
      .then((res) => {
        console.log(res.data);
        setdiplomes([...res.data]);
      })
      .catch((err) =>
        dis(notifier({ message: "Erreur du serveur", type: "error" }))
      )
      .finally(() => setisLoading(false));
  }, [dis, etablissement._id]);
  return (
    <div>
      {isLoading ? (
        <div className="w-full h-[80vh] justify-center items-center flex">
          <CircularProgress size={40} />
        </div>
      ) : diplomes.length === 0 ? (
        <Empty />
      ) : (
        <List>
          {diplomes.map((d, i) => (
            <ItemTransaction item={d} index={i} />
          ))}
        </List>
      )}
    </div>
  );
};
export default Transaction;

const ItemTransaction = ({ item, index }) => {
  return (
    <div className="bg-white border-2 rounded-sm flex flex-row p-3 mb-3">
      <div className="flex-grow">
        <div cla></div>
        <TextField
          // inputProps={{ readOnly: true }}
          label="Intitulé"
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
          fullWidth
          value={item.intitule}
        />
        <TextField
          label="Hash"
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
          fullWidth
          style={{ marginTop: 10 }}
          value={item.hash}
        />
      </div>
      <div className="w-[300px] justify-center flex items-center">
        <QRCodeSVG value={item.hash} />
      </div>
    </div>
  );
};
const Empty = () => {
  return (
    <div className="w-full h-[80vh] justify-center items-center flex">
      <p className="opacity-70">
        Votre établissement n'a fait aucune transaction
      </p>
    </div>
  );
};
