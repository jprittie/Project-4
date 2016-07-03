
// Add self-executing function
//(function(){

// Initialize variables
var winningarray = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ];
var oharray = [];
var exarray = [];
var usedtracker = [];
var fillcounter = 0;
var winner;
var exsquarenumber;


// When the page loads, append start and finish screens so they are available,
// but only display start screen
$(function(){

  // Board screen already exists, so hide it
  $("#board").hide();

  // Add start screen
  $("body").append('<div class="screen screen-start" id="start"><header> <h1>Tic Tac Toe</h1><div id="startchoice"><div id="choice"><p><label class="label" for="computer">Play the computer?&nbsp;</label><input type="radio" name="opponent" value="computer" id="computer"></p><p><label for="human" class="label">Play another human?&nbsp;</label><input type="radio" name="opponent" id="human" value="human"></p></div></div><a href="#" class="button" id="startbutton">Start game</a> </header></div>');

  // Add finish screen
  $("body").append('<div class="screen screen-win" id="finish"><header><h1>Tic Tac Toe</h1><p class="message"></p><a href="#" class="button newgamebutton">New game</a></header></div>');

  // Hide finish screen
  $("#finish").hide();

  // Show/hide input fields depending on which radio button is checked
  $("input[name='opponent']").change(function(){
  if ( ($("input[name='opponent']:checked").val()) == "computer" ) {
    $("#startchoice").append('<div id="entername1"><p><label for="name1">Enter player name:</label></p><p><input type="text" id="name1" name="name1"</p></div>');
    $("#entername2").remove();

   } else {
    $("#entername1").remove();
    $("#startchoice").append('<div id="entername2"><p><label for="name1">Enter Player 1  name:</label></p><p><input type="text" id="name1" name="name1"</p><p><label for="name2">Enter Player 2 name:</label></p><p><input type="text" id="name2" name="name1"</p></div>');
    $("#entername2").show();
   }
  });

  // Add player name fields to board
  $(".playerboxes").after('<p class="playertext"><span id="playerone"></span><span id="playertwo"></span></ul>');



  // When the player clicks start button, the start screen disappears,
  // the board appears and the game begins
  $("#startbutton").click(function(event){
    event.preventDefault();
    // Set player names based on input
    $("#playerone").text($("#name1").val());
    $("#playertwo").text($("#name2").val());
    // If single player, then opponent's name is Computer
    if ( $("input[name='opponent']:checked").val() == "computer" ) {
      $("#playertwo").text("Computer");
    }
    // Hide start screen and make player1 active
    $("#start").hide();
    $("#player1").addClass("active");

    // Show board
    $("#board").show();
  });



// On hover, player-specific svg appears
// Note: hover method takes two functions as parameters
    $(".boxes li").hover(function () {
        if ($("#player1").hasClass("active")) {
          $(this).css("background-image", "url(./img/o.svg)");
        }
        // I only want X hover to work if it's a two-player game
        else if ( ($("#player2").hasClass("active")) && (($("input[name='opponent']:checked").val()) == "human") )  {
          $(this).css("background-image", "url(./img/x.svg)");
        }
    }, function() {
      $(this).css("background-image", "none");
    });


 // On click, player-specific svg is added to square,
 // box is filled with appropriate background colour
 // board is then tested for a win or a draw
 // (i.e., this entire function represents one turn)
function playerTurn() {

 $(".boxes li").click(function (){
   fillcounter = 0; //reset first variable that's used to test for draw
   winner = false; //reset second variable that's used to test for draw

      if ($("#player1").hasClass("active")) {
       $(this).addClass("box-filled-1");
       // I keep track of square's number based on its position
       // in the $(".boxes li") array-like collection;
       // i.e., boxes already have index numbers from 0 to 8,
       // and I'm just utilizing those numbers
       var ohsquarenumber = ($(".boxes li").index($(this)));
       // Add square to oharray, to keep track of which squares O has chosen
       oharray.push(ohsquarenumber);
       usedtracker.push(ohsquarenumber);

       // If player2 is active and it is a two player game, player2 takes a turn
       } else if ( ($("#player2").hasClass("active")) && ( ($("input[name='opponent']:checked").val()) == "human" ) ) {
       $(this).addClass("box-filled-2");
       var exsquarenumber = ($(".boxes li").index($(this)));
       // Add square to exarray
       exarray.push(exsquarenumber);

       }

    // Disable hover method on square that was clicked on
    $(this).unbind("mouseenter mouseleave");
    // And make sure you can't click on a filled square, which would trigger the other player's turn too early
    $(this).off();

    // Test board for win or draw
    winnerTest();
    drawTest();

    // If it's a two-player game, toggle active player classes
    if ( ($("input[name='opponent']:checked").val()) == "human" ) {
      $("#player1").delay(1000).toggleClass("active");
      $("#player2").delay(1000).toggleClass("active");
    }

    // If it's a single-player game, and there is no winner and no draw, toggle active player and give computer a turn
    // But also make sure player1 can't click again during computer's turn
     if ( ( ($("input[name='opponent']:checked").val()) == "computer" ) && (!winner) && (fillcounter < 9)  ) {



       $("#player1").delay(1000).removeClass("active");
       $("#player2").delay(1000).addClass("active");

       setTimeout(computerTurn, 2000);

       /*
       // Defer re-enable click (handler function is on line 89)
       setTimeout(function () {
            $(".boxes li").click(handler);
       }, 0); */

     }


}); // ends boxes click function - i.e., one turn

} // ends playerTurn function

playerTurn();

function winnerTest(){
  // Test state of board against possible solutions
  /* I need to check whether the three values in any of winningarray's sub-arrays are all
     included in oharray or exarray. If they are, game is over. If they are not, we keep going
     until there is a draw or a winner.
  */

    for (var i=0; i<winningarray.length; i++){
      fillcounter = 0;
      var firsttest = winningarray[i][0];
      var secondtest = winningarray[i][1];
      var thirdtest = winningarray[i][2];

      if (oharray.includes(firsttest) && oharray.includes(secondtest) && oharray.includes(thirdtest)) {
        winner = true;
        $("#board").hide();
        $(".message").text(($("#name1").val()) + " wins");
        $(".screen-win").addClass("screen-win-one");
        $("#finish").show()

      } else if (exarray.includes(firsttest) && exarray.includes(secondtest) && exarray.includes(thirdtest)) {
        winner = true;
        $("#board").hide();

        if ( $("input[name='opponent']:checked").val() == "computer" ) {
          $(".message").text("Computer wins");
        } else {
          $(".message").text(($("#name2").val()) + " wins");
        }

        $(".screen-win").addClass("screen-win-two");
        $("#finish").show();
      }
    } //ends for loop
} // ends winnerTest


function drawTest(){
// Now, we test for a draw
// First, count how many boxes have class of .box-filled-1 or .box-filled-2
 $(".boxes li").each(function(){
     if ( $(this).hasClass("box-filled-1") || $(this).hasClass("box-filled-2") ) {
       fillcounter += 1;
     }
 });
 // If all nine squares are filled, and there's no winner, it's a draw
  if ((fillcounter == 9) && (!winner)) {
   $(".message").text("It's a draw");
   $(".screen-win").addClass("screen-win-tie");
   $("#board").hide();
   $("#finish").show();
   // Reset active class to player 1
   $("#player1").addClass("active");
   $("#player2").removeClass("active");
 }

}

// This function lets the computer take a turn
function computerTurn(){

  exsquarenumber = Math.floor(Math.random() * 9);

  // if square has not been filled already, then that's the square the computer picks
     if (usedtracker.indexOf(exsquarenumber) === -1) {
       $(".boxes li").eq(exsquarenumber).addClass("box-filled-2");
       $(".boxes li").eq(exsquarenumber).css("background-image", "url(./img/x.svg)")
       // Add square to exarray
       exarray.push(exsquarenumber);
       usedtracker.push(exsquarenumber);
       // Disable hover on chosen square
       $(".boxes li").eq(exsquarenumber).unbind("mouseenter mouseleave");
       $(".boxes li").eq(exsquarenumber).off();

     } else {
       // If that random number has been used, keep generating new ones
       // until you find one that hasn't been used
       // Note: (usedtracker.length != 9) check means while loop doesn't keep going if there's a draw
       while ((usedtracker.indexOf(exsquarenumber) > -1) && (usedtracker.length != 9)) {
         exsquarenumber = Math.floor(Math.random() * 9);
       }
       $(".boxes li").eq(exsquarenumber).addClass("box-filled-2");
       $(".boxes li").eq(exsquarenumber).css("background-image", "url(./img/x.svg)")
       // Add square to exarray
       exarray.push(exsquarenumber);
       usedtracker.push(exsquarenumber);
       // Disable hover on chosen square
       $(".boxes li").eq(exsquarenumber).unbind("mouseenter mouseleave");
       $(".boxes li").eq(exsquarenumber).off();
     }

   winnerTest();
   drawTest();




   // Toggle active classes again so it is human's turn
   $("#player1").delay(2000).addClass("active");
   $("#player2").delay(2000).removeClass("active");
   // Calling playerTurn should re-enable click handlers
   playerTurn();

}



  // When new game button is clicked, restart game
  $(".newgamebutton").click(function(event){
      event.preventDefault();

      // Must clear all filled boxes and svg background images
      $(".boxes li").removeClass("box-filled-1");
      $(".boxes li").removeClass("box-filled-2");
      $(".boxes li").css("background-image", "none");
      // Clear player arrays and fillcounter
      oharray = [];
      exarray = [];
      usedtracker = [];
      fillcounter = 0;
      // Reset active class to player 1
      $("#player1").addClass("active");
      $("#player2").removeClass("active");



      $("#finish").hide();
      // Clear winning screens, tie screen and winner/it's a draw message
      $(".screen-win").removeClass("screen-win-one");
      $(".screen-win").removeClass("screen-win-two");
      $(".screen-win").removeClass("screen-win-tie");
      $(".message").text("");



      $("#board").show();

      // Re-enable hover on boxes
      // I shouldn't have to write all this out again,
      // but I'm not sure how to fix it
      $(".boxes li").hover(function () {
          if ($("#player1").hasClass("active")) {
            $(this).css("background-image", "url(./img/o.svg)");
          }
          // I only want X hover to work if it's a two-player game
          else if ( ($("#player2").hasClass("active")) && (($("input[name='opponent']:checked").val()) == "human") ) {
            $(this).css("background-image", "url(./img/x.svg)");

          }
      }, function() {
        $(this).css("background-image", "none");
      }); //ends re-enable hover

  }); //ends new game click


}); // ends document ready

//}()); // ends self-executing function
