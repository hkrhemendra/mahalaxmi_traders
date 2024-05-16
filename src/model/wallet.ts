import mongoose, { Schema } from "mongoose";

// Define User schema
const WalletSchema = new mongoose.Schema(
  {
    invested_amount: { type: String, required: true },
    transaction_type: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Define and export User model
const Wallet: any =
  mongoose.models.Wallet || mongoose.model("Wallet", WalletSchema);
export default Wallet;
