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
    address: [
      {
        type: Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
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
this.passwordResetExpires =Date.now()+30*60*1000;// 10min
return resettoken;
}

// Compare password method
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("user", UserSchema);

export default User;
