import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { AuthContexts } from "../Context/AuthContext";
import { toast } from "react-hot-toast";
import api from "../../ApiConfig/index";
import { loadStripe } from "@stripe/stripe-js";
import Quantity from "./Quantity";
// import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { state } = useContext(AuthContexts);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  // const [totalCartItems, setTotalCartItems] = useState(0);

  useEffect(() => {
    if (state?.currentUser?.email) {
      setIsUserLoggedIn(true);
      setCurrentUser(state?.currentUser);
    } else {
      setIsUserLoggedIn(false);
      setCurrentUser({});
    }
  }, [state]);

  useEffect(() => {
    const getAllCartProducts = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("MeeshoUserToken"));
        const response = await api.post("/get-cart-products", { token });

        if (response.data.success) {
          setCartProducts(response.data.products);
          setIsLoading(false);
        } else {
          setCartProducts([]);
          toast.error(response.data.message);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        toast.error("Please login to your account!");
      }
    };

    getAllCartProducts();
  }, []);

  useEffect(() => {
    if (cartProducts?.length) {
      let totalPrice = 0;
      for (let i = 0; i < cartProducts?.length; i++) {
        totalPrice = totalPrice + parseInt(cartProducts[i]?.price);
      }
      setCartTotalPrice(totalPrice);
    } else {
      setCartTotalPrice(0);
    }
  }, [cartProducts]);

  const removeCartProduct = async (productId) => {
    try {
      const token = JSON.parse(localStorage.getItem("MeeshoUserToken"));
      const response = await api.post("/remove-cart-product", {
        token,
        productId,
      });

      if (response.data.success) {
        setCartProducts(response.data.products);
        toast.success(response.data.message);
      } else {
        toast.success(response.data.message);
        setCartProducts([]);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51Oc4ztSHIBIzSUXgKFhro0joe50DYXhm4BLmBDRfBh5vlzPTUKYJnz0ANEgvSQLS65b1NNBH8LndRf5dYua6t50a003sLoWVhF"
    );
    const token = JSON.parse(localStorage.getItem("MeeshoUserToken"));

    if (cartProducts?.length > 0 && token) {
      try {
        const headers = {
          "Content-Type": "application/json",
        };

        const response = await api.post("/remove-all-cart-products", {
          token,
          headers: headers,
          products: cartProducts,
        });

        if (response.data.success) {
          const session = response?.data?.id;

          const result = await stripe?.redirectToCheckout({
            sessionId: session,
          });

          if (result?.error) {
            console.log(result?.error);
            toast.error("Failed to intiate payment!");
          } else {
            setCartProducts([]);
          }
        }
      } catch (error) {
        console.log(error?.response?.data?.message);
      }

      // try {
      //   const token = JSON.parse(localStorage.getItem("MeeshoUserToken"));
      //   const response = await api.post("/remove-all-cart-products", { token });

      //   if (response.data.success) {
      // setCartProducts([]);
      //     toast.success(response.data.message);
      //   } else {
      //     toast.error(response.data.message);
      //   }
      // } catch (error) {
      //   toast.error(error.response.data.message);
      // }
    } else {
      toast.error("Please atleast add one product to cart before checkout!");
    }
  };

  return (
    <div id="main-cart">
      {isUserLoggedIn && (
        <div id="cart-body">
          {isLoading ? (
            <div id="cart-prod-loading">
              <h3>Loading...</h3>
            </div>
          ) : (
            <>
              {" "}
              <div id="left">
                {!cartProducts?.length == 0 && (
                  <div id="item-number">
                    <h3>Cart</h3>
                    <span>{cartProducts?.length} Items</span>
                    {/* <span>{totalCartItems} Items</span> */}
                  </div>
                )}
                <div id="cart-products">
                  {cartProducts?.length ? (
                    cartProducts.map((prod) => (
                      <div class="main-item" key={prod?._id}>
                        <div class="item-details">
                          <div class="img">
                            <img src={prod?.image} alt="product" />
                          </div>
                          <div class="details">
                            <h4>{prod?.name?.slice(0, 40)}...</h4>
                            <div class="size">
                              <span>Size: M</span>
                              <span>Qty: {prod?.qnty ? prod?.qnty : 1}</span>
                            </div>
                            <span>₹{prod?.price?.toLocaleString("en-IN")}</span>
                            <div
                              id="remove"
                              onClick={() => removeCartProduct(prod?._id)}
                            >
                              <i class="fa-solid fa-xmark fa-sm"></i>
                              <h4>REMOVE</h4>
                            </div>
                            <Quantity
                              prod={prod}
                              setCartTotalPrice={setCartTotalPrice}
                              cartTotalPrice={cartTotalPrice}
                            />
                          </div>
                          <div class="edit">
                            <button>EDIT</button>
                          </div>
                        </div>
                        <div class="sold">
                          <h3>Sold By : Maruti Collection</h3>
                          <h3>Free Delivery</h3>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div id="no-prod-msg">
                      <h2>No products in the cart!</h2>
                    </div>
                  )}
                </div>
              </div>
              <div id="right">
                <div id="price-details">
                  <h3>Price Details</h3>
                  <div>
                    <h4>Total Product Price</h4>
                    <span>
                      ₹
                      {cartTotalPrice &&
                        cartTotalPrice?.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
                <div id="total-price">
                  <h3>Order Total</h3>
                  <h3>
                    ₹{cartTotalPrice && cartTotalPrice?.toLocaleString("en-IN")}
                  </h3>
                </div>
                <h5>Clicking on ‘Continue’ will not deduct any money</h5>
                <div id="button">
                  <button onClick={makePayment}>Continue</button>
                </div>
                <div id="right-img">
                  <img
                    src="https://images.meesho.com/images/marketing/1588578650850.png"
                    alt="safety"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}
      {!isUserLoggedIn &&
        (isLoading ? (
          <>
            <div id="cart-loading">
              <h3>Loading...</h3>
            </div>
          </>
        ) : (
          <>
            <div id="login-cart-msg">
              <h2>Please login to access the cart page : )</h2>
            </div>
          </>
        ))}
    </div>
  );
};

export default Cart;
