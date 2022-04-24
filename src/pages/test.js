// import React from "react";
// import { useDispatch } from "react-redux";
// import { notifier } from "../redux/notifSlice";
// import Button from "@mui/material/Button";
// import { TextField } from "@mui/material";
// import { useState } from "react";
// import { Buffer } from "buffer";
// import { create } from "ipfs-http-client";
// import { useMoralisFile } from "react-moralis";
// const client = create("https://ipfs.infura.io:5001/api/v0");
// const Test = () => {
//   const [file, setFile] = useState(null);
//   const [urlArr, setUrlArr] = useState([]);
//   const [info, setinfo] = useState();
//   const { error, isUploading, moralisFile, saveFile } = useMoralisFile();
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // try {
//     //   const created = await client.add(file);
//     //   setinfo(created);
//     //   console.log(created);
//     //   const url = `https://ipfs.infura.io/ipfs/${created.path}`;
//     //   setUrlArr((prev) => [...prev, url]);
//     // } catch (error) {
//     //   console.log(error.message);
//     // }
//   };
// const retrieveFile = (e) => {
//   // const data = e.target.files[0];
//   // const reader = new window.FileReader();
//   // reader.readAsArrayBuffer(data);

//   // reader.onloadend = () => {
//   //   console.log("Buffer data: ", Buffer(reader.result));
//   //   setFile(Buffer(reader.result));
//   // };

//     e.preventDefault();
//   };
//   const SubmitToMoralis = async (e) => {
//     e.preventDefault();
//     await saveFile("test.jpeg", file, { saveIPFS: true });
//     console.log(moralisFile);
//   };
//   return (
//     <div>
//       <h1>Upload File to IPFS</h1>
//       <form onSubmit={SubmitToMoralis}>
//         <TextField type={"file"} onChange={(e) => setFile(e.target.files[0])} />
//         <Button type="submit" variant="outlined" color="primary">
//           Notifier
//         </Button>
//       </form>

//       <h3>{isUploading && "uploading"}</h3>
//     </div>
//   );
// };

// export default Test;
// import React from "react";
// import * as XLSX from "xlsx";

// export default function App() {
//   const onChange = (e) => {
//     const [file] = e.target.files;
//     const reader = new FileReader();

//     reader.onload = (evt) => {
//       const bstr = evt.target.result;
//       const wb = XLSX.read(bstr, { type: "binary" });
//       const wsname = wb.SheetNames[0];
//       const ws = wb.Sheets[wsname];
//       const data = XLSX.utils.sheet_to_json(ws);
//       console.log(data);
//     };
//     reader.readAsBinaryString(file);
//   };
//   return (
//     <div>
//       <input type="file" onChange={onChange} />
//     </div>
//   );
// }

// var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
// var keys = Object.keys(xlData[0]);
// // console.log(
// //   xlData.map((e) => ({
// //     compte: parseInt(e[keys[0]]),
// //     titre: e[keys[1]],
// //     debit: e[keys[2]] == undefined || e[keys[2]] == null ? 0 : e[keys[2]],
// //     credit: e[keys[3]] == undefined || e[keys[3]] == null ? 0 : e[keys[3]],
// //   }))
// // );
// for (let i = 0; i < xlData.length; i++) {
//   if (xlData[i][keys[0]] == null) {
//     res.status(500).send({
//       error: "Erreur, votre fichier ne respecte pas notre charte",
//     });
//   }
// }

// res.status(200).send(
//   xlData.map((e) => ({
//     compte: parseInt(e[keys[0]]),
//     titre: e[keys[1]],
//     debit: e[keys[2]] == undefined || e[keys[2]] == null ? 0 : e[keys[2]],
//     credit: e[keys[3]] == undefined || e[keys[3]] == null ? 0 : e[keys[3]],
//   }))
// );
import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";

const Input = styled("input")({
  display: "none",
});

export default function UploadButtons() {
  return (
    <label htmlFor="contained-button-file">
      <Input accept=".csv" id="contained-button-file" type="file" />
      <Button variant="contained" component="span">
        Upload
      </Button>
    </label>
  );
}
