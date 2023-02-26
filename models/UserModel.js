import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    userRole: {
      type: String,
    },
    userId: {
      type: String,
      unique: true,
    },
    userName: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    userPhoneNumber: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const userModel = mongoose.model("User", UserSchema);
