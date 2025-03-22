import mongoose from "mongoose";

const connectDatabase = () => {
  console.log("Waiting connecting to the database");
  console.log(process.env)

  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB Atlas Connected"))
    .catch((error) => console.log(error));
};

export default connectDatabase;
