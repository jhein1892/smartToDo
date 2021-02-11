/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const database = require("../database");

module.exports = (db) => {
  router.post("/login", (req, res) => {
    const username = req.body.user;
    database.getUser(username)
      .then((user) => {
        console.log("Logged in as (id): ", user.id);
        res.cookie("user_id", user.id);
        res.redirect("/todo");
      })
      .catch((err) => err);
  });

  router.post("/logout", (req, res) => {
    res.clearCookie("user_id");
    res.redirect("/");
  });

  return router;
};

