import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const URL = "http://localhost:8000/app/register";

const Register = (props) => {
  const { isLoggedIn, setIsLoggedIn, setName, setEmail, setJoined, setLastUpdated } = props;
  let navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/profile");
  }, [isLoggedIn, navigate]);

  const handleRegister = async (ev) => {
    ev.preventDefault();
    const name = ev.target.name.value;
    const email = ev.target.email.value;
    const password = ev.target.password.value;
    const confirmpassword = ev.target.confirmpassword.value;

    // Date handling
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    // Password validation
    if (password !== confirmpassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const formData = {
      name,
      email,
      password,
      JoinedOn: formattedDate,
    };

    try {
      const res = await axios.post(URL, formData);
      const data = res.data;

      if (data.success) {
        toast.success(data.message);
        setIsLoggedIn(true);
        sessionStorage.setItem("isLoggedIn", JSON.stringify(true));

        setLastUpdated(data.lastUpdated);
        sessionStorage.setItem("lastUpdated", JSON.stringify(data.lastUpdated));

        setName(name);
        sessionStorage.setItem("name", JSON.stringify(name));

        setEmail(email);
        sessionStorage.setItem("email", JSON.stringify(email));

        setJoined(formattedDate);
        sessionStorage.setItem("joined", JSON.stringify(formattedDate));

        navigate("/profile");
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
        <div className="col-md-8 col-lg-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Create an account</h1>
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    className="form-control"
                    required
                  />
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Your Password"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
                    <input
                      id="confirmpassword"
                      name="confirmpassword"
                      type="password"
                      placeholder="Re-enter Password"
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3 form-check">
                  <input
                    id="terms"
                    type="checkbox"
                    className="form-check-input"
                    required
                  />
                  <label htmlFor="terms" className="form-check-label">
                    I accept the <a href="#" className="link-primary">Terms and Conditions</a>
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Create an account
                </button>

                <p className="text-center mt-3">
                  Already have an account?{" "}
                  <a href="login" className="link-primary">
                    Login Here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
