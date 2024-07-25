import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:8000/app/forgotPassword";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const email = ev.target.email.value;
    const formData = { email };

    try {
      const res = await axios.post(URL, formData);
      const data = res.data;

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
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
          <h5 className="card-title text-center mb-4">Forgot Password</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
            <p className="text-center text-muted mt-3">
              Remember your password?{" "}
              <a href="login" className="text-primary">
                Login Here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
