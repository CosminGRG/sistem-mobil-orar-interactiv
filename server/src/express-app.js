const express = require("express");
const cors = require("cors");
const { user, group, appointment, orar, search } = require("./api");

module.exports = async (app) => {
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());
  app.use(express.static(__dirname + "/public"));

  user(app);
  group(app);
  appointment(app);
  orar(app);
  search(app);
};
