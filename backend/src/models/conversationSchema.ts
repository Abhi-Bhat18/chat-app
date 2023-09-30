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
  read: {
    type: Boolean,
    default: false,
  },
});

const conversationSchema = new mongoose.Schema(
  {
    members: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
    convType: {
      type: String,
      enum: ["GROUP", "INDIVIDUAL"],
    },
    groupName: {
      type: String,
    },
    groupDp: { type: String },
    admins: [{ type: mongoose.SchemaTypes.ObjectId }],
    createdBy: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    messages: [messageSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Conversation", conversationSchema);
