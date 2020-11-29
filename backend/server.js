import express from "express";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import colors from "colors";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();
connectDB();
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// ROUTES
app.use("/api/posts", postRoutes);

// make folder statics

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// ERROR MIDDLEWARE
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT} `.yellow.bold
  )
);
