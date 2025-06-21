import mongoose, { model, Schema } from 'mongoose';

// ✅ USER SCHEMA
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true, // ✅ fixed
  },
  email: {
    type: String, // ✅ fixed
    unique: true,
    required: true, // ✅ fixed
  },
  password: {
    type: String,
    required: true, // ✅ fixed
  },
});

export const userModel = model("user", userSchema);

// ✅ CONTENT SCHEMA
const contentSchema = new Schema({
  title: { type: String },
  type: { type: String },
  link: { type: String },
  tags: [String], // ✅ fixed
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true, // ✅ fixed
  },
});

export const contentModel = model("content", contentSchema);

// ✅ LINK SCHEMA
const linkSchema = new Schema({
  hash: String,
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true, // ✅ fixed
    unique: true,
  },
});

export const linkModel = model("Links", linkSchema);
