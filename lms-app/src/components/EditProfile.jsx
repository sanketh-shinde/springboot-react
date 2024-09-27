import { useEffect, useState } from "react";
import { user } from "../services/authService";

import { updateUser } from "../services/userService";

import "../styles/Profile.css";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const initialState = user();

  const [localUser, setLocalUser] = useState(initialState.userDTO);

  useEffect(() => {
    const userDetails = initialState.userDTO;
    console.log("local", localUser);

    if (userDetails) {
      setLocalUser((prevUser) => ({
        ...prevUser,
        ...userDetails,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUser(localUser);
      console.log(response.data);

      const updatedUser = {
        token: initialState.token,
        userDTO: response.data,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      navigate("/profile");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      <form className="profile-container" onSubmit={handleSave}>
        <h1 className="profile-title">Edit Profile</h1>
        <div className="profile-info">
          <div className="profile-item">
            <strong>Name:</strong>
            <input
              type="text"
              name="name"
              value={localUser.name}
              onChange={handleChange}
            />
          </div>
          <div className="profile-item">
            <strong>Email:</strong>
            <input
              type="email"
              name="emailId"
              value={localUser.emailId}
              onChange={handleChange}
            />
          </div>
          <div className="profile-item">
            <strong>Mobile No:</strong>
            <input
              type="tel"
              name="mobileNumber"
              value={localUser.mobileNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <button className="profile-button">Save Changes</button>
      </form>
    </>
  );
};

export default EditProfile;
