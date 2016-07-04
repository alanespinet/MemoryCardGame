function createCards(){
  var classes = ["boy", "bird", "dragon", "fish", "house", "lion",
                 "pirate", "ship", "sun", "tree", "turtle", "woman",
                 "boy", "bird", "dragon", "fish", "house", "lion",
                 "pirate", "ship", "sun", "tree", "turtle", "woman"];

  classes = classes.sort(function(a, b){return Math.random() - 0.5;});
  var j = 0;

  for(var i = 1; i <= 24; i++){
    var $card = $('<div class="card" side="back"></div>');
    $card.append('<div class="back_card"></div>');
    $card.append(`<div class="front_card ${classes[i - 1]}"></div>`);

    $("#general_container").append($card);
    if(i % 8 == 0) $("#general_container").append("<br / >");
  }
}
createCards();

var card_clicked_count = 0;
var $cards = [null, null];
var can_click = true;
var found = 0;

$(".card").on("click", function(){
  if($(this).attr("side") == "back" && can_click)
  {
    $(this).find(".back_card").css("transform", "rotateY(180deg)");
    $(this).find(".front_card").css("transform", "rotateY(0deg)");
    $(this).attr("side", "front");

    card_clicked_count++;
    $cards[card_clicked_count - 1] = $(this);
    can_click = false;

    $(this).find(".front_card").one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
      can_click = true;

      if(card_clicked_count === 2) {
        var imgC1 = $cards[0].find(".front_card").css("background-image");
        var imgC2 = $cards[1].find(".front_card").css("background-image");

        if(imgC1 == imgC2){
          $cards[0].addClass("disabled");
          $cards[1].addClass("disabled");

          card_clicked_count = 0;
          found++;

          if(found === 12)
          {
            location.href = "victory.html";
          }
        }
        else{
          $cards[0].find(".front_card").css("transform", "rotateY(-180deg)");
          $cards[0].find(".back_card").css("transform", "rotateY(0deg)");
          $cards[0].attr("side", "back");

          $cards[1].find(".front_card").css("transform", "rotateY(-180deg)");
          $cards[1].find(".back_card").css("transform", "rotateY(0deg)");
          $cards[1].attr("side", "back");

          card_clicked_count = 0;
        }
      }
    });
  }
});
