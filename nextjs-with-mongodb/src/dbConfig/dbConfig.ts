import mongoose from "mongoose";

export async function dbConnect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("mongodb connected");
    });
    connection.on("error", (error) => {
      console.log("mongodb connection error", error);
      process.exit;
    });
  } catch (error) {
    console.log("error connecting to db", error);
  }
}
