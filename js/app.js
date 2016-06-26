

// When the page loads, display start screen
$(function(){
  // Hide game fields
  $("#board").hide();

  // Add start screen
  $("body").append('<div class="screen screen-start" id="start"><header> <h1>Tic Tac Toe</h1> <a href="#" class="button">Start game</a> </header></div>');

    // When the player clicks start button, the start screen disappears,
    // the board appears and the game begins
    $(".button").click(function(event){
      event.preventDefault();
      console.log("Start button clicked");
      $("#start").hide();
      $("#player1").addClass("active");
      // But should I remove board above and append it here for consistency?
      $("#board").show();
    });


// Give all boxes a class of available at first
// Cycle over boxes with this class
// After a square is chosen, remove class of available
// Or, just filter for box-filled-1 and box-filled-2
$(".boxes li").addClass("available");

// On hover, player-specific svg appears
    $(".available").hover(function() {
        if ($("#player1").hasClass("active")) {
          $(this).css("background-image", "url(./img/o.svg)");
        }
        else {
          $(this).css("background-image", "url(./img/x.svg)");

        }
    }, function() {
      $(this).css("background-image", "none");
    });



  $(".available").click(function(){
      if ($("#player1").hasClass("active")) {
       $(this).addClass("box-filled-1");
      }
      else {
       $(this).addClass("box-filled-2");
      }

    $(this).removeClass("available");
    $("#player1").toggleClass("active");
    $("#player2").toggleClass("active");
  });


}); //this is the document ready closing brackets




/*
- add links to all squares so they are clickable
- number squares (but you could just use their position in the array?)
- write out all possible winning solutions
(but does indexOf or inArray work? combination would have to be in correct order,
i.e. one, four, seven as opposed to seven, four, one... though you could test front to back then back to front...)
- for each turn:
    - on hover over each square, svg appears
    - player picks a square by clicking?
    - svg is added to that square
    - blue background is added to that square
    - then that square isn't available anymore
    - can I use filter to weed out squares that are taken?
    - active class toggles to other player
    - test state of board against all possible solutions
    - if player wins, indicate that
    - game is over

*/
