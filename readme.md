

```js

import expressAsyncHandler from "express-async-handler";
import User from "../models/user.model.js";

router.route("/get").get(
  expressAsyncHandler(async (req, res) => {
    try {
      const token = User; // Assuming the token is in the "Authorization" header

      if (!token) {
        return res.status(401).json({ message: "Token not provided" });
      }

      const user = await User.findOne({ "tokens.token": token });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      console.log("😁👍");
      // Additional logic with the retrieved user

      return res.status(200).json(user); // Send the user data in the response if needed
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

```