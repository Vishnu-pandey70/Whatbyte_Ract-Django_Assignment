// pages/Profile.js

import { useEffect } from "react";
import UserIcon from "../images/user.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = (props) => {
  const { setIsLoggedIn, isLoggedIn, name, email, joined } = props;
  let navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === false) {
      toast.error("Login First");
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const profile = async (ev) => {
    ev.preventDefault();
    navigate("/profile");
  };

  const logout = async (ev) => {
    ev.preventDefault();
    setIsLoggedIn(false);
    sessionStorage.setItem("isLoggedIn", JSON.stringify(false));
    navigate("/login");
  };

  const changepass = async (ev) => {
    ev.preventDefault();
    navigate("/changePassword");
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card w-100" style={{ maxWidth: "28rem" }}>
        <div className="card-body text-center">
          <img
            alt="User Icon"
            width="96"
            height="96"
            src={UserIcon}
            className="mb-3 rounded-circle shadow-lg"
          />
          <h5 className="card-title mb-1">Hi, {name}</h5>
          <p className="card-text text-muted">Welcome To Whatbytes</p>
          <div className="d-flex justify-content-around mt-4">
            <button
              onClick={profile}
              className="btn btn-primary"
            >
              Profile
            </button>
            <button
              onClick={changepass}
              className="btn btn-outline-secondary"
            >
              Change Password
            </button>
            <button
              onClick={logout}
              className="btn btn-outline-danger"
            >
              LogOut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
