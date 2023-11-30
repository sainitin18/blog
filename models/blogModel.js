import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title  required'],
    },
    description: {
        type: String,
        required: [true, 'Description required'],
    },
    image: {
        type: String,
        required: [true, 'Image required'],
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'User id required'],
    }
},
    { timestamps: true },
)

//model
const blogModel = mongoose.model('Blog', blogSchema);

export default blogModel;