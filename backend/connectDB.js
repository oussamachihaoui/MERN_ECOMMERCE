import mongoose from "mongoose";

const connect = async () => {
  try {
    const tryToConnect = await mongoose.connect(process.env.db_url);
    console.log(
      `MongoDB is connected successfully at host ${tryToConnect.connection.host}`
    );
  } catch (error) {
    console.log(error);
  }
};

export default connect;
