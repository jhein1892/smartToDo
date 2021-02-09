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
  const fade = { opacity: 0, transition: "opacity 0.5s" };
  list.css(fade).slideUp();
};

// Expand function
$(document).ready(function () {
  $(".tab").hide();
  let expanded = false;
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
      $(this).closest(".card").css({
        transform: "",
        "z-index": "",
        "font-size": "",
      });
      $(this).parent().siblings(".tab").slideUp(200);
    }
  });

  $(".bi-x").click(function () {
    slideFade($(this.closest(".list-item")));
  });
});
