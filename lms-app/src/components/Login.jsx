import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const initialState = {
    emailId: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(formData)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data);
        navigate("/books");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Email Id
          <input
            type="email"
            value={formData.emailId}
            onChange={(e) =>
              setFormData({ ...formData, emailId: e.target.value })
            }
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
          />
        </label>

        <input type="submit" value="Login" />
      </form>
    </>
  );
};

export default Login;
