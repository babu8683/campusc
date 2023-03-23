import mongoose from "mongoose";
import randToken from "rand-token";

  const schema = new mongoose.Schema({
    name: {
      type: String,
      default: null,
    },
    lastname: {
      type: String,
      default: "",
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      default: "",
    },
    phone: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      default: "student",
    },
    reg_id: {
      type: Number,
      default: function () {
        return Math.floor(Math.random() * 10000) + 98563;
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  export const User = mongoose.model("User", schema);