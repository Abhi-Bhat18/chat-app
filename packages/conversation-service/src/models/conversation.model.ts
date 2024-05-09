import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    members: [
      {
        userId: { type: String, required: true },
        userName: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String },
        imgUrl: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Conversation", conversationSchema);
