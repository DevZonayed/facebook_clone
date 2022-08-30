// Import all uimportant files
import mongoose from "mongoose";

const mongoConnection = async () => {
  try {
    const mongoString = process.env.MONGO_STRING;
    const mongoConnection = await mongoose.connect(mongoString);
    console.log(`Database Connect Successfully`.bgGreen.black);
  } catch (err) {
    console.log(`${err}`.bgRed.white);
  }
};

export default mongoConnection;
