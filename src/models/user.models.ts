
import mongoose from "mongoose";
import { Schema } from "mongoose";

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profilePic: {
        type: String,
    },
    role: {
        type: String,
        default: "user",
    },
    budget:{
      type: Number,
      default:0
    },
    expenses: [expenseSchema],
  },

);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
