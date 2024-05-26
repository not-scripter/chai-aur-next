import mongoose from "mongoose";

type ConnecttionObject = {
  isConnected?: number;
};

const connection: ConnecttionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("already connected to database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});

    connection.isConnected = db.connections[0].readyState;
    //NOTE: console log db and db.connections for learn more
    // console.log("db : ", db, "db connections : ", db.connections);

    console.log("DB connected succesfully");
  } catch (error) {
    console.log("DB connection failed", error);

    process.exit(1);
  }
}

export default dbConnect;
