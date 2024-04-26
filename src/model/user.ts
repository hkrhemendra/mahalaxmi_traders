import mongoose, { Schema } from "mongoose";

// Define User schema
const UserSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  pan: { type: String, required: true, unique: true},
  aadhar_number: { type: String, required: true, unique: true},
  dob: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  is_admin: { type: Boolean, default: false},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Define and export User model
const User: any =
  mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
