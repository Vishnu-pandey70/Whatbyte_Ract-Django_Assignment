// pages/Profile.js

import { useEffect } from "react";
import UserIcon from "../images/user.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = (props) => {
  const { setIsLoggedIn, isLoggedIn, name, email, joined, lastUpdated } = props;

  let navigate = useNavigate();

  const dashboard = async (ev) => {
    ev.preventDefault();
    navigate("/dashboard");
  };

  useEffect(() => {
    if (isLoggedIn === false) {
      toast.error("Login First");
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const logout = async (ev) => {
    ev.preventDefault();
    setIsLoggedIn(false);
    sessionStorage.setItem("isLoggedIn", JSON.stringify(false));
    navigate("/login");
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
          <h5 className="card-title mb-1">Name: {name}</h5>
          <p className="card-text text-muted">Email: {email}</p>
          <p className="card-text text-muted">Joined On: {joined}</p>
          <p className="card-text text-muted">Last Updated: {lastUpdated}</p>
          <div className="d-flex justify-content-center mt-4 gap-3">
            <form onSubmit={dashboard}>
              <button
                type="submit"
                className="btn btn-primary"
              >
                Dashboard
              </button>
            </form>

            <form onSubmit={logout}>
              <button
                type="submit"
                className="btn btn-secondary"
              >
                LogOut
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
