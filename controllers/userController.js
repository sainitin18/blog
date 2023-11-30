import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
//user register
export const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "Fill all the details",
            })
        }
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(401).send({
                success: false,
                message: "User is existing",
            })
        }
        //hashing the password
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ username, email, password: hashPassword });
        await user.save();
        return res.status(201).send({
            success: true,
            message: "New User Created",
            user,
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in registration",
        })
    }
};

//user
export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        return res.status(200).send({
            userCount: users.length,
            success: true,
            message: 'all users data',
            users,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            messsage: 'Error to get users',
            error,
        })
    }
};

//user login
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                messasge: 'Provide email or password',
            })
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: 'User not found',
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: 'Invalid email or password',
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Login Successfully',
            user,
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error in login',
            error,
        })
    }
};

// Get user profile
export const getUserProfileController = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await userModel.findById(userId);
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

//update user

export const updateProfileController = async (req, res) => {
    const userId = req.params.id;
    const { username, email } = req.body;

    try {
        const user = await userModel.findByIdAndUpdate(
            userId,
            { username, email },
            { new: true }
        );

        if (user) {
            return res.status(200).json({ message: "Profile updated successfully", user });
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
