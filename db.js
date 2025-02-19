import mongoose from "mongoose";

// Connect to MongoDB

const connect = async () => {
  try {
    await mongoose.connect("mongodb+srv://parthgondaliya5959:parth@mongodemocluster.ggwxvf5.mongodb.net/TODO-LIST", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  } 
};

export default connect;
