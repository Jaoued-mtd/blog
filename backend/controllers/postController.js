import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";

// @desc    Fetch all posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  const pageSize = 6;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Post.countDocuments({ ...keyword });
  const posts = await Post.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ posts, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single post
// @route   GET /api/posts/:id
// @access  Public
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error("Aucun Post");
  }
});

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private/Admin
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    await post.remove();
    res.json({ message: "Post supprimé" });
  } else {
    res.status(404);
    throw new Error("Aucun Post");
  }
});

// @desc    Create a post
// @route   POST /api/posts
// @access  Private/Admin
const createPost = asyncHandler(async (req, res) => {
  const post = new Post({
    name: "Sample nom",
    user: req.user._id,
    image: "/images/sample.jpg",
    category: "Sample categorie",
    readTime: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdPost = await post.save();
  res.status(201).json(createdPost);
});

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private/Admin
const updatePost = asyncHandler(async (req, res) => {
  const { name, description, image, category, readTime } = req.body;

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
    throw new Error("Aucun Post");
  }
});

// @desc    Create new review
// @route   POST /api/posts/:id/reviews
// @access  Private
const createPostReview = asyncHandler(async (req, res) => {
  const { comment } = req.body;

  const post = await Post.findById(req.params.id);

  if (post) {
    const alreadyReviewed = post.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Vous avez déjà commenté ce post");
    }

    const review = {
      name: req.user.name,
      comment,
      user: req.user._id,
    };

    post.reviews.push(review);

    post.numReviews = post.reviews.length;

    post.rating =
      post.reviews.reduce((acc, item) => item.rating + acc, 0) /
      post.reviews.length;

    await post.save();
    res.status(201).json({ message: "Commentaire ajouté" });
  } else {
    res.status(404);
    throw new Error("Aucun Post");
  }
});

// @desc    Get top rated postss
// @route   GET /api/posts/top
// @access  Public
const getTopPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).sort({ rating: -1 }).limit(3);

  res.json(posts);
});

export {
  getPostById,
  getPosts,
  getTopPosts,
  createPost,
  createPostReview,
  updatePost,
  deletePost,
};
