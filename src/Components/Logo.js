import LogoIcon from "/public/assets/logo.svg";

const Logo = () => {
  return (
    <div className="p-2 group cursor-pointer">
      <img
        src={LogoIcon}
        alt=""
        className="h-[40px] duration-300 transition-all group-hover:h-[42px]"
      />
    </div>
  );
};

export default Logo;
