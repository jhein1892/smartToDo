$(() => {
  console.log("Doc READY!")

  //if no cookie > display login button
  //when click on login button > slide down input + button
  // if user logged in > display: "logged in as: ____" + logout button

const login = `
<form id="submit-login" action="/user/login" method="POST">
<button type="submit" class="centerlined" for="user-login">
  Login
</button>
<input type="text" id="login-form" name="user" />
</form>`
$(".logins").prepend(login)


// const createTodo = function(todo) {

// }

// const renderList = function(list) {
//   $('#list-todo').empty();
//   list.forEach((task) => {
//     const todo = createTodo(task);
//     $().prepend(todo)
//   })
// }



$('#submit-login').submit(function (event) {
  event.preventDefault();

  const user = $('#login-form');
  if (user.val().trim() === "" || user.val().length < 0) {
    $(".error-message").append('<div>Please enter your username</div>').slideDown()
    return false;
  }

  $(".error-message").slideUp();

  $.ajax({
    type: "POST",
    url: '/user/login',
    data: {user: user.val().trim()},
    success: function() {
      const username = $('#login-form').val()
      console.log('username:', username)
      $("#submit-login").replaceWith(`<p>Welcome ${username}!</p>`);
    },
  });

  // ISSUE: not reading properly as front-end not reading cookies passed to the back-end fnc
  $.ajax({
    method: 'GET',
    url: '/todo',
    dataType: 'json',
    success: function(data) {
      console.log("data: ", data)
    },
    error: (error) => {console.log(error)}
  });
});



});

