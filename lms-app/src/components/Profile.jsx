import { useEffect, useState } from "react";
import "../styles/Profile.css";
import { useSelector } from "react-redux";
import { user } from "../services/authService";
import { Link } from "react-router-dom";

const Profile = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  const initialState = user();

  const [localUser, setLocalUser] = useState(initialState);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("user"));

    if (userDetails) {
      setLocalUser((prevUser) => ({
        ...prevUser,
        ...userDetails,
      }));

      userDetails.token == localUser.token ? !isAuthenticated : isAuthenticated;
    }
  }, []);

  return (
    <>
      <div className="profile-container">
        <h1 className="profile-title">User Profile</h1>
        <div className="profile-info">
          <p className="profile-item">
            <strong>Name:</strong> {localUser.userDTO.name}
          </p>
          <p className="profile-item">
            <strong>Email:</strong> {localUser.userDTO.emailId}
          </p>
          <p className="profile-item">
            <strong>Phone No:</strong> {localUser.userDTO.mobileNumber}
          </p>
        </div>
        <Link to="/profile/edit-profile" className="profile-button">
          Edit Profile
        </Link>
      </div>
    </>
  );
};

export default Profile;
