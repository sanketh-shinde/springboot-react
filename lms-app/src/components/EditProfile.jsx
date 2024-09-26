import { useEffect, useState } from "react";
import "../styles/Profile.css";
import { useSelector } from "react-redux";

const EditProfile = () => {
  const initialState = JSON.parse(localStorage.getItem("user"));
  const [localUser, setLocalUser] = useState(initialState);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("user"));

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
      userDTO: {
        ...prevUser.userDTO,
        [name]: value,
      },
    }));
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(localUser));
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Edit Profile</h1>
      <div className="profile-info">
        <div className="profile-item">
          <strong>Name:</strong>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={localUser.userDTO.name}
              onChange={handleChange}
            />
          ) : (
            <span>{localUser.userDTO.name}</span>
          )}
        </div>
        <div className="profile-item">
          <strong>Email:</strong>
          {isEditing ? (
            <input
              type="email"
              name="emailId"
              value={localUser.userDTO.emailId}
              onChange={handleChange}
            />
          ) : (
            <span>{localUser.userDTO.emailId}</span>
          )}
        </div>
        <div className="profile-item">
          <strong>Phone No:</strong>
          {isEditing ? (
            <input
              type="text"
              name="mobileNumber"
              value={localUser.userDTO.mobileNumber}
              onChange={handleChange}
            />
          ) : (
            <span>{localUser.userDTO.mobileNumber}</span>
          )}
        </div>
      </div>
      {isEditing ? (
        <button className="profile-button" onClick={handleSave}>
          Save Changes
        </button>
      ) : (
        <button className="profile-button" onClick={() => setIsEditing(true)}>
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default EditProfile;
