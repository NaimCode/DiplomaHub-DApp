import { Link } from "react-router-dom";
import LogoIcon from "/public/assets/logo.svg";

const Logo = () => {
  return (
    <Link
      to={"/"}
      className="p-2 group cursor-pointer flex flex-row gap-2 items-center text-xl font-bold font-corps_1"
    >
      <img src={LogoIcon} alt="" className="text-white h-[35px]" />
    </Link>
  );
};

const Brand = () => {
  return (
    <Link
      to={"/"}
      className="p-2 group cursor-pointer flex flex-row gap-2 items-center text-xl font-bold font-corps_1"
    >
      <img src={LogoIcon} alt="" className="text-white h-[35px]" />
      <span className="text-darker">
        Diploma<span className="text-primaire-normal">Hub</span>
      </span>
    </Link>
  );
};
export { Brand };
export default Logo;
