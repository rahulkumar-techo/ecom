import crypto from "crypto";

// Utility function to generate a password reset token
 const generatePasswordResetToken = async (user) => {
  const resetToken = crypto.randomBytes(32).toString("hex");
  user.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  user.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 30 minutes expiration
  await user.save();
  return resetToken;
};

// Implement the function to send a password reset email (replace this with your actual email sending logic)
 const sendPasswordResetEmail = async (email, resetToken) => {
  // Implement email sending logic here
  // You might use a library like Nodemailer or an email service provider
  console.log(`Sending password reset email to ${email} with token: ${resetToken}`);
};



export {generatePasswordResetToken,sendPasswordResetEmail}