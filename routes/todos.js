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
  findItem
} = require('../public/scripts/app')



module.exports = (db) => {
  // Display all todos
  router.get("/", (req, res) => {
    const userID = req.cookies["user_id"];
    if (!userID) {
      res.status(404).send("Please login to access this page.");
    }
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
      console.log(result)
      server.addTodo(req.cookies["user_id"], result, task)
      .then((task) => {
        console.log('Task added')
        res.redirect('/')
      })
    })
    .catch(error => console.log(error))

    // END OF API SECTION
    server.addTodo(req.cookies["user_id"], task)
      .then((task) => {
        console.log("✅ Task added")
        res.redirect("/")
      })
      .catch(err => {
        res
          .status(500)
          .json({
            error: err.message
          });
      });
  });

  // Display todo by id
  router.get("/:id", (req, res) => {
    let query = `SELECT * FROM to_dos WHERE id = $1`;
    console.log(query);
  });

  // Update todo by id > PENDING TO DECIDE WHETHER OR NOT WE KEEP THIS FEATURE
  router.post("/:id", (req, res) => {
    let query = `UPDATE to_dos SET name = $1 WHERE id = $1`;
    console.log(query);
  });

  // Delete a task from list
  router.post("/:id/delete", (req, res) => {
    const todoID = () => {
      server.getTodo(req.cookies["user_id"])
        .then((task) => {
          console.log("😨 Task to delete: ", task[req.params.id].text);
          res.redirect("/")
        })
    }
    server.removeTodo(todoID)
      .then((todo) => {
        res.redirect("/todo")
        console.log("💩 Task removed")
      })
      .catch(err => {
        res
          .status(500)
          .json({
            error: err.message
          });
      });
  });

  return router;
};
