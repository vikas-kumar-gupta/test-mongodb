const express = require("express");
const app = express();
const mongoose = require("mongoose");

const User = require("./models/user");
const UserDetail = require("./models/user_details");

const port = 3000;

mongoose.connect("mongodb://localhost:27017/sample");

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("Connection Successful!");
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome on landing page");
});

// app.post("/seed-data", async (req, res) => {
//   const { username, password, firstName, lastName, phoneNumber } = req.body;
//   const userData = {
//     username: username,
//     password: password,
//   };
//   const userDetailsData = {
//     firstName: firstName,
//     lastName: lastName,
//     phoneNumber: phoneNumber,
//   };
//   const user = await User.create(userData, (err, result) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send("user data inserted successfully");
//     }
//   });

//   const userDetail = await UserDetail.create(userDetailsData, (err, result) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send("user details data inserted successfully");
//     }
//   });
// });

app.post("/sign-up", async (req, res) => {
  const { username, password, firstName, lastName, phoneNumber } = req.body;
  const user = new User({
      _id: new mongoose.Types.ObjectId(),
      username: username,
      password: password 
  });
  
  await user.save((err)=> {
      if(err) return handleError(err);

      const userDetail = new UserDetail({
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        user: user._id
      });

      userDetail.save(err => {
          if(err) return handleError(err);
      })
  });
  res.send(`new data inserted successfully`);
});


app.listen(port, (req, res) => {
  console.log(`listening on port ${port}`);
});
