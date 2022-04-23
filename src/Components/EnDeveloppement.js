import Lottie from "react-lottie";
import * as animationData from "/public/animations/developing.json";
const EnDeveloppement = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="w-full md:w-[50%] pr-4 px-3">
        <Lottie options={defaultOptions} width="100%" />
      </div>
      <h3 className="font-corps_1">Coucou</h3>
    </div>
  );
};

export const EnDeveloppementMini = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full md:w-[50%] pr-4 px-3">
        <Lottie options={defaultOptions} width="100%" />
      </div>
      <h3 className="font-corps_1">En developpement...</h3>
    </div>
  );
};

export default EnDeveloppement;
