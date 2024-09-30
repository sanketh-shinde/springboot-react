import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

import "../styles/AdminRegistration.css";

const UserRegister = () => {
  const initialState = {
    name: "",
    mobileNumber: "",
    emailId: "",
    password: "",
    roles: "",
  };

  const [user, setUser] = useState(initialState);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(user)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="register-form-container">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Mobile Number:
            <input
              type="tel"
              value={user.mobileNumber}
              onChange={(e) =>
                setUser({ ...user, mobileNumber: e.target.value })
              }
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email Id:
            <input
              type="email"
              value={user.emailId}
              onChange={(e) => setUser({ ...user, emailId: e.target.value })}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
          </label>
        </div>
        <input
          type="text"
          value={(user.roles = "ROLE_USER")}
          onChange={(e) => setAdmin({ ...user, roles: e.target.value })}
          hidden
        />
        <input type="submit" value="Register User" />
      </form>
    </div>
  );
};

export default UserRegister;
