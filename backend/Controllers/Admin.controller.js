import ProductModel from "../Models/Product.model.js";
import UserModel from "../Models/User.model.js";

export const getAllBuyers = async (req, res) => {
  try {
    const Buyers = await UserModel.find({ role: "Buyer" });

    if (!Buyers.length) {
      return res
        .status(200)
        .json({ success: false, message: "No Buyer users!" });
    }
    return res.status(200).json({ success: true, users: Buyers });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const Products = await ProductModel.find({});

    if (!Products.length) {
      return res.status(200).json({ success: false, message: "No Products!" });
    }
    return res.status(200).json({ success: true, users: Products });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

export const getAllSellers = async (req, res) => {
  try {
    const Sellers = await UserModel.find({ role: "Seller" });

    if (!Sellers.length) {
      return res
        .status(200)
        .json({ success: false, message: "No Seller users!" });
    }
    return res.status(200).json({ success: true, users: Sellers });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

export const blockUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { isBlocked: true },
      { new: true }
    );

    if (user) {
      return res.status(200).json({
        success: true,
        message: "user blocked successfully!",
        user: user,
      });
    }

    throw new Error("Internal error, please try again");
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

export const unBlockUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        isBlocked: false,
      },
      { new: true }
    );

    if (user) {
      return res.status(200).json({
        success: true,
        message: "user unblocked successfully!",
        user: user,
      });
    }

    throw new Error("Internal error, please try again");
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

export const blockProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await ProductModel.findByIdAndUpdate(
      productId,
      { isBlocked: true },
      { new: true }
    );

    if (product) {
      return res.status(200).json({
        success: true,
        message: "product blocked successfully!",
        product: product,
      });
    }

    throw new Error("Internal error, please try again");
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

export const unblockProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await ProductModel.findByIdAndUpdate(
      productId,
      { isBlocked: false },
      { new: true }
    );

    if (product) {
      return res.status(200).json({
        success: true,
        message: "product unblocked successfully!",
        product: product,
      });
    }

    throw new Error("Internal error, please try again");
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

export const verifyProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await ProductModel.findByIdAndUpdate(
      productId,
      { isVerified: true },
      { new: true }
    );

    if (product) {
      return res.status(200).json({
        success: true,
        message: "product verified successfully!",
        product: product,
      });
    }

    throw new Error("Internal error, please try again");
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

export const getVerifiedProducts = async (req, res) => {
  try {
    const verifiedProducts = await ProductModel.find({ isVerified: true });

    if (!verifiedProducts.length) {
      return res
        .status(404)
        .json({ success: false, message: "No verified products!" });
    }

    return res.status(200).json({ success: true, product: verifiedProducts });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

export const getUnverifiedProducts = async (req, res) => {
  try {
    const unVerifiedProducts = await ProductModel.find({ isVerified: false });

    if (!unVerifiedProducts.length) {
      return res
        .status(404)
        .json({ success: false, message: "No unverified products!" });
    }
    return res.status(200).json({ success: true, product: unVerifiedProducts });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

export const getBlockedProducts = async (req, res) => {
  try {
    const blockedProducts = await ProductModel.find({ isBlocked: true });

    if (!blockedProducts.length) {
      return res
        .status(200)
        .json({ success: false, message: "No blocked products!" });
    }
    return res.status(200).json({ success: true, product: blockedProducts });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};
