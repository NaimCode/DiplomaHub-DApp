import Helmet from "react-helmet";
import * as React from "react";
import * as animationData from "/public/animations/landing.json";
import * as certificate from "/public/animations/certificate.json";
import Lottie from "react-lottie";
import Navbar from "../Components/Navbar";
import Button from "@mui/material/Button";
import { motion, MotionConfig } from "framer-motion";
import { Link } from "react-router-dom";
import { SearchTwoTone, SchoolTwoTone } from "@mui/icons-material";
// import { useEffect } from "react";
// import { useSelector } from "react-redux";
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
      <Navbar delay={2 * 0.5} />
      <div className="h-screen w-screen flex relative">
        <MotionConfig transition={{ duration: 1, delay: 1 * 0.5 }}>
          <motion.div
            initial={{
              y: "-100%",
            }}
            animate={{
              y: "0%",
            }}
            className="w-[45%] flex transform flex-col justify-center p-10 -translate-x-[100px]"
          >
            <p className="text-3xl font-corps_1 font-bold py-4">
              DIPLÔMES, MICRO-CERTIFICATIONS ET ATTESTATION SUR LA{" "}
              <span className="text-secondaire-normal font-titre1">
                BLOCKCHAIN
              </span>
            </p>
            <p className="py-4 text-sm opacity-50">
              Donnez la chance à vos étudiants de faire valoir l'authenticité de
              leur réussite d'un simple clic : un gage de confiance pour toutes
              les étapes de la vie professionnelle. Les étudiants disposent à
              vie d'attestations en ligne, partageables sur tous supports. C'est
              la fin des demandes intempestives de vérification ou de duplicata.
            </p>
            <div className="flex flex-row gap-8 py-7">
              <Button
                variant="contained"
                color="primary"
                startIcon={<SchoolTwoTone />}
              >
                <Link to={"/inscription"}>Inscrire mon école</Link>
              </Button>
              <Button
                variant="outlined"
                color="primary"
                endIcon={<SearchTwoTone />}
              >
                <Link to={"/verification"}> Vérifier un diplôme</Link>
              </Button>
            </div>
          </motion.div>
        </MotionConfig>
        <MotionConfig transition={{ duration: 1 }}>
          <motion.div
            initial={{
              x: "100%",
            }}
            animate={{
              x: "0%",
            }}
            className="w-[55%] relative "
          >
            <Lottie options={defaultOptions} />
            <MotionConfig transition={{ duration: 1, delay: 3 * 0.5 }}>
              <motion.div
                initial={{
                  y: "100%",
                }}
                animate={{
                  y: "0%",
                }}
                className="absolute h-full w-full  top-0 flex justify-center items-center"
              >
                <Lottie options={defaultOptions1} height={404} width={"60vh"} />
              </motion.div>
            </MotionConfig>
          </motion.div>
        </MotionConfig>
      </div>
    </section>
  );
};

export default Home;
