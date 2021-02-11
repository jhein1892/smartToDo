/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const server = require("../server")
const {
  findFood,
  findBooks,
  findMovie,
} = require('../public/scripts/app')



module.exports = (db) => {
  // Display all todos
  router.get("/", (req, res) => {
    const userID = req.cookies["user_id"];
    if (!userID) {
      res.status(404).send("Please login to access this page.");
    } else {
      server.getUser(userID)
    }
    server.getTodos(userID)
      .then(data => {
        const task = data;
        res.send({ task });
      })
      .catch(err => { res.status(500).send({ error: err.message });
      });
  });

  // Add new todo
  router.post("/", (req, res) => {
    const task = req.body.user_input;
    // MUST KEEP BELOW (API REFERENCE)
    let book = false;
    let food = false;
    let movie = false;
    let category = [];
    return findBooks(task).then((result) => {
      if (result) {
        console.log("It's a Book")
        category.push('1')
        return task;
      } else {
        console.log('Not a Book')
        return task;
      }
    }).then((result) => {
      return findMovie(task).then((result) => {
        if (result === task) {
          console.log('Its a movie')
          category.push('3')
          return task;
        } else {
          console.log('Not a movie')
          return task;
        }
      })
    }).then((result) => {
      return findFood(task).then((result) => {
        if (result === task) {
          console.log('Its food!')
          category.push('4')
          return category;
        } else {
          console.log('4')
          return category;
        }
      })
    }).then((result) => {
      if (result.includes('4')){
        return category = '4';
      } else if (result.includes('1')){
        return category = '1';
      } else if (result.includes('3')){
        return category = '3';
      } else {
        return category = '2';
      }
    }).then((result) => {
      console.log("category assigned on db: ", result)
      server.addTodo(req.cookies["user_id"], result, task)
      .then((task) => {
        console.log('✅ Task added')
        res.json({id: result} )
      })
    })
    .catch(error => console.log(error))
    // END OF API SECTION
  });

  // Delete a task from list
  router.post("/:id/delete", (req, res) => {
    const todoId = req.params.id
    console.log("Todo id to remove: ", todoId)
    server.removeTodo(todoId)
      .then((todo) => {
        console.log("💩 Task removed")
        res.send(todo)
      })
      .catch(err => {res.status(400).json({error: err.message});
      });
  });

  return router;
};
