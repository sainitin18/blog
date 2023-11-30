import mongoose from "mongoose";
import blogModel from "../models/blogModel.js";
import userModel from "../models/userModel.js";

//get all blogs
export const getAllBlogsController = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate("user");
        if (!blogs) {
            return res.status(200).send({
                success: false,
                message: "Blogs not found",
            })
        }
        return res.status(200).send({
            success: true,
            TotalBlogs: blogs.length,
            message: "Blogs List",
            blogs,
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error to find blogs",
        })
    }
}

//post blog
export const createBlogController = async (req, res) => {
    try {
        const { title, description, image, user } = req.body;
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: "Please provide all above details",
            })
        }
        const existingUser = await userModel.findById(user);
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: "Unable to find user",
            })
        }
        const newBlog = new blogModel({ title, description, image, user });
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({ session });
        existingUser.blogs.push(newBlog);
        await existingUser.save({ session });
        await session.commitTransaction();
        await newBlog.save();
        return res.status(200).send({
            success: true,
            message: "Successfully created a blog",
            newBlog,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error to create",
        })
    }
}

//update blog
export const updateBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image } = req.body;
        const updatedBlog = await blogModel.findByIdAndUpdate(id, {
            title,
            description,
            image,
        }, { new: true });
        return res.status(200).send({
            success: true,
            message: "Successfully updated",
            updatedBlog,
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            messsage: "Error to Update the blog",
        })
    }
}

//get one blog
export const getBlogByIdController = async (req, res) => {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
        return res.status(404).send({
            success: false,
            message: "No blog with this id",
        })
    }
    return res.status(200).send({
        success: true,
        message: "Blog found",
        blog,
    })
}

//delete blog
export const deleteBlogController = async (req, res) => {
    try {
        const blog = await blogModel
            .findByIdAndDelete(req.params.id)
            .populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).send({
            success: true,
            message: "Successfully deleted",
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error in Deletion",
        })
    }
}

//GET User Blog
export const userBlogController = async (req, res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate("blogs")
        if (!userBlog) {
            return res.status(404).send({
                succes: false,
                message: "Can't find blogs with that id",
            })
        }
        return res.status(200).send({
            success: true,
            message: "User blogs",
            userBlog,
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error to get user blog",
        })
    }
}



