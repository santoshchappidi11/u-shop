import jwt from "jsonwebtoken";
import UserModel from "../Models/User.model.js";
import ProductModel from "../Models/Product.model.js";
import Stripe from "stripe";

export const addToCart = async (req, res) => {
  try {
    const { token, productId } = req.body;

    if (!token || !productId)
      return res
        .status(404)
        .json({ success: false, message: "Token and Product id is required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decodedData?.userId;

    const user = await UserModel.findById({ _id: userId });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "user not found!" });

    if (user) {
      for (let i = 0; i < user.cart.length; i++) {
        if (user.cart[i] == productId) {
          return res.status(404).json({
            success: false,
            message: "This Product already has been added to cart!",
          });
        }
      }
    }

    user?.cart.push(productId);

    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Product added to cart!", user: user });
  } catch (error) {
    return res.status(500).json({ status: "error", error: error.message });
  }
};

export const getCartProducts = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "Token is required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decodedData?.userId;

    const user = await UserModel.findById(userId);

    if (user) {
      let finalCartProducts = [];
      for (var i = 0; i < user.cart.length; i++) {
        const product = await ProductModel.findById(user.cart[i]);
        if (product) {
          finalCartProducts.push(product);
        }
      }
      return res
        .status(200)
        .json({ success: true, products: finalCartProducts });
    }

    return res.status(404).json({ success: false, message: "User not found!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const removeCartProduct = async (req, res) => {
  try {
    const { token, productId } = req.body;

    if (!token || !productId)
      return res
        .status(404)
        .json({ success: false, message: "Token and Product id is required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid token!" });
    }

    const userId = decodedData?.userId;

    const user = await UserModel.findById({ _id: userId });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "user not found!" });

    const cartProducts = user.cart;

    let newCartProducts = cartProducts.filter((item) => item != productId);
    user.cart = newCartProducts;

    // const removeItem = cartProducts.indexOf(productId);
    // cartProducts.splice(removeItem, 1);

    await user.save();

    if (user) {
      let finalCartProducts = [];
      for (let i = 0; i < user.cart.length; i++) {
        const product = await ProductModel.findById(user.cart[i]);
        if (product) {
          finalCartProducts.push(product);
        }
      }

      return res.status(200).json({
        success: true,
        user: user,
        message: "Product removed!",
        products: finalCartProducts,
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

export const removeAllCartProducts = async (req, res) => {
  try {
    const SECRET_KEY = process?.env?.STRIPE_SECRET_KEY;
    const stripe = new Stripe(SECRET_KEY);

    const { token, products } = req.body;

    if (!token)
      return res
        .satus(404)
        .json({ success: false, message: "Token is required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Not a valid token" });

    const userId = decodedData?.userId;

    const user = await UserModel.findById(userId);

    // console.log(products, "prod");

    if (user) {
      const lineItems = products.map((product) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: product?.name,
            images: [product?.image],
          },
          unit_amount: product?.price * 100,
        },
        quantity: product?.qnty ? product?.qnty : 1,
      }));

      const session = await stripe?.checkout?.sessions?.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: lineItems,
        success_url: "https://ushop-03.netlify.app/payment-success/",
        cancel_url: "https://ushop-03.netlify.app/payment-fail/",
        billing_address_collection: "required",
      });

      if (session) {
        user.cart = [];
        await user.save();
        return res.status(200).json({
          success: true,
          id: session.id,
          paymentStatus: session.payment_status,
        });
      }
    }
    // if (user) {
    //   user.cart = [];
    //   await user.save();
    //   return res.status(200).json({
    //     success: true,
    //     message: "Thank you for shopping! Your products will deliver soon...",
    //   });
    // }
    return res.status(404).json({ success: false, message: "No user found!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const { token, productId } = req.body;

    if (!token || !productId)
      throw new Error("Token and Product Id is required!");

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decodedData?.userId;

    const user = await UserModel.findById({ _id: userId });

    user?.wishlist.push(productId);

    await user.save();

    return res.status(200).json({ success: true, user: user });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error });
  }
};

export const getWishlistProducts = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) throw new Error("Token is required");

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decodedData?.userId;

    const user = await UserModel.findById(userId);

    if (user) {
      let finalWishlistProducts = [];
      for (var i = 0; i < user.wishlist.length; i++) {
        const product = await ProductModel.findById(user.wishlist[i]);
        if (product) {
          finalWishlistProducts.push(product);
        }
      }
      return res
        .status(200)
        .json({ success: true, products: finalWishlistProducts });
    }

    throw new Error("User not found!");
  } catch (error) {
    return res.status(500).json({ status: "error", message: error });
  }
};
