import * as animationData from "/public/animations/login.json";
import Lottie from "react-lottie";
import Logo from "../components/Logo";
import { Route, Routes } from "react-router-dom";
import Connexion from "./Connexion";
import InscrireEcole from "./InscrireEcole";

const Auth = () => {
  return (
    <div className="h-screen w-screen flex">
      <div className="grow flex flex-col items-center">
        <div className="h-full flex flex-col p-4 max-w-md">
          <div className="flex items-center h-16 ">
            <Logo />
          </div>

          <Routes>
            <Route path="/connexion">
              <Connexion />
            </Route>
            <Route path="/inscrireEcole" element={<InscrireEcole />} />
          </Routes>

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
    <div className="h-full grow hidden md:block  bg-primaire-normal border-l-2 shadow-md">
      <Lottie options={defaultOptions} />
    </div>
  );
};
