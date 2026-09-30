import User from "../models/User.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({
            username,
            email,
            password
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        return res.status(201).json({
            message: "User registered successfully",
            token,
            userId: newUser._id,
            user: { username: newUser.username, email: newUser.email }
        });

    } catch (error) {
        console.error("Register Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        return res.status(200).json({
            message: "Login successful",
            token,
            userId: user._id,
            user: { username: user.username, email: user.email }
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getProfile = async (req, res) => {
    try {
        console.log("Fetching profile for user ID:", req.user._id);
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            console.log("User not found in DB");
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error("Profile Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update user avatar
export const updateAvatar = async (req, res) => {
    try {
        const { avatar } = req.body;
        const validAvatars = ["avatar1", "avatar2", "avatar3", "avatar4", "avatar5", "avatar6", "avatar7", "avatar8"];

        if (!avatar || !validAvatars.includes(avatar)) {
            return res.status(400).json({ message: "Invalid avatar selection" });
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { avatar },
            { new: true }
        ).select("-password");

        return res.status(200).json({
            message: "Avatar updated successfully",
            user
        });
    } catch (error) {
        console.error("Avatar Update Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
