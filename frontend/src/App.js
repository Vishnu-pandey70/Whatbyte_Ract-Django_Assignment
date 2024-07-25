// App.js

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Login from "./component/Login";
import Register from "./component/Register";
import Home from "./component/Home";
import ForgotPassword from "./component/ForgotPassword";
import Dashboard from "./component/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./component/ResetPassword";
import Changepass from "./component/Changepass";
import Profile from "./component/Profile";
import { useState } from "react";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => JSON.parse(sessionStorage.getItem("isLoggedIn")) || false);
  const [name, setName] = useState(() => sessionStorage.getItem("name") || "");
  const [email, setEmail] = useState(() => sessionStorage.getItem("email") || "");
  const [joined, setJoined] = useState(() => sessionStorage.getItem("joined") || "");
  const [lastUpdated, setLastUpdated] = useState(() => sessionStorage.getItem("lastUpdated") || "");

  return (
    <div className="md:h-screen bg-purple-100">
      <BrowserRouter>
        <ToastContainer />
        <Navbar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
        />
        <Routes>
          <Route
            path="/"
            element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="register"
            element={
              <Register
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setName={setName}
                setEmail={setEmail}
                setJoined={setJoined}
                setLastUpdated={setLastUpdated}
              />
            }
          />
          <Route
            path="login"
            element={
              <Login
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setName={setName}
                setEmail={setEmail}
                setJoined={setJoined}
                setLastUpdated={setLastUpdated}
              />
            }
          />
          <Route
            path="forgotPassword"
            element={<ForgotPassword isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="resetPassword"
            element={<ResetPassword isLoggedIn={isLoggedIn} setLastUpdated={setLastUpdated} />}
          />
          <Route
            path="changePassword"
            element={<Changepass isLoggedIn={isLoggedIn} email={email} setLastUpdated={setLastUpdated} />}
          />
          <Route
            path="dashboard"
            element={<Dashboard setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} name={name} email={email} joined={joined} />}
          />
          <Route
            path="profile"
            element={<Profile setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} name={name} email={email} joined={joined} lastUpdated={lastUpdated} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
