const mongoose = require("mongoose");
const { mongoURL } = require("../constant.js");

const dbConnection = async () => {
  try {
    const dbInstance = await mongoose.connect(`${mongoURL}/chatApp`);
    console.log(`the database is connected to ${dbInstance.connection.port}`);
  } catch (error) {
    console.log("some error inside the database connection");
    console.log(error);
    process.exit(1);
  }
};

module.exports = dbConnection;
