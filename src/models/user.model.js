import mongoose, { Schema } from "mongoose";
import crypto from "crypto"
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: Array,
      default: [],
    },
    refreshToken: {
      type: String,
    },
    address:{type:String},
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(this.password, salt);

    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.createPassword_ResetToken = async function(){
const resettoken = crypto.randomBytes(32).toString("hex");
this.passwordResetToken= crypto.createHash("sha256").update(resettoken).digest("hex");
const days=30;
const time_durations = days * 24 * 60 * 60 * 1000;
const expirationDate = new Date(Date.now() + time_durations);

this.passwordResetExpires =expirationDate //30 days
return resettoken;
}

// Compare password method
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);

export default User;
