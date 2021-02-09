$(() => {
  console.log("Doc READY!")

  const login = `
  <form id="submit-login" action="/user/login" method="POST">
  <button type="submit" class="centerlined" for="user-login">Login</button>
  <input type="text" id="login-form" name="user" />
  </form>`;
  $(".logins").prepend(login)

  const logout = `<form action="/user/logout" method="POST">
  <button type="submit" class="centerlined">Logout</button>
</form>`;


  const renderList = function(list) {
    //MUST FIND A WAY TO REDIRECT TO DIFFERENT LOCATIONS ON DOM
    const $list = $('#list-todo');
    for (const id in list) {
      const tasks = list[id];
      for (const i in tasks) {
        const task = tasks[i];
        // CHANGE LOCATIONS ACCORDING TO ID
        const $display = $('<div>').addClass('list-display')
        const $text = $('<span>').text(task.text);
        const $category = $('<span>').text(task.category);
        $display.append($text, $category);
        $list.prepend($display)
      }
    }
  }

  const loadLists = function() {
    $.ajax({
      method: 'GET',
      url: '/todo',
      dataType: 'json',
      success: function(tasks) {
        console.log("data: ", tasks)
        renderList(tasks);
      },
      error: (error) => {console.log(error)}
    });
  };


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
        console.log('logged in as:', username)
        $("#submit-login").replaceWith(`<p>Welcome ${username}!</p>`)
        $(".logins").append(logout);
      },
    })
    .then(() => loadLists())
  });

  // In case a page reload is made, the lists will continue to display
  loadLists();

});

