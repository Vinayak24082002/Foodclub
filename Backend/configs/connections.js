// const mongoose = require("mongoose");

// exports.connectMongoDb = (database_name) => {
//   console.log(process.env.MONGODB_URL);
//   const conncettionURl = `${
//     process.env.MONGODB_URL || "mongodb+srv://vinekapppp4567:fsIwgXqdyF9dpPRN@cluster0.0oskj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
//   }/${process.env.MONGODB || database_name}`;
//   console.log("Trying to connect on : ", conncettionURl);
//   mongoose
//     .connect(conncettionURl,  {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       ssl: true,
//       // tlsAllowInvalidCertificates: true,
//     })
//     .then((d) => {
//       console.log("MongoDB Connected successfully ");
//     })
//     .catch((err) => {
//       console.error("error connecting to MongoDB", err);
//     });
// };


const mongoose = require("mongoose");

exports.connectMongoDb = async () => {
    console.log(process.env.MONGO_URI);

  try {
    const conncettionURl = process.env.MONGO_URI;

    await mongoose.connect(conncettionURl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

