import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const URL = "http://localhost:8000/app/changePassword";

const Changepass = (props) => {
  const { isLoggedIn, email, setLastUpdated } = props;
  let navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Login First");
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleChangePassword = async (ev) => {
    ev.preventDefault();
    const oldpassword = ev.target.oldpassword.value;
    const newpassword = ev.target.newpassword.value;
    const confirmpassword = ev.target.confirmpassword.value;

    if (newpassword !== confirmpassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const formData = { email, oldpassword, password: newpassword };

    try {
      const res = await axios.post(URL, formData);
      const data = res.data;

      if (data.success) {
        setLastUpdated(data.lastUpdated);
        sessionStorage.setItem("lastUpdated", JSON.stringify(data.lastUpdated));
        toast.success(data.message);
        navigate("/profile");
      } else {
        toast.error(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        toast.error(error.response.data.message || "An error occurred. Please try again.");
      } else if (error.request) {
        // Request was made but no response received
        toast.error("No response from server. Please check your connection.");
      } else {
        // Something happened in setting up the request
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center my-4">
      <div className="card w-100" style={{ maxWidth: "28rem" }}>
        <div className="card-body">
          <h5 className="card-title text-center">Change Password</h5>
          <form onSubmit={handleChangePassword} className="d-flex flex-column gap-3">
            <div className="mb-3">
              <label htmlFor="oldpassword" className="form-label">Old Password</label>
              <input type="password" className="form-control" id="oldpassword" name="oldpassword" placeholder="Old Password" required />
            </div>
            <div className="mb-3">
              <label htmlFor="newpassword" className="form-label">New Password</label>
              <input type="password" className="form-control" id="newpassword" name="newpassword" placeholder="New Password" required />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" id="confirmpassword" name="confirmpassword" placeholder="Confirm Password" required />
            </div>
            <button type="submit" className="btn btn-primary w-100">Submit</button>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Changepass;
