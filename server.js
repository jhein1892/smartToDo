// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieParser = require("cookie-parser");

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));


app.use(cookieParser());

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const todosRoutes = require("./routes/todos");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/user", usersRoutes(db));
app.use("/todo", todosRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  const templateVars = {
    user: req.cookies["user_id"]
  }
  console.log('😎', templateVars)
  res.render("index", templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


// HELPER FUNCTIONS

const getUser = function(username) {
  return db.query(`SELECT * FROM users WHERE name = $1`, [username])
    .then(res => res.rows[0])
    .catch(err => console.log('error'))
  }
exports.getUser = getUser;

const addTodo =  function(userId, todo) {
  return db.query(`INSERT INTO to_dos (user_id, text) VALUES ($1, $2)`,
  [userId, todo])
  .then(res => res.rows)
  .catch(err => err)
}
exports.addTodo = addTodo;

const getTodos = function(userid) {
  return db.query(`SELECT * FROM to_dos JOIN users ON user_id = users.id WHERE users.id = $1`, [userid])
    .then(res => res.rows)
    .catch(err => console.log('error'))
  }
exports.getTodos = getTodos;

const removeTodo =  function(todoId) {
  return db.query(`DELETE FROM to_dos WHERE id = $1`,
  [todoId])
  .then(res => res.rows[0])
  .catch(err => err)
}
exports.removeTodo = removeTodo;

