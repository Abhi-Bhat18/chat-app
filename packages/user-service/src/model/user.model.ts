import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  imgUrl: {
    type: String,
  },
  password: {
    type: String,
  },
});

export default mongoose.model("User", userSchema);
