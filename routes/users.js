/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const server = require("../server");

module.exports = (db) => {
  router.post("/login", (req, res) => {
    const username = req.body.user;
    server.getUser(username)
      .then((user) => {
        console.log("👋 Logged in as (id): ", user.id);
        res.cookie("user_id", user.id);
        res.redirect("/todo");
      })
      .catch((err) => console.log("error?"));
  });

  router.post("/logout", (req, res) => {
    res.clearCookie("user_id");
    console.log("🚪 Successfully Logged out");
    res.redirect("/");
  });

  return router;
};

