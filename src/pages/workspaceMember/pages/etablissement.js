import * as dataAnimation from "../../../../public/animations/neurone.json";
import MyLottie from "../../../Components/MyLottie";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { Doughnut, PolarArea } from "react-chartjs-2";
import * as dataAnimation2 from "../../../../public/animations/certificate.json";
import "@dotlottie/player-component";
import CountUp from "react-countup";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { AddAPhotoTwoTone } from "@mui/icons-material";
import {
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { SERVER_URL } from "../../../Data/serveur";
import axios from "axios";
import { avatarUrl } from "../../../Data/avatar";
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
const Etablissement = () => {
  const user = useSelector((state) => state.user.data);
  let [membres, setmembres] = useState(null);
  let [roles, setroles] = useState(null);
  let [diplomes, setdiplomes] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    getmembres();
  }, []);
  function getmembres() {
    setisLoading(true);
    axios
      .all([
        axios.get(SERVER_URL + "/membre/getAll/" + user.etablissement_id._id),
        axios.get(SERVER_URL + "/role/getAll/" + user.etablissement_id._id),
        axios.get(SERVER_URL + "/diplome/getAll/" + user.etablissement_id._id),
      ])
      .then(
        axios.spread((...responses) => {
          membres = responses[0].data;
          setmembres(membres);
          roles = responses[1].data;
          setroles(roles);
          diplomes = responses[2].data;
          setdiplomes(diplomes);
        })
      )
      .catch((errors) => {})
      .finally(() => setisLoading(false));
  }
  return (
    <div className="">
      <div className="w-full flex flex-row justify-around items-center">
        <div className="flex  flex-col justify-center items-center ">
          <div className="border-2 rounded-lg w-[200px] h-[200px] flex justify-center items-center">
            <AddAPhotoTwoTone />
          </div>
          <p className="max-w-[400px] text-2xl font-corps_1 font-bold">
            {user.etablissement_id.nom}
          </p>
          {user.etablissement_id.abrev && (
            <h3 className="max-w-[100px] -translate-y-3  text-secondaire-foncé">
              ({user.etablissement_id.abrev})
            </h3>
          )}
          <Button variant="outlined" color="primary" className=" ">
            Modifier mon logo
          </Button>
        </div>
        <div className="w-1/2">
          <MyLottie size={""} data={dataAnimation} />
        </div>
      </div>
      <div className="my-5  bg-white border-[1px] mx-5">
        {/* <div className="w-full bg-primaire-normal text-white px-3 py-2 text-center">
          <h3>Statistiques</h3>
        </div> */}

        <div className="flex flex-col lg:flex-row justify-evenly">
          <div className="flex justify-center items-center w-1/2">
            {!membres || !roles ? (
              <div className="h-[400px] flex justify-center items-center">
                <CircularProgress size={40} />
              </div>
            ) : (
              <ChartRole membres={membres} roles={roles} />
            )}
          </div>
          <MembreLastAdded tailwind={"w-1/2"} membres={membres} />
        </div>
      </div>
      <div className="my-5  bg-white border-[1px] mx-5">
        <div className="flex flex-col lg:flex-row justify-evenly">
          <div className="flex flex-col justify-center items-center w-1/2">
            <CountUp
              start={1000}
              end={diplomes ? diplomes.length : 100}
              delay={0}
            >
              {({ countUpRef }) => (
                <div className="text-5xl font-titre1 font-bold text-primaire-normal tracking-widest">
                  <span ref={countUpRef} />
                </div>
              )}
            </CountUp>
            <p className="max-w-[300px] text-sm text-center opacity-50">
              Diplômes/Certifications sur la blockchain
            </p>
          </div>
          <div className="flex justify-center items-center w-1/2">
            <MyLottie data={dataAnimation2} size={"h-[350px] -tran"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Etablissement;

const ChartRole = ({ membres, roles }) => {
  const getNbr = (role) => {
    let count = 0;
    for (let index = 0; index < membres.length; index++) {
      // console.log(membres[index].roles.map((e) => e._id).include(role._id));
      if (membres[index].roles.map((e) => e._id).includes(role._id)) count++;
    }
    return count;
  };
  const data = {
    labels: roles.map((e) => e.intitule),
    datasets: [
      {
        label: "Membres",
        data: roles.map((e) => getNbr(e)),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(200, 99, 132, 0.2)",
          "rgba(54, 12, 105, 0.2)",
          "rgba(55, 306, 186, 0.2)",
          "rgba(75, 192, 92, 0.2)",
          "rgba(53, 102, 255, 0.2)",
          "rgba(25, 159, 614, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(200, 99, 132, 1)",
          "rgba(54, 12, 105, 1)",
          "rgba(55, 306, 186, 1)",
          "rgba(75, 192, 92, 1)",
          "rgba(53, 102, 255, 1)",
          "rgba(25, 159, 614, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="w-[330px] py-3">
      <Doughnut data={data} />
    </div>
  );
};
const MembreLastAdded = ({ tailwind, membres }) => {
  return (
    <div className={tailwind}>
      {!membres ? (
        <div className="flex justify-center items-center h-[400px]">
          <CircularProgress size={40} />
        </div>
      ) : (
        <List className="flex flex-col">
          {membres.slice(0, 3).map((e, i) => (
            <ListItem key={i}>
              <dotlottie-player
                //  autoplay
                loop
                hover
                mode="normal"
                className="transition-all duration-300"
                src={e.avatar ? avatarUrl[e.avatar].src : avatarUrl[0].src}
                style={{ height: "100px", width: "100px" }}
              ></dotlottie-player>

              <div className="flex flex-col justify-center">
                <p>
                  {e.nom ?? "---"} {e.prenom ?? "---"}
                </p>
                <Divider />
                <p className="text-sm opacity-60">{e.email}</p>
              </div>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};
