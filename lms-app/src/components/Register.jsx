import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const initialState = {
    name: "",
    mobileNumber: "",
    emailId: "",
    password: "",
  };

  const [user, setUser] = useState(initialState);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(user)
      .then((response) => {
        console.log(response.data);
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </label>
        <label>
          Mobile Number:
          <input
            type="number"
            value={user.mobileNumber}
            onChange={(e) => setUser({ ...user, mobileNumber: e.target.value })}
          />
        </label>
        <label>
          Email Id
          <input
            type="email"
            value={user.emailId}
            onChange={(e) => setUser({ ...user, emailId: e.target.value })}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </label>

        <input type="submit" value="Register" />
      </form>
    </>
  );
};

export default Register;
