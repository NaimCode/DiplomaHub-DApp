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
      <div className="max-w-xl pr-4 px-3">
        <Lottie options={defaultOptions} />
      </div>
      <h3 className="font-corps_1">En developpement...</h3>
    </div>
  );
};

export default EnDeveloppement;
