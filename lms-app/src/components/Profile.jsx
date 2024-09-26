import { useEffect, useState } from "react";
import "../styles/Profile.css";
import { useSelector } from "react-redux";

const Profile = () => {
  const initialState = JSON.parse(localStorage.getItem("user"));

  const [localUser, setLocalUser] = useState(initialState);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("user"));

    if (userDetails) {
      setLocalUser((prevUser) => ({
        ...prevUser,
        ...userDetails,
      }));

      // userDetails.token == localUser.token ? !isAuthenticated : isAuthenticated;
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
        <button className="profile-button">Edit Profile</button>
      </div>
    </>
  );
};

export default Profile;
