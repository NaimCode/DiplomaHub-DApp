import React from "react";
import Lottie from "react-lottie";
const MyLottie = ({ data, size }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: data,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className={size}>
      <Lottie options={defaultOptions} />
    </div>
  );
};

export default MyLottie;
