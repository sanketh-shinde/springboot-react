import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import { user } from "../services/authService";

const Navbar = () => {
  const userDetasils = user();

  return (
    <nav>
      <ul className="navbar-list">
        <li className="navbar-item">
          <NavLink
            to={"/register"}
            className="navbar-link"
            activeclassname="active"
          >
            Register
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink
            to={"/profile"}
            className="navbar-link"
            activeclassname="active"
          >
            Profile
          </NavLink>
        </li>

        <li className="navbar-item">
          <NavLink
            to={"/login"}
            className="navbar-link"
            activeclassname="active"
          >
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
