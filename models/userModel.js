const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    pnum: {
      type: String,
      require: true,
      unique: true,
    },
    address: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: Boolean,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Euser", userSchema);
