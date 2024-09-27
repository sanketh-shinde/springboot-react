import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Books from "./components/Books";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Home from "./components/Home";
import EditProfile from "./components/EditProfile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="books" element={<Books />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit-profile" element={<EditProfile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
