const mongoose = require("mongoose");
const mongooURI = "mongodb://0.0.0.0:27017/inotebook";

const connectToMongo = async () => {
  mongoose.connect(mongooURI, await console.log("Your database got connected"));
};

module.exports = connectToMongo;
