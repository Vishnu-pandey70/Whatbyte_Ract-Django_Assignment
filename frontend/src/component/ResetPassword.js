import React from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const URL = "http://localhost:8000/app/resetPassword";

const ResetPassword = (props) => {
  const { setLastUpdated } = props;
  const [searchParams] = useSearchParams();
  let navigate = useNavigate();
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  const handleResetPassword = async (ev) => {
    ev.preventDefault();
    const newpassword = ev.target.newpassword.value;
    const confirmpassword = ev.target.confirmpassword.value;

    // Check if passwords match
    if (newpassword !== confirmpassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const formData = { id, token, password: newpassword };

    try {
      const res = await axios.post(URL, formData);
      const data = res.data;

      if (data.success) {
        setLastUpdated(data.lastUpdated);
        sessionStorage.setItem("lastUpdated", JSON.stringify(data.lastUpdated));
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message || "An error occurred. Please try again.");
      }
    } catch (err) {
      if (err.response) {
        // Server responded with a status other than 2xx
        toast.error(err.response.data.message || "An error occurred. Please try again.");
      } else if (err.request) {
        // Request was made but no response received
        toast.error("No response from server. Please check your connection.");
      } else {
        // Something happened in setting up the request 
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center mb-4">Reset Password</h5>
              <form onSubmit={handleResetPassword}>
                <div className="mb-3">
                  <label htmlFor="newpassword" className="form-label">New Password</label>
                  <input
                    id="newpassword"
                    name="newpassword"
                    type="password"
                    placeholder="New Password"
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
                  <input
                    id="confirmpassword"
                    name="confirmpassword"
                    type="password"
                    placeholder="Confirm Password"
                    className="form-control"
                    required
                  />
                </div>
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </div>
                <p className="text-center mt-3">
                  Not yet registered?{" "}
                  <a href="register" className="link-primary">Register Here</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
