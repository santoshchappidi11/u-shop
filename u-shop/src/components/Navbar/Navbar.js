import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import logo from "./../../images/logo.png";
import { useNavigate } from "react-router-dom";
import { AuthContexts } from "../Context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { state, Logout } = useContext(AuthContexts);
  const naviagateTo = useNavigate();
  const [isShowSidePopup, setIsShowSidePopup] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isSeller, setIsSeller] = useState(false);

  const handleUserLogout = () => {
    Logout();
    toast.success("Logout Successfull!");
    naviagateTo("/login");
  };

  useEffect(() => {
    if (state?.currentUser?.email) {
      setCurrentUser(state?.currentUser);
    } else {
      setCurrentUser({});
    }
  }, [state]);

  useEffect(() => {
    if (state?.currentUser?.role == "Seller") {
      setIsSeller(true);
    } else {
      setIsSeller(false);
    }
  }, [state]);

  const openSidePopup = () => {
    setIsShowSidePopup(true);
  };

  const closeSidePopup = () => {
    setIsShowSidePopup(false);
  };

  return (
    <>
      <div id="meesho-navbar">
        <div id="navbar">
          <div id="left">
            <div id="logo">
              <h2 onClick={() => naviagateTo("/")} id="main-logo" class="fancy">
                {/* <img src={logo} alt="logo" /> */}
                {/* <h2 onClick={() => naviagateTo("/")}>U SHOP</h2> */}
                {/* <section className="wrapper">
                  <div class="top">U SHOP</div>
                  <div class="bottom" aria-hidden="true">
                    U SHOP
                  </div>
                </section> */}
                U SHOP
              </h2>
              <aside></aside>
            </div>
            <div id="search">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input
                placeholder="Try, Saree, Kurti or Search by Product Code"
                type="text"
              />
            </div>
          </div>
          <div id="right">
            <div id="download">
              <i class="fa-solid fa-mobile-screen-button fa-lg"></i>
              <span>Download App</span>
            </div>
            <div id="supplier">
              <span>Become a Supplier</span>
            </div>
            <div id="others">
              <div class="other">
                <p onMouseOver={openSidePopup} onMouseLeave={closeSidePopup}>
                  <i class="fa-regular fa-user fa-1x"></i> <span>Profile</span>
                </p>
              </div>
              {!isSeller && (
                <div class="other">
                  <p>
                    <i class="fa-regular fa-heart"></i> <span>Wishlist</span>
                  </p>
                </div>
              )}
              {!isSeller && (
                <div class="other">
                  <p onClick={() => naviagateTo("/cart")}>
                    <i class="fa-solid fa-cart-shopping"></i> <span>Cart</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div id="meesho-sub-navbar">
        <div id="nav-items">
          <span>
            <p onClick={() => naviagateTo("/women-ethnic")}>Women Ethnic</p>
          </span>
          <span>
            <p onClick={() => naviagateTo("/women-western")}>Women Western</p>
          </span>
          <span>
            <p onClick={() => naviagateTo("/mens")}>Men</p>
          </span>
          <span>
            <p onClick={() => naviagateTo("/kids")}>Kids</p>
          </span>
          <span>
            <p onClick={() => naviagateTo("/home&kitchen")}>Home & Kitchen</p>
          </span>
          <span>
            <p onClick={() => naviagateTo("/beauty&health")}>Beauty & Health</p>
          </span>
          <span>
            <p onClick={() => naviagateTo("/jewellery&accessories")}>
              Jewellery & Accessories
            </p>
          </span>
          <span>
            <p onClick={() => naviagateTo("/bags&footwear")}>Bags & Footwear</p>
          </span>
          <span>
            <p onClick={() => naviagateTo("/electronics")}>Electronics</p>
          </span>
        </div>
      </div>

      {/* ------------------------------login-register-popup--------------------------------------- */}

      {isShowSidePopup && (
        <div
          class="modal-box"
          onMouseOver={openSidePopup}
          onMouseLeave={closeSidePopup}
        >
          <div class="box" id="welcome">
            <h3>Welcome</h3>
            <span>To access account and manage orders</span>

            {currentUser?.name && (
              <>
                <h3>Hello,</h3>
                <p>
                  {currentUser?.name?.toUpperCase()}({currentUser?.role})
                </p>
              </>
            )}

            {!currentUser?.name && (
              <div id="button">
                <button onClick={() => naviagateTo("/login")}>
                  SIGNIN / SIGNUP
                </button>
              </div>
            )}
            {currentUser?.name && (
              <div id="button">
                <button onClick={() => naviagateTo("/profile")}>PROFILE</button>
              </div>
            )}
            {isSeller && (
              <div id="button">
                <button onClick={() => naviagateTo("/add-product")}>
                  ADD PRODUCT
                </button>
              </div>
            )}
            {currentUser?.name && (
              <div id="button">
                <button onClick={handleUserLogout}>LOGOUT</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
