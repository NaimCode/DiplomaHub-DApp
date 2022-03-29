import Helmet from "react-helmet";
import * as React from "react";
import * as animationData from "/public/animations/landing.json";
import * as certificate from "/public/animations/certificate.json";
import Lottie from "react-lottie";
import Navbar from "../Components/Navbar";

const Home = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: certificate,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <section>
      <Helmet>
        <title>Home | Certification</title>
        <meta
          name="description"
          content="Bienvenue sur la plateforme de certification numérique"
        />
      </Helmet>
      <Navbar />
      <div className="h-screen w-screen flex relative">
        <div className="w-[30%]"></div>
        <div className="w-[70%] relative">
          <Lottie options={defaultOptions} />
          <div className="absolute h-full  right-[20%] top-0 flex justify-center items-center">
            <Lottie options={defaultOptions1} height={304} width={404} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
