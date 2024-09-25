import "../styles/Profile.css";

const Profile = () => {
  return (
    <div className="profile-container">
      <h1 className="profile-title">User Profile</h1>
      <div className="profile-info">
        <p className="profile-item">
          <strong>Name:</strong> John Doe
        </p>
        <p className="profile-item">
          <strong>Email:</strong> johndoe@example.com
        </p>
        <p className="profile-item">
          <strong>Joined:</strong> January 1, 2022
        </p>
      </div>
      <button className="profile-button">Edit Profile</button>
    </div>
  );
};

export default Profile;
