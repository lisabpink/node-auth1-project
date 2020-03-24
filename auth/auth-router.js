const bcrypt = require("bcryptjs");

const router = require("express").Router();

const Users = require("../users/users-model");

router.post("/register", (req, res) => {
  //define what will be the username & password
  const userInfo = req.body;
  //hash password
  const hash = bcrypt.hashSync(userInfo.password, 8);
  //override password with the hash
  userInfo.password = hash;
  //add user to db
  Users.add(userInfo)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: "Error registering user" });
    });
});

router.post("/login", (req, res) => {
  //destructure username and password
  const { username, password } = req.body;

  //find uesr by username
  Users.findBy({ username })
    .then(([user]) => {
      //if username found & password matches
      if (user && bcrypt.compareSync(password, user.password)) {
        //remember the user & save on server
        req.session.user = {
          id: user.id,
          username: user.username
        };
        res.status(200).json({ hello: user.username, yourCookie: req.session });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Error finding user" });
    });
});

module.exports = router;