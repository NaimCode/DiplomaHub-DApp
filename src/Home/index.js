import Helmet from "react-helmet";
import * as React from "react";
import * as animationData from "/public/animations/landing.json";
import * as certificate from "/public/animations/certificate.json";
import Lottie from "react-lottie";
import Navbar from "../Components/Navbar";
import Button from "@mui/material/Button";
import { motion, MotionConfig } from "framer-motion";
import { NewReleases, SchoolTwoTone, SearchTwoTone } from "@mui/icons-material";
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
            className="w-[40%] flex flex-col justify-center p-10"
          >
            <h1 className="">
              Lorem Ipsum is simply dummy text of the printing
            </h1>
            <p className="py-4 text-sm text-opacity-60">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters,
            </p>
            <div className="flex flex-row gap-8 py-7">
              <Button
                variant="contained"
                color="primary"
                startIcon={<SchoolTwoTone />}
              >
                Créer une école
              </Button>
              <Button
                variant="outlined"
                color="primary"
                endIcon={<SearchTwoTone />}
              >
                Chercher un diplôme
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
            className="w-[60%] relative "
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
                className="absolute h-full  right-[50%] top-0 flex justify-center items-center cursor-default"
              >
                <Lottie options={defaultOptions1} height={304} width={404} />
              </motion.div>
            </MotionConfig>
          </motion.div>
        </MotionConfig>
      </div>
    </section>
  );
};

export default Home;
