import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";

import {
  Login,
  Register,
  getCurrentUser,
  updateUserDetails,
} from "./Controllers/User.controller.js";
import {
  addComments,
  addProduct,
  addRating,
  allProducts,
  deleteYourProduct,
  getEditProductData,
  getFilteredProducts,
  getSinglePageFilteredProds,
  getSingleProduct,
  getYourProducts,
  updateYourProduct,
} from "./Controllers/Product.controller.js";
import {
  checkIsAdmin,
  checkSeller,
  isCheckValidUser,
} from "./Middlewares/All.middleware.js";
import {
  getWishlistProducts,
  addToCart,
  addToWishlist,
  getCartProducts,
  removeCartProduct,
  removeAllCartProducts,
} from "./Controllers/Buyer.controller.js";
import {
  blockProduct,
  blockUser,
  getAllBuyers,
  getAllProducts,
  getAllSellers,
  getBlockedProducts,
  getUnverifiedProducts,
  getVerifiedProducts,
  unBlockUser,
  unblockProduct,
  verifyProduct,
} from "./Controllers/Admin.controller.js";

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
// app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("working!!!");
});

app.post("/register", Register);
app.post("/login", Login);
app.post("/get-current-user", getCurrentUser);
app.get("/all-products", allProducts);
app.post("/get-filtered-products", getFilteredProducts);
app.post("/get-single-page-filtered-products", getSinglePageFilteredProds);
app.post("/get-singleproduct-data", getSingleProduct);
app.post("/update-user-details", updateUserDetails);

// seller
app.post("/add-product", checkSeller, addProduct);
app.get("/get-your-products", checkSeller, getYourProducts);
app.post("/get-editproduct-data", checkSeller, getEditProductData);
app.post("/update-your-product", checkSeller, updateYourProduct);
app.post("/delete-your-product", checkSeller, deleteYourProduct);

// buyer
app.post("/add-to-cart", addToCart);
app.post("/get-cart-products", getCartProducts);
app.post("/remove-cart-product", removeCartProduct);
app.post("/remove-all-cart-products", removeAllCartProducts);
app.post("/add-to-wishlist", addToWishlist);
app.get("/get-wishlist-products", getWishlistProducts);

// admin
app.get("/get-all-buyers", checkIsAdmin, getAllBuyers);
app.get("/get-all-sellers", checkIsAdmin, getAllSellers);
app.get("/get-all-products", checkIsAdmin, getAllProducts);
app.patch("/block-user", checkIsAdmin, blockUser);
app.patch("/unblock-user", checkIsAdmin, unBlockUser);
app.patch("/block-product", checkIsAdmin, blockProduct);
app.patch("/unblock-product", checkIsAdmin, unblockProduct);
app.patch("/verify-product", checkIsAdmin, verifyProduct);
app.get("/get-verified-products", checkIsAdmin, getVerifiedProducts);
app.get("/get-unverified-products", checkIsAdmin, getUnverifiedProducts);
app.get("/get-blocked-products", checkIsAdmin, getBlockedProducts);
app.patch("/add-rating", isCheckValidUser, addRating);
app.patch("/add-comment", isCheckValidUser, addComments);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to DB...");
  })
  .catch((error) => {
    console.log("Something went wrong", error);
  });

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
