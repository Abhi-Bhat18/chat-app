import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  members: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
  groupType: {
    type: "String",
    enum: ["PUBLIC", "PRIVATE"],
  },
  admin: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  groupName: {
    type: String,
    required: true,
  },
  currentTopic: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Group", groupSchema);
