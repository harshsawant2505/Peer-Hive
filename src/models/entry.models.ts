
import mongoose from "mongoose";
import { Schema } from "mongoose";

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});


const entrySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    des: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      
    },
    organization: {
      type: String,
      
    },
    college: {
      type: String,
    },
    owner:{
      type: String,
    },
    members:[String],
    budget:{
      type: Number,
      default:0
    },
    expenses: [expenseSchema],
  },

);

const Entry = mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default Entry;
