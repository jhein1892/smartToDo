/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const server = require("../server")
const {findFood, findBooks, findMovie, findItem} = require('../public/scripts/app')


module.exports = (db) => {
  // Display all todos
  router.get("/", (req, res) => {
    if (!req.cookies["user_id"]) {
      res.status(404).send("Please login to access this page.");
    } else {
      server.getTodos(req.cookies["user_id"])
        .then(data => {
          const task = data;
          res.json({ task });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    }

  });

  // Add new todo
  router.post("/", (req, res) => {
    const task = req.body.user_input;
    let book = false;
    let food = false;
    let movie = false;
    findBooks(task).then((result) => {
      if (result){
        console.log("It's a Book")
        book = true;
      } else {
        console.log('Not a Book')
      }
    });
    findFood(task).then((result) => {
      // console.log('Food response', result)
      if (result === task){
        console.log('Its food!')
        food = true;
      } else {
        console.log('Not food')
      }
    })
    findMovie(task).then((result) => {
      console.log('Movie result', result)
      if (result === task) {
        console.log('Its a movie')
        movie = true;
      } else {
        console.log('Not a movie')
      }
    })
    // findMovie(task).then((result) => {
    //   console.log("is a movie")
    // })
    // findItem(task).then((result) => {
    //   // console.log(result)
    // })

    // let book = findBooks(task)
    // let movie = findMovie(task)
    // let item = findItem(task)




    server.addTodo(req.cookies["user_id"], task)
      .then((task) => {
        console.log("✅ Task added")
        res.redirect("/")
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
      .then ((todo) => {
        res.redirect("/todo")
        console.log("💩 Task removed")
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
