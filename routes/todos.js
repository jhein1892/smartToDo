/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const database = require("../database");
const {
  findFood,
  findBooks,
  findMovie,
} = require('../public/scripts/app');



module.exports = (db) => {
  // Display all todos
  router.get("/", (req, res) => {
    const userID = req.cookies["user_id"];
    if (!userID) {
      res.status(404).send("Please login to access this page.");
    } else {
      database.getUser(userID);
    }
    database.getTodos(userID)
      .then(data => {
        const task = data;
        res.send({ task });
      })
      .catch(err => {
        res.status(500).send({ error: err.message });
      });
  });

  // Add new todo
  router.post("/", (req, res) => {
    const task = req.body.user_input;
    // MUST KEEP BELOW (API REFERENCE)
    let category = [];
    return findBooks(task).then((result) => {
      if (result) {
        category.push('1');
        return task;
      } else {
        return task;
      }
    }).then((result) => {
      return findMovie(task).then((result) => {
        if (result === task) {
          category.push('3');
          return task;
        } else {
          return task;
        }
      });
    }).then((result) => {
      return findFood(task).then((result) => {
        if (result === task) {
          category.push('4');
          return category;
        } else {
          return category;
        }
      });
    }).then((result) => {
      if (result.includes('4')) {
        return category = '4';
      } else if (result.includes('1')) {
        return category = '1';
      } else if (result.includes('3')) {
        return category = '3';
      } else {
        return category = '2';
      }
    }).then((result) => {
      database.addTodo(req.cookies["user_id"], result, task)
        .then((task) => {
          console.log('✅ Task added');
          res.json({id: result});
        });
    })
      .catch(error => error);
  });
  // END OF API SECTION

  // Delete a task from list
  router.post("/:id/delete", (req, res) => {
    const todoId = req.params.id;
    database.removeTodo(todoId)
      .then((todo) => {
        console.log("Task removed");
        res.send(todo);
      })
      .catch(err => {
        res.status(400).json({error: err.message});
      });
  });

  router.post("/:id/complete", (req, res) => {
    const todoId = req.params.id;
    database.completeToDo(todoId)
    console.log("In complete", todoId)
  })




  return router;
};
