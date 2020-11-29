import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/user.js";
import posts from "./data/posts.js";
import User from "./models/userModel.js";
import Post from "./models/postModel.js";

import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Post.deleteMany();
    await User.deleteMany();

    const createdUser = await User.insertMany(users);
    const adminUser = createdUser[0]._id;

    const samplePosts = posts.map((post) => {
      return { ...post, user: adminUser };
    });
    await Post.insertMany(samplePosts);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Post.deleteMany();
    await User.deleteMany();
    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
