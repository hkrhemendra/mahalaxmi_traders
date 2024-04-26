import mongoose, { Schema } from "mongoose";

// Define User schema
const PortfolioSchema= new mongoose.Schema({
  date: { type: Date, default: Date.now },
  stock_name: { type: String, required: true },
  buy_price: { type: String, required: true },
  buy_quantity: { type: String, required: true },
  sell_price: { type: String, required: true },
  sell_quantity:{ type: String, required: true },
  profit: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
});

// Define and export User model
const Portfolio: any =   mongoose.models.Portfolio || mongoose.model("Portfolio", PortfolioSchema);
export default Portfolio;
