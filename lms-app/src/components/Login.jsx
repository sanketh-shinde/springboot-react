import { useState } from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import "../styles/Register.css";

const Login = () => {
  const initialState = {
    emailId: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "user/fetchUserRequest",
      payload: {
        ...formData,
      },
      navigate: () => navigate("/books"),
    });
  };

  return (
    <div className="role-selection-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email Id
          <input
            type="email"
            value={formData.emailId}
            onChange={(e) =>
              setFormData({ ...formData, emailId: e.target.value })
            }
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </label>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
