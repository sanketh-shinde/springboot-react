import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const initialState = {
    name: "",
    mobileNumber: "",
    emailId: "",
    password: "",
    roles: "",
  };

  const [admin, setAdmin] = useState(initialState);
  const navigate = useNavigate();

  console.log(admin);

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(admin)
      .then((response) => {
        console.log(response.data);
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="register-form-container">
      <h2>Admin Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={admin.name}
            onChange={(e) => setAdmin({ ...admin, name: e.target.value })}
            required
          />
        </label>
        <label>
          Mobile Number:
          <input
            type="tel"
            value={admin.mobileNumber}
            onChange={(e) =>
              setAdmin({ ...admin, mobileNumber: e.target.value })
            }
            required
          />
        </label>
        <label>
          Email Id:
          <input
            type="email"
            value={admin.emailId}
            onChange={(e) => setAdmin({ ...admin, emailId: e.target.value })}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={admin.password}
            onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
            required
          />
        </label>
        <input
          type="text"
          value={(admin.roles = "ROLE_ADMIN")}
          onChange={(e) => setAdmin({ ...admin, roles: e.target.value })}
          hidden
        />
        <input type="submit" value="Register Admin" />
      </form>
    </div>
  );
};

export default AdminRegister;
