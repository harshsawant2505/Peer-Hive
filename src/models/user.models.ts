
import mongoose from "mongoose";
import { Schema } from "mongoose";

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
  },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
