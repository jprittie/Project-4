

// When the page loads, display start screen
$(function(){
  // Hide game fields
  $("#board").hide();

  // Add start screen
  $("body").append('<div class="screen screen-start" id="start"><header> <h1>Tic Tac Toe</h1> <a href="#" class="button">Start game</a> </header></div>');
});

// When the player clicks start button, the start screen disappears,
// the board appears and the game begins
$(".button").click(function(e){
  e.preventDefault;
  console.log("Start button clicked");
  $("#start").hide();
  $("#board").show();

});
