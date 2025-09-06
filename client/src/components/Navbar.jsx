import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // current route
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Show user links only if logged in and not on home page
  const showUserLinks = token && location.pathname !== "/";

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">EcomApp</Link>
        {showUserLinks && <Link to="/items">Items</Link>}
        {showUserLinks && <Link to="/cart">Cart</Link>}
      </div>

      <div className="nav-right">
        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        {showUserLinks && (
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
