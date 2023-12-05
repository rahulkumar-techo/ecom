import Errorhandler from "../../Handler/ErrorHandler.js";
import mongoose from "mongoose";
import Response from "../../Handler/Response.js";

async function db_connection() {
  try {
    const isConnected = await mongoose.connect(
      `mongodb+srv://${process.env.MONGOOSE_USERNAME}:${process.env.MONGOOSE_PASSWORD}@cluster1.fe0jso1.mongodb.net/ecom?retryWrites=true&w=majority`
    );

    if (isConnected) {

      console.log(
        new Response(true, 201, {
          msg: "Database is connected",
          host: isConnected.connection.host,
        })
      );
    } else {
      console.error(new Errorhandler("Not able to connect", 500));
    }
  } catch (error) {
    console.error(new Errorhandler("Not able to connect", 500, error));
  }
}

export default db_connection;
