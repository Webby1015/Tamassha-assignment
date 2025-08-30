import mongoose from "mongoose";
import dotenv from "dotenv";
console.log(process.env.CONNECTIONSTRING)


dotenv.config();

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTIONSTRING);
    console.log(
      `Database Connected: ${connect.connection.host}, DB: ${connect.connection.name}`
    );
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

export default connectDb;
