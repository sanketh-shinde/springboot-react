import { useEffect, useState } from "react";
import { user } from "../services/authService";
import { useNavigate } from "react-router-dom";

import { updateUser } from "../services/userService";

import "../styles/EditProfile.css";

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
      <form className="edit-profile-container" onSubmit={handleSave}>
        <h1 className="edit-profile-title">Edit Profile</h1>
        <div className="edit-profile-info">
          <div className="edit-profile-item">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={localUser.name || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="edit-profile-item">
            <label>Email:</label>
            <input
              type="email"
              name="emailId"
              value={localUser.emailId || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="edit-profile-item">
            <label>Mobile No:</label>
            <input
              type="tel"
              name="mobileNumber"
              value={localUser.mobileNumber || ""}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button className="edit-profile-button">Save Changes</button>
      </form>
    </>
  );
};

export default EditProfile;
