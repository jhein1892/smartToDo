/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

/*
R GET /todo -- display todos
R GET /todo:id -- display single todo
E POST /todo:id -- edit todo
A POST /todo -- add new post
D POST /todo:id/delete -- delete post
*/

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // Display all todos
  router.get("/", (req, res) => {
    let query = `SELECT * FROM widgets`;
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
    let query = `INSERT INTO widgets (user_id, name) VALUES ($1, $2)`;
    console.log(query);
    db.query(query, [user_id, name])
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

  // Display todo by id
  router.get("/:id", (req, res) => {
    let query = `SELECT * FROM widgets WHERE id = $1`;
    console.log(query);
    db.query(query,[req.params.id])
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

  // Update todo by id
  // Once form is in place, we can edit the parameter for $1
  router.post("/:id", (req, res) => {
    let query = `UPDATE widgets SET name = $1 WHERE id = $1`;
    console.log(query);
    db.query(query,[editedTodo, req.params.id])
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

  router.post("/:id/delete", (req, res) => {
    let query = `DELETE FROM widgets WHERE id = $1`;
    console.log(query);
    db.query(query,[req.params.id])
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

  return router;
};
