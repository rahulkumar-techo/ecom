// Import All files
import Response from "./Handler/Response.js";
import app from "./app.js";
import db_connection from "./src/configs/db.js";
const port = process.env.PORT;
import router from "./src/routers/auth.routers.js";
import express from "express"
import expressAsyncHandler from "express-async-handler";
import cookieParser from "cookie-parser";

// use middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/api/v1", router);
app.use(expressAsyncHandler)


db_connection();
app.listen(port, () => {
  console.log({
    msg: `server successfully running on`,
    port: port,
  });
});
