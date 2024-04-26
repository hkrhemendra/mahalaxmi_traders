import mongoose, { Schema } from "mongoose";

// Define User schema
const WithdrawalSchema = new mongoose.Schema(
  {
    account_holder: { type: String, required: true },
    amount: { type: String, required: true },
    account_number: { type: String, required: true },
    ifsc_code: { type: String, required: true },
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
const Withdrawal: any =
  mongoose.models.Withdrawal || mongoose.model("Withdrawal", WithdrawalSchema);
export default Withdrawal;
