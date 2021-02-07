/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // Display all todos
  router.get("/", (req, res) => {
    let query = `SELECT * FROM to_dos`;
    console.log(query);
    db.query(query)
      .then(data => {
        const widgets = data.rows;
        res.json({ widgets });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // Add new todo
  // change parameter for $1 & $2
  router.post("/", (req, res) => {
    let query = `INSERT INTO to_dos (user_id, name) VALUES ($1, $2)`;
    console.log(query);
    db.query(query, [user_id, name])
      .then(data => {
        const todos = data.rows;
        res.json({ todos });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // Display todo by id
  router.get("/:id", (req, res) => {
    let query = `SELECT * FROM to_dos WHERE id = $1`;
    console.log(query);
    db.query(query,[req.params.id])
      .then(data => {
        const todos = data.rows;
        res.json({ todos });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // Update todo by id
  // Once form is in place, we can edit the parameter for $1
  router.post("/:id", (req, res) => {
    let query = `UPDATE to_dos SET name = $1 WHERE id = $1`;
    console.log(query);
    db.query(query,[editedTodo, req.params.id])
      .then(data => {
        const todos = data.rows;
        res.json({ todos });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/:id/delete", (req, res) => {
    let query = `DELETE FROM to_dos WHERE id = $1`;
    console.log(query);
    db.query(query,[req.params.id])
      .then(data => {
        const todos = data.rows;
        res.json({ todos });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
