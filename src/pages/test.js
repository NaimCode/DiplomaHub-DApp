import React from "react";
import { useDispatch } from "react-redux";
import { notifier } from "../redux/notifSlice";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useState } from "react";
import { Buffer } from "buffer";
import { create } from "ipfs-http-client";
import { useMoralisFile } from "react-moralis";
const client = create("https://ipfs.infura.io:5001/api/v0");
const Test = () => {
  const [file, setFile] = useState(null);
  const [urlArr, setUrlArr] = useState([]);
  const [info, setinfo] = useState();
  const { error, isUploading, moralisFile, saveFile } = useMoralisFile();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const created = await client.add(file);
    //   setinfo(created);
    //   console.log(created);
    //   const url = `https://ipfs.infura.io/ipfs/${created.path}`;
    //   setUrlArr((prev) => [...prev, url]);
    // } catch (error) {
    //   console.log(error.message);
    // }
  };
  const retrieveFile = (e) => {
    // const data = e.target.files[0];
    // const reader = new window.FileReader();
    // reader.readAsArrayBuffer(data);

    // reader.onloadend = () => {
    //   console.log("Buffer data: ", Buffer(reader.result));
    //   setFile(Buffer(reader.result));
    // };

    e.preventDefault();
  };
  const SubmitToMoralis = async (e) => {
    e.preventDefault();
    await saveFile("test.jpeg", file, { saveIPFS: true });
    console.log(moralisFile);
  };
  return (
    <div>
      <h1>Upload File to IPFS</h1>
      <form onSubmit={SubmitToMoralis}>
        <TextField type={"file"} onChange={(e) => setFile(e.target.files[0])} />
        <Button type="submit" variant="outlined" color="primary">
          Notifier
        </Button>
      </form>

      <h3>{isUploading && "uploading"}</h3>
    </div>
  );
};

export default Test;
