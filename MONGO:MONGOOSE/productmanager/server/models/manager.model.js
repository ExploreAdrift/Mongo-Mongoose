const mongoose = require("mongoose");

const ManagerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "TITLE IS REQUIRED"],
      minlength: [3, "Description must be longer than 3 characters"],
    },
    price: {
      type: String,
      required: [true, "PRICE IS REQUIRED"],
      min: [0, "Price must be longer than no characters"],
    },
    description: {
      type: String,
      required: [true, "DESCRIPTION IS REQUIRED"],
      minlength: [2, "Description must be longer than 2 characters"],
    },
  },
  { timestamps: true }
);

const Manager = mongoose.model("Manager", ManagerSchema);

module.exports = Manager;
