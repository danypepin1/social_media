import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        location: {
            type: String,
        },
        description: {
            type: String,
        },
        location: {
            type: String,
        },
        likes: {
            type: Map,
            of: Boolean
        },
        comments: {
            types: Array,
            default: []
        }
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;