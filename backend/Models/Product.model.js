import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  image: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  isBlocked: {
    type: Boolean,
    default: false,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  // ratings: {
  //   type: [Number],
  //   enum: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
  // },

  comments: {
    type: [Object],
  },

  avgRating: {
    type: Number,
    default: 3.5,
  },

  gender: {
    type: String,
    default: "Any",
  },
});

export default mongoose.model("Product", productSchema);
