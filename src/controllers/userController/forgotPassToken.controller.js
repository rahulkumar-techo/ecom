import User from "../../models/user.model.js";
import Errorhandler from "../../../Handler/ErrorHandler.js";
import sendEmail from "../../../mails/sendMail.email.js";
import Response from "../../../Handler/Response.js";

const forgotPassToken = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Errorhandler("User not found with this email");
    }

    const token = await user.createPassword_ResetToken();
    await user.save();

    const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:5000/api/v1//reset-password/${token}'>Click Here</>`;
  
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      html: resetURL,
    };

 
    sendEmail(data);

  return new Response(true,200,{msg:"Password reset link sent successfully",token}).send(res)
  } catch (error) {
    console.error("Error sending forgot password email:", error);

    if (error instanceof Errorhandler) {
        return new Response(false,500,error.message)
    }

    return new Response(false,500,"Internal server error")
  }
};

export default forgotPassToken;
