import { useEffect, useState } from "react";
import { user } from "../services/authService";
import { useNavigate } from "react-router-dom";

import "../styles/Profile.css";

const Profile = () => {
  const initialState = user();

  const navigate = useNavigate();

  const [localUser, setLocalUser] = useState(initialState);

  useEffect(() => {
    const userDetails = user();

    if (userDetails) {
      setLocalUser((prevUser) => ({
        ...prevUser,
        ...userDetails,
      }));
    }
  }, []);

  return (
    <>
      <div className="profile-container">
        <h1 className="profile-header">User Profile</h1>
        <div className="profile-info">
          <div className="profile-item">
            <label>Name:</label>
            <span>{localUser.userDTO.name}</span>
          </div>
          <div className="profile-item">
            <label>Email:</label>
            <span>{localUser.userDTO.emailId}</span>
          </div>
          <div className="profile-item">
            <label>Phone No:</label>
            <span>{localUser.userDTO.mobileNumber}</span>
          </div>
        </div>
        <button
          className="edit-profile-btn"
          onClick={() => navigate("/profile/edit-profile")}
        >
          Edit Profile
        </button>
      </div>
    </>
  );
};

export default Profile;
