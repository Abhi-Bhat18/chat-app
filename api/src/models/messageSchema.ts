import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Conversation",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
  },
  sentBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  readBy: [{ type: mongoose.SchemaTypes.ObjectId }]
}, {
  timestamps: true
});

export default mongoose.model("Message", messageSchema);
