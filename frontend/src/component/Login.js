import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

const URL = "http://localhost:8000/app/login";

const Login = (props) => {
  let navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, setName, setEmail, setJoined } = props;

  useEffect(() => {
    if (isLoggedIn) navigate("profile");
  }, [isLoggedIn, navigate]);

  const handleLogin = async (ev) => {
    ev.preventDefault();
    const email = ev.target.email.value;
    const password = ev.target.password.value;
    const formData = { email, password };

    try {
      const res = await axios.post(URL, formData);
      const data = res.data;

      if (data.success) {
        toast.success(data.message);
        setIsLoggedIn(true);
        sessionStorage.setItem("isLoggedIn", JSON.stringify(true));

        setEmail(email);
        sessionStorage.setItem("email", JSON.stringify(email));

        setName(data.name);
        sessionStorage.setItem("name", JSON.stringify(data.name));

        setJoined(data.joined);
        sessionStorage.setItem("joined", JSON.stringify(data.joined));

        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // Handle errors from the backend or network issues
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
          <h5 className="card-title text-center mb-4">Login to your account</h5>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Your Email"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <a href="forgotPassword" className="text-primary">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Your Password"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                id="remember"
                className="form-check-input"
              />
              <label htmlFor="remember" className="form-check-label">
                Remember me
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
            <p className="text-center text-muted mt-3">
              Not yet registered?{" "}
              <a href="register" className="text-primary">
                Register Here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
