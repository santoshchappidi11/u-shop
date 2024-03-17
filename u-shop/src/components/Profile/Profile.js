import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { AuthContexts } from "../Context/AuthContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../ApiConfig/index";

const Profile = () => {
  const { state, Login } = useContext(AuthContexts);
  const [editProfile, setEditProfile] = useState({ name: "", password: "" });
  const [isShowScreen, setIsShowScreen] = useState(false);
  const [isShowEditProfilePopup, setIsShowEditProfilePopup] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const navigateTo = useNavigate();

  useEffect(() => {
    if (state?.currentUser?.email) {
      setCurrentUser(state?.currentUser);
    } else {
      setCurrentUser({});
      navigateTo("/");
      toast.error("Please login to access this page!");
    }
  }, [state, navigateTo]);

  const openEditProfilePopup = () => {
    setIsShowScreen(true);
    setIsShowEditProfilePopup(true);
  };

  const closeEditProfilePopup = () => {
    setIsShowScreen(false);
    setIsShowEditProfilePopup(false);
  };

  const handleChangeValues = (e) => {
    setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
  };

  const handleEditProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = JSON.parse(localStorage.getItem("MeeshoUserToken"));
      const response = await api.post("/update-user-details", {
        token,
        editProfile,
      });

      if (response.data.success) {
        Login(response.data);
        setIsShowEditProfilePopup(false);
        setIsShowScreen(false);
        setEditProfile({ name: "", password: "" });
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div id="profile-body">
      <div id="details">
        <div id="account">
          <h3>Account</h3>
          <span>{currentUser?.name?.toUpperCase()}</span>
        </div>
        <div id="overview">
          <div id="left">
            <div id="overview-main">
              <p>Overview</p>
            </div>
            <div id="orders">
              <span>ORDERS</span>
              <p>Orders & Returns</p>
            </div>
            <div id="credits">
              <span>CREDITS</span>
              <p>Coupons</p>
              <p>U-SHOP Credit</p>
              <p>U-SHOP Cash</p>
            </div>
            <div id="account">
              <span>ACCOUNT</span>
              <h3>Profile</h3>
              <p>Saved Cards</p>
              <p>Saved VPA</p>
              <p>Address</p>
              <p>U-SHOP Insider</p>
            </div>
            <div id="legal">
              <span>LEGAL</span>
              <p>Terms of Use</p>
              <p>Privacy Policy</p>
              <p></p>
            </div>
          </div>
          <div id="right">
            <div id="header">
              <h3>Profile Details</h3>
            </div>
            <div id="personal-details">
              <div>
                <p>Full Name</p>
                <span>{currentUser?.name?.toUpperCase()}</span>
              </div>
              <div>
                <p>Mobile Number</p>
                <span>8356015803</span>
              </div>
              <div>
                <p>Email ID</p>
                <span>{currentUser.email}</span>
              </div>
              <div>
                <p>Gender</p>
                <span>MALE</span>
              </div>
              <div>
                <p>Date of Birth</p>
                <span>- not added</span>
              </div>
              <div>
                <p>Location</p>
                <span>Chembur</span>
              </div>
              <div>
                <p>Alternate mobile</p>
                <span>- not added</span>
              </div>
              <div>
                <p>Hint Name</p>
                <span>- not added</span>
              </div>
            </div>
            <div id="button">
              <button type="submit" onClick={openEditProfilePopup}>
                EDIT PROFILE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------------edit-profile-popup---------------------------- */}

      {isShowScreen && (
        <div id="screen">
          {isShowEditProfilePopup && (
            <div id="edit-profile">
              <div className="close">
                <i
                  class="fa-solid fa-xmark fa-xl"
                  onClick={closeEditProfilePopup}
                ></i>
              </div>
              <div className="header">
                <h1>Edit Profile</h1>
              </div>
              <form onSubmit={handleEditProfileSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Change Your Name"
                  value={editProfile.name}
                  onChange={handleChangeValues}
                />
                <input
                  type="text"
                  name="password"
                  placeholder="Change Your Password"
                  value={editProfile.password}
                  onChange={handleChangeValues}
                />
                <button type="submit">Update Profile</button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
