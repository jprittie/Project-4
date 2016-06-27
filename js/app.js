
// Add module function

// Initialize variables
var winningarray = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ];
var oharray = [];
var exarray = [];
var fillcounter = 0;

// When the page loads, append start and finish screens so they are available,
// but only display start screen
$(function(){
  // Board screen already exists, so hide it
  // Actually, I should just take it out of the html and append & hide it here
  $("#board").hide();

  // Add start screen
  $("body").append('<div class="screen screen-start" id="start"><header> <h1>Tic Tac Toe</h1> <a href="#" class="button">Start game</a> </header></div>');

  // Add finish screen
  $("body").append('<div class="screen screen-win" id="finish"><header><h1>Tic Tac Toe</h1><p class="message"></p><a href="#" class="button newgamebutton">New game</a></header></div>');
  // Hide finish screen
  $("#finish").hide();


    // When the player clicks start button, the start screen disappears,
    // the board appears and the game begins
    $(".button").click(function(event){
      event.preventDefault();
      $("#start").hide();
      $("#player1").addClass("active");

      // The rest of this should be in a game reset function,
      // which I don't need to call here
      $(".screen-win").removeClass("screen-win-one");
      $(".screen-win").removeClass("screen-win-two");
      $(".screen-win").removeClass("screen-win-tie");
      $(".message").text("");
      $("#board").show();
    });



// On hover, player-specific svg appears
// Note: hover method takes two functions as parameters
    $(".boxes li").hover(function () {
        if ($("#player1").hasClass("active")) {
          $(this).css("background-image", "url(./img/o.svg)");
        }
        else {
          $(this).css("background-image", "url(./img/x.svg)");

        }
    }, function() {
      $(this).css("background-image", "none");
    });


 // On click, player-specific svg is added to square,
 // box is filled with appropriate background colour
 $(".boxes li").click(function(){
      if ($("#player1").hasClass("active")) {
       $(this).addClass("box-filled-1");
       // I keep track of square's number based on its position
       // in the $(".boxes li") array-like collection;
       // i.e., boxes already have index numbers from 0 to 8,
       // and I'm just utilizing those numbers
       var ohsquarenumber = ($(".boxes li").index($(this)));
       // Add square to oharray, to keep track of which squares O has chosen
       oharray.push(ohsquarenumber);

      }
      else {
       $(this).addClass("box-filled-2");
       var exsquarenumber = ($(".boxes li").index($(this)));
       // Add square to exarray
       exarray.push(exsquarenumber);

      }

    // Next line disables hover method on square that was clicked on
    // (also makes sure you can't click on it again?)
    $(this).unbind("mouseenter mouseleave");


  // Test state of board against possible solutions
  /* I need to check whether the three values in any of winningarray's sub-arrays are all
     included in oharray or exarray. If they are, game is over. If they are not, we keep going
     until there is a draw or a winner.
  */
    var nowinner = true;

    for (var i=0; i<winningarray.length; i++){
      var firsttest = winningarray[i][0];
      var secondtest = winningarray[i][1];
      var thirdtest = winningarray[i][2];

      if (oharray.includes(firsttest) && oharray.includes(secondtest) && oharray.includes(thirdtest)) {

        nowinner == false;
        $("#board").hide();
        $(".message").text("Winner");
        $(".screen-win").addClass("screen-win-one");
        $("#finish").show()
      } else if (exarray.includes(firsttest) && exarray.includes(secondtest) && exarray.includes(thirdtest)) {
         
        nowinner == false;
        $("#board").hide();
        $(".message").text("Winner");
        $(".screen-win").addClass("screen-win-two");
        $("#finish").show();
      } else {
        nowinner == true;
        drawTest();
      }

    }

// When new game button is clicked, restart game
$(".newgamebutton").click(function(){

    // Must clear all filled boxes and svg background images
    $(".boxes li").removeClass("box-filled-1");
    $(".boxes li").removeClass("box-filled-2");
    $(".boxes li").css("background-image", "none");
    // Clear player arrays and fillcounter
    oharray = [];
    exarray = [];
    fillcounter = 0;



    $("#finish").hide();
    // Clear winning screens, tie screen and winner/it's a draw message
    $(".screen-win").removeClass("screen-win-one");
    $(".screen-win").removeClass("screen-win-two");
    $(".screen-win").removeClass("screen-win-tie");
    $(".message").text("");

    // I don't know why player 2 is still active at this point,
    // but make it inactive
    $("#player2").removeClass("active");


    $("#board").show();

    // Re-enable hover on boxes
    // I shouldn't have to write all this out again,
    // but I'm not sure how to fix it
    $(".boxes li").hover(function () {
        if ($("#player1").hasClass("active")) {
          $(this).css("background-image", "url(./img/o.svg)");
        }
        else {
          $(this).css("background-image", "url(./img/x.svg)");

        }
    }, function() {
      $(this).css("background-image", "none");
    });
});





    // At the end of each turn, toggle the active player
    $("#player1").toggleClass("active");
    $("#player2").toggleClass("active");

  });


});


// This function tests the board to see if there's a draw
function drawTest(){
    fillcounter = 0;
       // Count how many boxes have class of .box-filled-1 or .box-filled-2
        $(".boxes li").each(function(){
            if ( $(this).hasClass("box-filled-1") || $(this).hasClass("box-filled-2") ) {
              fillcounter += 1;
            }
        });
    // If all nine squares are filled and nowinner == true, it's a draw
    if ( (fillcounter == 9) && (nowinner === true) ) {
      $(".message").text("It's a draw");
      $(".screen-win").addClass("screen-win-tie");
      $("#board").hide();
      $("#finish").show();
    }

}
