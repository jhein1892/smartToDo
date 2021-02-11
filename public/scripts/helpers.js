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
    // $(".list-group-item").empty();
    for (const id in list) {
      const tasks = list[id];
      for (const i in tasks) {
        const task = tasks[i];
        const taskId = task.id;
        const $text = task.text;
        const $displayTodo = `<!-- LIST ITEM -->
        <div class="list-item">
          <!-- CHECKBOX -->
          <label class="list-group-item">
            <input class="form-check-input" type="checkbox" />
            <span>${$text}</span>
          </label>
          <!-- DELETE BUTTON -->
          <form method="POST" action="/todo/${taskId}/delete">
          <i class="card-icon bi bi-x" data-id="${taskId}"></i>
          </form>
        </div>`

        const $read = $('#readlist');
        const $buy = $('#buylist');
        const $watch = $('#watchlist');
        const $eat = $('#eatlist');

        if (task.category === 1 ) {
          $read.append($displayTodo);
        } else if (task.category === 3) {
          $watch.append($displayTodo);
        } else if (task.category === 4) {
          $eat.append($displayTodo);
        } else {
          $buy.append($displayTodo);
        }
        // $($displayTodo).on('click', deleteHandler)
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
        addDeleteHandler();
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
      success: function(data) {
        const username = $('#login-form').val()
        console.log('logged in as:', username)
        $("#submit-login").replaceWith(`<p>Welcome ${username}!</p>`)
        $(".logins").append(logout);
      },
    })
    .then(() => loadLists())
  });


  // //Avoid page refresh when adding new todo
  $('.text-form').submit(function(event) {
    event.preventDefault();

    $.ajax({
      type: "POST",
      url: '/todo',
      data: {user_input: $('#user-input').val()},
      dataType: 'json',
      success: function(response) {
        console.log("response: ", response);
      },
    })
    .then(() => loadLists())
  });

  const deleteHandler = function(event) {
    const id = $(event.target).data('id')
    console.log('id: ' + id +'delete successful')
      $.ajax({
        type: "POST",
        url: `/todo/${id}/delete`,
        dataType: 'json',
        success: function() {
          console.log('id: ' + id +'delete successful')
        },
      })
  }

  //Delete icon to remove todo from list and db
  const addDeleteHandler = function () {
    $('.bi-x').on('click', deleteHandler)
    .on('click', function() {
      slideFade($(this.closest(".list-item")))
    })
  }

  // In case a page reload is made, the lists will continue to display
  loadLists();

});

// export { deleteHandler }
