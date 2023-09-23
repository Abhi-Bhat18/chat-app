import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  members: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
  convType : {
    type  : String,
    enum : ['GROUP','INDIVIDUAL']
  },
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
},{
  timestamps : true
});

export default mongoose.model("Conversation", conversationSchema);
