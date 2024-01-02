"use server";

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: String,
  bio: String,
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  onboarded: {
    type: Boolean,
    default: false,
  },
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
  likedThreads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  repostedThreads: [
    {
      originalThreadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread",
      },
      repostedText: {
        type: String,
      },
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
