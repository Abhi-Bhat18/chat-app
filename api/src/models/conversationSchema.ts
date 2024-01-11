import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    members: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
    convType: {
      type: String,
      enum: ["group", "one-to-one"],
    },
    groupName: {
      type: String,
    },
    groupDp: { type: String },
    admins: [{ type: mongoose.SchemaTypes.ObjectId }],
    createdBy: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    unreadCounts: [{
      userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
      },
      count: { type: Number, default: 0 }
    }],
    lastMessage : { type : mongoose.SchemaTypes.ObjectId, ref : "Message" }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Conversation", conversationSchema);
