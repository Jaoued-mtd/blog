import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";

/* 
        @desc Fetch all Posts
        @route GET /api/posts
        @access Public      
                                    */

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({});
  res.json(posts);
});

/* 
        @desc Fetch single post
        @route GET /api/posts/:id
        @access Public      
                                    */

const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

/* 
        @desc Delete a Post
        @route DELETE /api/posts/:id
        @access Private - Admin 
                                    */

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    await post.remove();
    res.json({ message: "Post removed" });
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

// @desc    Create a post
// @route   POST /api/posts
// @access  Private/Admin
const createPost = asyncHandler(async (req, res) => {
  const post = new Post({
    name: "Sample name",
    user: req.user._id,
    image: "/images/sample.jpg",
    readTime: 3,
    category: "Sample category",

    numComments: 0,
    description: "Sample description",
  });

  const createdPost = await post.save();
  res.status(201).json(createdPost);
});

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private/Admin
const updatePost = asyncHandler(async (req, res) => {
  const { name, readTime, description, image, category } = req.body;

  const post = await Post.findById(req.params.id);

  if (post) {
    post.name = name;

    post.description = description;
    post.image = image;
    post.readTime = readTime;
    post.category = category;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getPosts, getPostById, updatePost, deletePost, createPost };
