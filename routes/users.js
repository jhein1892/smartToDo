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
  router.get("/login", (req, res) => {
    const templateVars = {
      user: req.cookies["user_id"]
    }
    console.log("templ: ", templateVars)
    res.render("index", templateVars)
  });

  router.post("/login", (req, res) => {

    const getUser = function(username) {
      return db.query(`SELECT id FROM users WHERE name = $1`, [username])
      // .then(data => data.rows[0].id)
      .then(res => console.log(res.rows))
      .catch(err => console.log('error'))
    }

    const username = req.body.user;
    const id = getUser(username);
    console.log('😁:', id)
    res.cookie("user_id", id);
    res.redirect("/todo")
  });

  router.post("/logout", (req, res) => {
    const templateVars = {
      user: req.cookies["user_id"]
    }
    res.clearCookie("user_id");
    res.render("index", templateVars)
    //MISSING CODE
  });

  router.post("/login", (req, res) => {
    const username = req.body.user;
    server.getUser(username)
      .then((user) => {
        console.log("👋 Logged in as (id): ", user.id);
        res.cookie("user_id", user.id);
        res.redirect("/todo");
      })
      .catch((err) => console.log("error"));
  });

  router.post("/logout", (req, res) => {
    res.clearCookie("user_id");
    console.log("🚪 Successfully Logged out");
    res.redirect("/");
  });

  return router;
};
