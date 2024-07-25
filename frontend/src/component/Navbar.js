// components/Navbar.js

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import UserIcon from "../images/user.png";
import LogoImage from "../images/logo.png";
import { toast } from "react-toastify";

const Navbar = (props) => {
  let navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, name, setName, email, setEmail } = props;

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.setItem("isLoggedIn", JSON.stringify(false));

    setName(null);
    setEmail(null);
    navigate("/");
    toast.success("You are successfully logged out!");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
       <a className="navbar-brand" href="/">
        <img src={LogoImage} alt="WhatBytes Logo" style={{ height: '40px', width: 'auto' }} />
      </a>
      <a className="btn btn-outline-primary ms-2" href="/">Home</a>
      {isLoggedIn && (
  <a className="btn btn-outline-primary ms-2" href="/dashboard">Dashboard</a>
)}

      
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="container-fluid">
          <div className="row w-100">
            <div className="col-6 d-flex align-items-center">
              {/* Empty for alignment purposes */}
            </div>
            <div className="col-6 d-flex justify-content-end align-items-center">
              {!isLoggedIn ? (
                <>
                  <a className="btn btn-outline-primary me-2" href="/login">Login</a>
                  <a className="btn btn-primary" href="/register">Sign Up</a>
                </>
              ) : (
                <>
                  
                  <div className="dropdown">
                    <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <img alt="User Icon" width="30" height="30" src={UserIcon} className="rounded-circle me-2" />
                      <span>{name}</span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                      <li>
                        <span className="dropdown-item-text">
                          <strong>{name}</strong><br />
                          <small>{email}</small>
                        </span>
                      </li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><a className="dropdown-item" href="#" onClick={handleLogout}>Log out</a></li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
