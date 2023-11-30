import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username required']
    },
    email: {
        type: String,
        required: [true, 'email required']
    },
    password: {
        type: String,
        required: [true, 'password required']
    },
    blogs: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Blog',
        }
    ]
},
    { timestamps: true },
)


//model
const userModel = mongoose.model('User', userSchema);

export default userModel;