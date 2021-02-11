// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);


const getUser = function(username) {
  return db.query(`SELECT * FROM users WHERE name = $1`, [username])
    .then(res => res.rows[0])
    .catch(err => err);
};
exports.getUser = getUser;

const addTodo =  function(userId, category, todo) {
  return db.query(`INSERT INTO to_dos (user_id, category, text) VALUES ($1, $2, $3)`,
    [userId, category, todo])
    .then(res => res.rows)
    .catch(err => err);
};
exports.addTodo = addTodo;

const getTodos = function(userid) {
  return db.query(`SELECT * FROM to_dos WHERE user_id = $1`, [userid])
    .then(res => res.rows)
    .catch(err => err);
};

exports.getTodos = getTodos;

const removeTodo =  function(todoId) {
  return db.query(`DELETE FROM to_dos WHERE id = $1`,
    [todoId])
    .then(res => res.rows[0])
    .catch(err => err);
};
exports.removeTodo = removeTodo;