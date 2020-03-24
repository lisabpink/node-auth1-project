const express = require("express");

const usersRouter = require("../users/users-router");

const server = express();

server.use(express.json());

server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.json({ api: "running" });
});

module.exports = server;