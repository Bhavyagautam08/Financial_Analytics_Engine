import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },

    email: {
      type: String,
      unique: true,
      required: true,
      index: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    currency: {
      type: String,
      default: "INR",
      enum: ["USD", "INR"]
    },

    avatar: {
      type: String,
      default: "avatar1",
      enum: ["avatar1", "avatar2", "avatar3", "avatar4", "avatar5", "avatar6", "avatar7", "avatar8"]
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  try {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  } catch (error) {
    throw new Error(error);
  }
});

const User = mongoose.model("User", userSchema);
export default User;
