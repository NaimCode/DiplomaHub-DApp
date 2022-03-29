import { Link } from "react-router-dom";
import LogoIcon from "/public/assets/logo.svg";

const Logo = () => {
  return (
    <Link to={"/"} className="p-2 group cursor-pointer">
      <img
        src={LogoIcon}
        alt=""
        className="h-[40px] duration-300 transition-all group-hover:h-[42px]"
      />
    </Link>
  );
};

export default Logo;
