Sortable.create(readlist, {
  animation: 150,
  group: "shared",
});

Sortable.create(watchlist, {
  animation: 150,
  group: "shared",
});

Sortable.create(buylist, {
  animation: 150,
  group: "shared",
});

Sortable.create(eatlist, {
  animation: 150,
  group: "shared",
});

Sortable.create(cardgrid, {
  swapThreshold: 1,
  animation: 150,
});

//delete list
const slideFade = (list) => {
  const fade = { opacity: 0, transition: "opacity 0.2s" };
  list.css(fade).slideUp(200);
};

// Expand function
$(document).ready(function () {
  $(".tab").hide();
  $(".complete-tab").hide();

  let expanded = false;
  let completeTab = false;

  $("#user-input").focus();

  $(".bi-pencil-square").click(function () {
    if (!expanded) {
      expanded = true;
      $(this).closest(".card").css({
        transform: "scale(1.5)",
        "z-index": "10",
        "font-size": "1em",
      });
      $(this).parent().siblings(".tab").slideDown(200);
    } else if (expanded) {
      expanded = false;
      completeTab = false;
      $(this).closest(".card").css({
        transform: "",
        "z-index": "",
        "font-size": "",
      });

      $(this).parent().siblings(".tab").slideUp(200);

      $(this)
        .parent()
        .siblings(".card-body")
        .find(".complete-tab")
        .slideUp(200);

      $(this).parent().siblings(".card-body").find(".todo-tab").slideDown(200);
    }
  });

  $(".bi-x").click(function () {
    slideFade($(this.closest(".list-item")));
  });

  $(".completed-button").click(function () {
    console.log("completed");
    if (!completeTab) {
      completeTab = true;
      $(this)
        .parent()
        .siblings(".card-body")
        .find(".complete-tab")
        .css({ opacity: 100 })
        .slideDown(200);
      slideFade($(this).parent().siblings(".card-body").find(".todo-tab"));
    }
  });

  $(".todo-button").click(function () {
    console.log("todo");
    if (completeTab) {
      completeTab = false;
      slideFade($(this).parent().siblings(".card-body").find(".complete-tab"));
      $(this)
        .parent()
        .siblings(".card-body")
        .find(".todo-tab")
        .css({ opacity: 100 })
        .slideDown(200);
    }
  });
});
