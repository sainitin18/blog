import express from "express";
import { getAllUsers, loginController, registerController, getUserProfileController, updateProfileController } from "../controllers/userController.js";

//router
const router = express.Router();

//get all users
router.get('/all-users', getAllUsers);

//create post
router.post('/register', registerController);

//login
router.post('/login', loginController);

//profile
router.get('/profile/:id', getUserProfileController);

//update profile
router.put('/update-profile/:id', updateProfileController);

export default router;