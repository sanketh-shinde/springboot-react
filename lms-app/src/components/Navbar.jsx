import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { user } from "../services/authService";

const Navbar = () => {
  const userDetasils = user();
  const navigate = useNavigate();

  return (
    <nav>
      <ul className="navbar-list">
        {userDetasils ? (
          <li className="navbar-item">
            <NavLink
              to={"/books"}
              className="navbar-link"
              activeclassname="active"
            >
              Books
            </NavLink>
          </li>
        ) : (
          <li className="navbar-item">
            <NavLink
              to={"/register"}
              className="navbar-link"
              activeclassname="active"
            >
              Register
            </NavLink>
          </li>
        )}
        {userDetasils && (
          <li className="navbar-item">
            <NavLink
              to={"/profile"}
              className="navbar-link"
              activeclassname="active"
            >
              Profile
            </NavLink>
          </li>
        )}
        {userDetasils ? (
          <li className="navbar-item">
            <button
              className="logout-btn"
              onClick={() => {
                localStorage.clear();
                return navigate("/login");
              }}
            >
              Logout
            </button>
          </li>
        ) : (
          <li className="navbar-item">
            <NavLink
              to={"/login"}
              className="navbar-link"
              activeclassname="active"
            >
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
