import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/Home.css";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className="home-page">
      <header className="header">
        <h1>Library Management System</h1>
        <nav className="nav">
          <Navbar />
        </nav>
      </header>
      <main className="main-content">
        <h2>Welcome to the Library!</h2>
        <p>
          Explore our vast collection of books and manage your reading list. Use
          the navigation links above to get started!
        </p>
        <Outlet />
      </main>
      <footer className="footer">
        <p>&copy; 2024 Library Management System</p>
      </footer>
    </div>
  );
};

export default Home;
