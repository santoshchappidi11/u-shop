import UserModel from "../Models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body.userData;
    if (!name || !email || !password || !role)
      return res.json({ success: false, message: "All fields are required!" });

    const isEmailExist = await UserModel.find({ email: email });
    if (isEmailExist.length) {
      return res.json({
        success: false,
        message: "This email already exists, try different email!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({ name, email, password: hashedPassword, role });
    await user.save();
    return res.json({
      success: true,
      message: "Registration successfull!",
    });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body.userData;
    if (!email || !password)
      return res.json({ success: false, message: "All fields are required!" });

    const user = await UserModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found!" });

    if (user.isBlocked) {
      return res.json({
        success: false,
        message: "You have been blocked!",
      });
    }

    const isPasswordRight = await bcrypt.compare(password, user.password);

    if (isPasswordRight) {
      const userObject = {
        name: user.name,
        email: user.email,
        userId: user._id,
        role: user.role,
      };

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      return res.json({
        success: true,
        message: "Login successfull",
        user: userObject,
        token: token,
      });
    }
    return res.json({ success: false, message: "Password is wrong" });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "Token is required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Not a valid json token!" });

    // return res.send(decodedData);

    const userId = decodedData?.userId;

    const user = await UserModel.findById(userId);

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });

    const userObj = {
      name: user?.name,
      email: user?.email,
      role: user?.role,
      _id: user?._id,
    };

    return res.status(200).json({ success: true, user: userObj });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

export const updateUserDetails = async (req, res) => {
  try {
    const { name, password } = req.body.editProfile;
    const { token } = req.body;

    if (name || password) {
      if (!token)
        return res
          .status(404)
          .json({ success: false, message: "Token is required!" });

      const decodedData = jwt.verify(token, process.env.JWT_SECRET);

      if (!decodedData)
        return res
          .status(404)
          .json({ success: false, message: "Not a valid token!" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const userId = decodedData.userId;

      const user = await UserModel.findById(userId);
      // console.log(user);

      if (user) {
        if (name?.length) {
          user.name = name;
        }
        if (password?.length) {
          user.password = hashedPassword;
        }
        await user.save();

        const userObject = {
          name: user?.name,
          email: user?.email,
          userId: user?._id,
          role: user?.role,
          number: user?.number,
        };
        return res.status(200).json({
          success: true,
          message: "Profile updated successfully!",
          user: userObject,
        });
      }

      return res
        .status(404)
        .json({ success: false, message: "No user found to update!" });
    }

    return res.status(404).json({
      success: false,
      message: "please change atleast one field to update your profile!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
