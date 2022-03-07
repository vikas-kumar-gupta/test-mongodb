const express = require("express");
const app = express();
const mongoose = require("mongoose");

const User = require("./models/user");
const UserDetail = require("./models/user_details");

const port = 3001;

//  MongoDB connection part

mongoose.connect("mongodb://localhost:27017/sample");

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("Connection Successful!");
});

app.use(express.json());

/*
    TODO: 
        TASKS                                                 --STATUS--  
    1. post - Signup user                                       Done
    2. post - login                                             Done
    3. get - /user/usernam                                      Done
    4. get - /user/user-list                                    Done
    5. put - /user/username/edit                                --pending
    6. delete - /user/username/delete                           Done 
*/

// API routes

app.get("/", (req, res) => {
  res.send("Welcome on landing page");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username, password: password }, (err, result) => {
    if (err) {
      res.send("some error occurred");
    } else {
      if (result) {
        res.send("autorized person");
      } else {
        res.send("incorrect username or password");
      }
    }
  });
});

app.get("/user/user-list", async (req, res) => {
  User.find({}, (err, data) => {
    if (err) {
      res.send("some error occurred");
    } else {
      res.send(data);
    }
  }).populate("user_detail");
});

app.get("/user/:username", async (req, res) => {
  const username = req.params.username;
  const data = await User.findOne({ username: username }).populate(
    "user_detail"
  );
  if (data) {
    res.send(data);
  } else {
    res.send(`can not find user with username: ${username}`);
  }
});

app.delete("/user/:username/delete", async (req, res) => {
  const username = req.params.username;
  User.findOneAndDelete({ username: username }, (err, data) => {
    if (err) {
      res.send("some error occurred");
    } else {
        if(data) {
            res.send('Data deleted successfully');
        } else {
            res.send('Could not find user')
        }
    }
  });
});

app.post("/sign-up", async (req, res) => {
  const { username, password, firstName, lastName, phoneNumber } = req.body;
  const userDetail = new UserDetail({
    _id: new mongoose.Types.ObjectId(),
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
  });

  await userDetail.save((err) => {
    if (err) return handleError(err);
    const user = new User({
      username: username,
      password: password,
      user_detail: userDetail._id,
    });

    user.save((err) => {
      if (err) return handleError(err);
    });
  });
  res.send(`new data inserted successfully`);
});

app.listen(port, (req, res) => {
  console.log(`listening on port ${port}`);
});
