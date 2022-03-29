import Logo from "../Components/Logo";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";

var data = [
  {
    titre: "Home",
    route: "/",
  },
  {
    titre: "Contact",
    route: "/contact",
  },
  {
    titre: "Aide",
    route: "/aide",
  },
];
const Navbar = () => {
  return (
    <AppBar position="fixed" color="transparent" elevation={0}>
      <Toolbar className="flex justify-between">
        <Logo />
        <div className="flex flex-row gap-7">
          {data.map((d) => (
            <Link
              to={d.route}
              key={data.indexOf(d)}
              className="font-corps_2 transform-gpu text-sm cursor-pointer hover:scale-110 transition-all duration-300"
            >
              {d.titre}
            </Link>
          ))}
        </div>

        <Button
          size="small"
          variant="outlined"
          color="primary"
          className="border-white text-white px-5 py-2"
        >
          Inscription
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
