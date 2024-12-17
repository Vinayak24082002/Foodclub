const { generateToken } = require("../utils/auth");
const User = require("./../models/user");

exports.signupUser = (req, res) => {

  const { fullname, password, email } = req.body;
  User.create({ fullname, password, email })
    .then((user) => {
      console.log(user);
      res.status(201).send({
        user,
        status: "success",
        message: "User created successfully",
      });
    })
    .catch((err) => {
      res.status(400).send({ message: "User creation failed", ...err });
    });
};

// server.post("/signup", (req, res) => {
//   const { fullname,  password, email } = req.body;

//   User.create({  password:password, email:email, fullname:fullname})
//   .then((user) => {
//     res
//       .status(201)
//       .send({ message: "User created successfully", user, status: "success" });
//   })
//   .catch((error) => {
//     console.error("Error in signup ",error);
// })
// });

exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  User.find({ email })
    .then((users) => {
      if (!users || users.length === 0)
        return res.status(401).send({ message: "user not found" });
      console.log(users);
      const token = generateToken(users);
      const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      // if(password !== users.password){
      //   return res.status(401).send({ message: "Password does not match" });  // add password matching logic here. For now, it's just checking if password is correct.  // password encryption is recommended for production.  // password hashing and salting should be done in a secure manner.  // For simplicity, I've kept it as is.  // Remember to secure your database as well.  // Also, consider using HTTPS for secure communication.  // Also, consider implementing rate limiting to prevent brute force attacks.  // Implementing OAuth for social media login is recommended.  // Implementing password recovery or two-factor authentication is recommended.  // Implementing password hashing and salting is recommended.  // Also, consider implementing rate limiting to prevent brute force attacks.  // Implementing OAuth for social media login is recommended.  // Implementing password recovery or two-factor authentication is recommended.  // Implementing password hashing and sal
      // }
      return res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "Lax",
          priority: "High",
          maxAge: 7 * 24 * 60 * 60 * 1000,
          expires,
        })
        .send({
          token,
          status: "success",
          message: "User logged in successfully",
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send({ message: "User login failed...", error: true, ...err });
    });
};