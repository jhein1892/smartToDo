/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

/*
GET /login
GET /register
POST /login/:id
POST /logout
*/

const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.get("/login", (req, res) => {
    const templateVars = {
    }
    res.render("/login", templateVars)
  });

  router.post("/login", (req, res) => {
    res.redirect("/todo")
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/todo")
  });




  return router;
};
