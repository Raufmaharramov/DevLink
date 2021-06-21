const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length === 0) {
        throw new Error("Please provide a valid name!");
      }
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Please provide a valid email address!");
      }
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password"!');
      }
    }
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

UserSchema.statics.getByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Please authenticate!");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Please authenticate!");
  }
  return user;
};

UserSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JSONTOKEN, { expiresIn: "7 days" });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

module.exports = User = mongoose.model("user", UserSchema);
