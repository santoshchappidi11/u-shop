import React, { useContext, useEffect, useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContexts } from "../Context/AuthContext";
import api from "../../ApiConfig/index";
import formBanner from "../../images/form-banner-2.avif";
// import axios from "axios";

const Register = () => {
  const { state } = useContext(AuthContexts);
  const navigateTo = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Buyer",
  });

  useEffect(() => {
    if (state?.currentUser?.name) {
      navigateTo("/");
    }
  }, [state, navigateTo]);

  const handleChangeValues = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (
      userData.name &&
      userData.email &&
      userData.password &&
      userData.confirmPassword &&
      userData.role
    ) {
      if (userData.password == userData.confirmPassword) {
        try {
          const response = await api.post("/register", {
            userData,
          });

          if (response.data.success) {
            setUserData({
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
              role: "Buyer",
            });
            toast.success(response.data.message);
            navigateTo("/login");
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error("Password and ConfirmPassword does not match!");
      }
    } else {
      toast.error("Please fill all the details!");
    }
  };

  return (
    <div id="register-body">
      <div id="register">
        <div id="image">
          <img src={formBanner} alt="register" />
        </div>
        <div id="register-main">
          <form onSubmit={handleRegisterSubmit}>
            <h3>Sign Up to view your profile</h3>
            <div id="fields">
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                value={userData.name}
                onChange={handleChangeValues}
              />
              <input
                type="email"
                name="email"
                placeholder=" Enter Your Email"
                value={userData.email}
                onChange={handleChangeValues}
              />
              <input
                type="password"
                name="password"
                placeholder="Enter Your Password"
                value={userData.password}
                onChange={handleChangeValues}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Enter Confirm Password"
                value={userData.confirmPassword}
                onChange={handleChangeValues}
              />
              <select
                name="role"
                value={userData.role}
                onChange={handleChangeValues}
              >
                <option>Buyer</option>
                <option>Seller</option>
                <option>Admin</option>
              </select>
            </div>
            <div id="button">
              <button type="submit">Continue</button>
            </div>
          </form>
          <div id="sign-in">
            <span>
              Already Have an account?{" "}
              <b onClick={() => navigateTo("/login")}>Sign In</b>
            </span>
          </div>
          <div id="policy">
            <span>
              By continuing, you agree to U SHOP
              <b> Terms & Conditions</b> and <b>Privacy Policy</b>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
