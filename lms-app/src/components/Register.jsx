import { useState } from "react";

import AdminRegister from "./AdminRegister";
import UserRegister from "./UserRegister";

import "../styles/Register.css";

const Register = () => {
  const [role, setRole] = useState(null);

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
  };

  return (
    <div className="role-selection-container">
      <h1>Register</h1>
      <div className="button-container">
        <button
          className="role-button"
          onClick={() => handleRoleSelection("admin")}
        >
          Register as Admin
        </button>
        <button
          className="role-button"
          onClick={() => handleRoleSelection("user")}
        >
          Register as User
        </button>
      </div>

      {role === "admin" && <AdminRegister />}
      {role === "user" && <UserRegister />}
    </div>
  );
};

export default Register;
