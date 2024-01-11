import mongoose from "mongoose";

const connectToMongoDB = async (url: string) => {
    try {
        await mongoose.connect(url)
        console.log("MongoDB Connected successfully");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectToMongoDB;