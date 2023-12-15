import { isValidObjectId } from "mongoose";
import Blog from "../../models/blog.model.js";
import Response from "../../../Handler/Response.js";


// =============💔==LIKED==💔=============
const like_blog = async (req, res) => {
  const { blogId } = req.body;

  if (!isValidObjectId(blogId)) {
    return new Response(false, 404, "not a valid blog Id").send(res);
  }

  // Find the blog which you want to be liked
  const blog = await Blog.findById(blogId);

  // find the login user
  const loginuserId = req?.user?._id;

  // find if the user liked the blog (Boolean)
  const isLiked = blog.isLiked;

  // if the user has already disliked the blog
  const alreadyDisLiked = blog?.dislikes?.find(
    (userId) => userId?.toString() === loginuserId?.toString()
  );

  if (alreadyDisLiked) {
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginuserId },
        isDisliked: false,
      },
      { new: true }
    );
    console.log("alreadyDisliked", Boolean(updatedBlog));
  }

  if (isLiked) {
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginuserId },
        isLiked: false,
      },
      { new: true }
    );
    return new Response(true, 200, updatedBlog).send(res);
  } else {
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: loginuserId },
        isLiked: true,
      },
      { new: true }
    );
    return new Response(true, 200, updatedBlog).send(res);
  }
};

// =============💔==DISLIKED==💔=============
const dislike_blog = async (req, res) => {
  const { blogId } = req.body;

  try {
    if (!isValidObjectId(blogId)) {
      return new Response(false, 404, "not a valid blog Id").send(res);
    }

    // Find the blog which you want to be disliked
    const blog = await Blog.findById(blogId);

    // is Disliked or not (Boolean)
    const isdisliked = blog.isDisliked;

    // find the login user or user all details
    const loginuserId = req?.user?._id;

    // if the user has already liked the blog
    const alreadyLiked = blog?.likes?.find(
      (userId) => userId?.toString() === loginuserId?.toString()
    );

    if (alreadyLiked) {
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        { $pull: { likes: loginuserId }, isLiked: false },
        { new: true }
      );
      console.log("already Liked", Boolean(alreadyLiked));
    }

    if (isdisliked) {
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        { $pull: { dislikes: loginuserId }, isDisliked: false },
        { new: true }
      );
      return new Response(true, 200, updatedBlog).send(res);
    } else {
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        { $push: { dislikes: loginuserId }, isDisliked: true },
        { new: true }
      );
      return new Response(true, 200, updatedBlog).send(res);
    }
  } catch (error) {
    throw new Error(error);
  }
};

export { like_blog, dislike_blog };
