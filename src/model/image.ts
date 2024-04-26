import mongoose, { Schema } from "mongoose";

// Define Image schema
const ImageSchema: Schema = new mongoose.Schema({
  image_link: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Define and export Image model
const Image: any =
  mongoose.models.Image || mongoose.model("Image", ImageSchema);
export default Image;
