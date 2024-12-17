const jwt = require("jsonwebtoken");

exports.generateToken = (userData) => {
  // console.log("generateToken", userData)
  const token = process.env.JWT || "JWT_TOKEN_SAMPLE";
  console.log(token);
  return jwt.sign(
    {
      _id: userData._id,
      // username: userData.username,
      email: userData.email,
      password: userData.password
    },
    token,
    {
      expiresIn: "7d",
    }
  );
};

exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT);
  } catch (error) {
    return null;
  }
};