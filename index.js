// Import All files
import app from "./app.js";
import db_connection from "./src/configs/db.js";
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
// Functions and router
import router from "./src/routers/auth.routers.js";
import product_router from "./src/routers/product.router.js";
import blog_router from "./src/routers/blog.routes.js";
import categories_route from "./src/routers/category.routes.js";
import blogCat_router from "./src/routers/blogCat.routes.js";
import brand_router from "./src/routers/brand.routes.js";
import productCat_route from "./src/routers/productCat.routes.js";

const port = process.env.PORT;

// Establish database connection
db_connection();

// Use middlewares
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("./public"));
app.use(express.static("./upload"));
// version of your app.
const v1 = "v1";
// working routes
app.use(`/api/${v1}/productcat`, productCat_route)
app.use(`/api/${v1}/product`, product_router);
app.use(`/api/${v1}/blog`, blog_router);
app.use(`/api/${v1}/category`, categories_route);
app.use(`/api/${v1}/blog-categoy`, blogCat_router);
app.use(`/api/${v1}/brand`, brand_router);
//  <========🍀===Main Router==🍀==============>
app.use("/api/v1", router);

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
