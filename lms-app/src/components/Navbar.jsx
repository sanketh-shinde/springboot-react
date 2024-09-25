import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
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
            to={"/login"}
            className="navbar-link"
            activeclassname="active"
          >
            Login
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
      </ul>
    </nav>
  );
};

export default Navbar;
