import factorLogo from "../assets/factored-logo.svg";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="flex flex-row h-[55px] md:h-[100vh] md:flex-col justify-evenly md:content-evenly items-center shadow-nav">
      <img src={factorLogo} className="left-0 md:top-0 h-[42px] w-[36px]"></img>
      <Link className="text-blue-600 underline" to="/">
        Home
      </Link>
      <Link className="text-blue-600 underline" to="/task">
        Task
      </Link>
      <Link className="text-blue-600 underline" to="/add-event">
        New event
      </Link>
    </nav>
  );
};

export default NavBar;
