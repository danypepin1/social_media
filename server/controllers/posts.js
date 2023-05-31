import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            like: {},
            comments: []
        })
        await newPost.save();
        //return all posts to frontend so it's updated with new post.
        const post = await Post.find();

        res.status(201).json(post);
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

/* READ */
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({userId});
        res.status(200).json(post);

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}


/* UPDATE */
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        //grab post infos
        const post = await Post.findById(id);
        //grab if user liked it or not
        const isLiked = post.likes.get(userId);


        if(isLiked) {
            //delete user if it's liked
            post.likes.deleted(userId);
        } else{
            post.likes.set(userId, true);
        }

        //pass the new likes to the post
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );

        res.status(200).json(updatedPost);

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}
