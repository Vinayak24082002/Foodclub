const mongoose = require("mongoose");

exports.connectMongoDb = (database_name) => {
  const conncettionURl = `${
    process.env.MONGODB_URL || "mongodb://127.0.0.1:27017"
  }/${process.env.MONGODB || database_name}`;
  console.log("Trying to connect on : ", conncettionURl);
  mongoose
    .connect(conncettionURl)
    .then((d) => {
      console.log("MongoDB Connected successfully ");
    })
    .catch((err) => {
      console.error("error connecting to MongoDB", err);
    });
};
