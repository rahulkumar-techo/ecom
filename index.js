// Import All files
import app from "./app.js";
import db_connection from "./src/configs/db.js";
import express from "express";
import cookieParser from "cookie-parser";
import router from "./src/routers/auth.routers.js";
import productCatRouter from "./src/routers/blogProductCategory.router.js";

const port = process.env.PORT;

// Establish database connection
db_connection();

// Use middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use routers
app.use("/api/v1", router);
app.use("/api/v1/blog-category", productCatRouter);

// Error handler middleware for unhandled errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// Start the server
app.listen(port, () => {
  console.log({
    msg: "Server successfully running on",
    port: port,
  });
});
