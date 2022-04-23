import React from "react";
import EnDeveloppement from "../Components/EnDeveloppement";
import * as dataAnimation from "../../public/animations/404.json";
import MyLottie from "../Components/MyLottie";
const Page404 = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-white h-screen">
      <MyLottie data={dataAnimation} size={"h-[60%]"} />
      <h3 className="-translate-y-10">Page introuvable</h3>
    </div>
  );
};

export default Page404;
