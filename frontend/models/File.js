import mongoose from "mongoose";

const { Schema } = mongoose;

const fileSchema = new Schema(
  {
    emailUser: {
      type: String,
      required: true,
    },
    nameFile: {
      type: String,
      required: true,
    },
    interpretation: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.File || mongoose.model("File", fileSchema);
