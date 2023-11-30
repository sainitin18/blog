import express from "express";
import { getAllBlogsController, createBlogController, updateBlogController, getBlogByIdController, deleteBlogController, userBlogController } from "../controllers/blogController.js";
//router
const router = express.Router();

//GET all blogs
router.get('/all-blogs', getAllBlogsController);

//POST blog
router.post('/create-blog', createBlogController);

//PUT blog
router.put('/update-blog/:id', updateBlogController);

//Get one blog
router.get('/one-blog/:id', getBlogByIdController);

//DELETE blog
router.delete('/delete-blog/:id', deleteBlogController);

//GET || user blog
router.get('/user-blog/:id', userBlogController);

export default router;