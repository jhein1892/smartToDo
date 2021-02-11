
$(() => {

  const login = `
  <form id="submit-login" action="/user/login" method="POST">
  <button type="submit" class="centerlined" for="user-login">Login</button>
  <input type="text" id="login-form" name="user" />
  </form>`;
  $(".logins").prepend(login);

  const logout = `<form action="/user/logout" method="POST">
  <button type="submit" class="centerlined">Logout</button>
</form>`;

  // Categorize the existing db tasks for a specific user id and creates new ones
  const renderList = function(list) {
    for (const id in list) {
      const tasks = list[id];
      for (const i in tasks) {
        const task = tasks[i];
        const taskId = task.id;
        const $text = task.text;
        const $displayTodo = `<!-- LIST ITEM -->
        <div class="list-item">
          <!-- CHECKBOX -->
          <label class="list-group-item" >
            <input class="form-check-input" type="checkbox" data-id="${taskId}" />
            <span>${$text}</span>
          </label>
          <!-- DELETE BUTTON -->
          <form method="POST" action="/todo/${taskId}/delete">
          <i class="card-icon bi bi-x" data-id="${taskId}"></i>
          </form>
        </div>`;

        const $read = $('#readlist');
        const $buy = $('#buylist');
        const $watch = $('#watchlist');
        const $eat = $('#eatlist');
        const $readcomp = $('#read-complete');
        const $buycomp = $('#buy-complete');
        const $watchcomp = $('#watch-complete');
        const $eatcomp = $('#eat-complete');

        if (task.category === 1) {
          if (task.completed === false){
          $read.append($displayTodo);
          } else {
          $readcomp.append($displayTodo);
          }
        } else if (task.category === 3) {
          if (task.completed === false){
            $watch.append($displayTodo);
            } else {
            $watchcomp.append($displayTodo);
            }
        } else if (task.category === 4) {
          if (task.completed === false){
            $eat.append($displayTodo);
            } else {
            $eatcomp.append($displayTodo);
            }
        } else {
          if (task.completed === false){
            $buy.append($displayTodo);
            } else {
            $buycomp.append($displayTodo);
            }
        }
      }
    }
  };

  // Function that calls the delete route
  const deleteHandler = function(event) {
    const id = $(event.target).data('id');
    console.log('id: ' + id + ' delete successful');
    $.ajax({
      type: "POST",
      url: `/todo/${id}/delete`,
      dataType: 'json',
      success: function() {
        console.log('id: ' + id + ' delete successful');
      },
    });
  };

  // Adds event to delete icon
  const addDeleteHandler = function() {
    $('.bi-x').on('click', deleteHandler)
      .on('click', function() {
        slideFade($(this.closest(".list-item")));
      });
  };

  // Loads lists of a specific user id
  const loadLists = function() {
    $('#user-input').val("")
    $.ajax({
      method: 'GET',
      url: '/todo',
      dataType: 'json',
      success: function(tasks) {
        console.log("data: ", tasks);
        renderList(tasks);
        addDeleteHandler();
      },
      error: (error) => {
        error;
      }
    });
    $(".list-item").empty();
  };

  // Login message
  $('#submit-login').submit(function(event) {
    event.preventDefault();

    const user = $('#login-form');
    if (user.val().trim() === "" || user.val().length < 0) {
      $(".error-message").append('<div>Please enter your username</div>').slideDown();
      return false;
    }

    $(".error-message").slideUp();

    $.ajax({
      type: "POST",
      url: '/user/login',
      data: {user: user.val().trim()},
      success: function(data) {
        const username = $('#login-form').val();
        console.log('logged in as:', username);
        $("#submit-login").replaceWith(`<p>Welcome ${username}!</p>`);
        $(".logins").append(logout);
      },
    })
      .then(() => loadLists());
  });


  // Add a new todo and avoid page refresh
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
      .then(() => loadLists());
  });


  // Changing the status to complete
  $(document).on('click', '.form-check-input', function(event){
    const id = $(event.target).data('id');
    // if the box is not checked
     if($(this).is(":checked")){
      $.ajax({
        type: "POST",
        url: `/todo/${id}/complete`,
        dataType: 'json',
        success: function() {
          console.log(`Task: ${id} completed`)
        },
      })
    } else {
      alert('This is already completed')
    }
    loadLists();
  })

  // In case of a page reload, the lists will continue to display

  loadLists();
});
