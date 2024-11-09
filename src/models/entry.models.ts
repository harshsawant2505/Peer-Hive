
import mongoose from "mongoose";
import { Schema } from "mongoose";



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
    }
  },

);

const Entry = mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default Entry;
