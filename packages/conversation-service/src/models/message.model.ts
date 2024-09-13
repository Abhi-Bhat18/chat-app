import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    message: { type: String, required: true },
    sentBy: { type: String, required: true },
    readBy: [{ type: mongoose.Schema.Types.ObjectId }],
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
