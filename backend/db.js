import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.saotj.mongodb.net/secu-job?retryWrites=true&w=majority&appName=Cluster0`
      // secu-job in the url is the database name
      //   {
      //     useNewUrlParser: true,
      //     useUnifiedTopology: true,
      //   }
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
