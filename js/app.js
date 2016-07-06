
// Add self-executing function
(function(){

// Initialize variables
var winningarray = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ];
var oharray = [];
var exarray = [];
var usedtracker = [];
var fillcounter = 0;
var winner;
var exsquarenumber;
var clickedsquare;



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



  // When the player clicks start button, player names are set
  // Then the start screen disappears, the board appears and the game begins
  $("#startbutton").click(function(event){
    event.preventDefault();
    // Set player names based on input
    $("#playerone").text($("#name1").val());
    $("#playertwo").text($("#name2").val());
    // If single player, then opponent's name is Computer, and call singlePlayerGame
    if ( $("input[name='opponent']:checked").val() == "computer" ) {
      $("#playertwo").text("Computer");
      singlePlayerGame();
    } else if ( ($("input[name='opponent']:checked").val()) == "human" ) {
      twoPlayerGame();
    }
    // Hide start screen and make player1 active
    $("#start").hide();
    $("#player1").addClass("active");
    // Show board
    $("#board").show();
  });


// On hover, player-specific svg appears
// Note: hover method takes two functions as parameters
// I'm wrapping it in a function because I will have to re-use it later
function hover(){
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
 }
 hover();




function singlePlayerGame() {
 // This function enables a turn by O and a turn by the computer
   $(".boxes li").click(function(){
     fillcounter = 0; //reset first variable that's used to test for draw
     winner = false; //reset second variable that's used to test for draw
     clickedsquare = $(".boxes li").index($(this));
     console.log("Clicked square is " + clickedsquare);

     // O takes a turn
     if ($("#player1").hasClass("active")) {
       playerChooseOhSquare(clickedsquare);
     }
     // Then test board for winner or draw
     winnerTest();
     drawTest();

     // If there is no winner and no draw, toggle active player and give computer a turn
     if ( (!winner) && (fillcounter < 9)  ) {
       $("#player1").removeClass("active");
       $("#player2").addClass("active");

       setTimeout(computerChooseExSquare, 300);
       // computerChooseExSquare();
     }

    }); // ends boxes click function

} // ends singlePlayerGame function


function twoPlayerGame() {
  // This function lets O and X take turns
    $(".boxes li").click(function(){
     fillcounter = 0; //reset first variable that's used to test for draw
     winner = false; //reset second variable that's used to test for draw
     clickedsquare = $(".boxes li").index($(this));
     console.log("Clicked square is " + clickedsquare);

     // O takes a turn
     if ($("#player1").hasClass("active")) {
       playerChooseOhSquare(clickedsquare);
     } else {
     // X takes a turn
       playerChooseExSquare(clickedsquare);
     }

     // Then test board for winner or draw
     winnerTest();
     drawTest();

     // Toggle active player classes
     $("#player1").toggleClass("active");
     $("#player2").toggleClass("active");

    }); // ends boxes click function

} // ends twoPlayerGame function




function playerChooseOhSquare(clickedsquare) {

  console.log("playerChooseOhSquare called" );
    // Add svg and background colour
    $(".boxes li").eq(clickedsquare).addClass("box-filled-1");
    // I keep track of square's number based on its position in $(".boxes li"), i.e. using index number from 0 to 8
    // Add square to oharray
    oharray.push(clickedsquare);
    usedtracker.push(clickedsquare);
    // Disable hover and click on chosen square
    $(".boxes li").eq(clickedsquare).off();

}

 function playerChooseExSquare(clickedsquare) {
    console.log("playerChooseExSquare called" );
    // Add svg and background colour
    $(".boxes li").eq(clickedsquare).addClass("box-filled-2");
    // Add square to exarray
    exarray.push(clickedsquare);
    usedtracker.push(clickedsquare);
    // Disable hover and click on chosen square
    $(".boxes li").eq(clickedsquare).off();

  } // ends playerChooseExSquare




// This function lets the computer take a turn
function computerChooseExSquare(){
  console.log("computerChooseExSquare called");
  exsquarenumber = Math.floor(Math.random() * 9);
  // if square has not been filled already, then that's the square the computer picks
     if (usedtracker.indexOf(exsquarenumber) === -1) {
       exSquareChoice();
       // console.log("computerChooseExSquare if called");

     } else {
       // console.log("computerChooseExSquare else called");
       // If that random number has been used, keep generating new ones
       // until you find one that hasn't been used
       // Note: (usedtracker.length != 9) check means while loop doesn't keep going if there's a draw
       while ((usedtracker.indexOf(exsquarenumber) > -1) && (usedtracker.length != 9)) {
         exsquarenumber = Math.floor(Math.random() * 9);
       }
       exSquareChoice();
     }

   winnerTest();
   drawTest();

   // Toggle active classes again so it is human's turn
   $("#player1").addClass("active");
   $("#player2").removeClass("active");

}

// Fills X square on computer's turn
function exSquareChoice(){
  $(".boxes li").eq(exsquarenumber).addClass("box-filled-2");
  $(".boxes li").eq(exsquarenumber).css("background-image", "url(./img/x.svg)");
  // Add square to exarray
  exarray.push(exsquarenumber);
  usedtracker.push(exsquarenumber);
  // Disable hover and click on chosen square
  $(".boxes li").eq(exsquarenumber).off();
}


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

      if ( (oharray.indexOf(firsttest) > -1) && (oharray.indexOf(secondtest) > -1) && (oharray.indexOf(thirdtest) > -1) ) {
        winner = true;
        $("#board").hide();
        $(".message").text(($("#name1").val()) + " wins");
        $(".screen-win").addClass("screen-win-one");
        $("#finish").show();


        } else if ( (exarray.indexOf(firsttest) > -1) && (exarray.indexOf(secondtest) > -1) && (exarray.indexOf(thirdtest) > -1) ) {
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

// When new game button is clicked, reset things and restart game
  $(".newgamebutton").click(function(event){
      event.preventDefault();

      // Clear all filled boxes and svg background images
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
      // Clear winning screens, tie screen and winner/it's a draw message
      $(".screen-win").removeClass("screen-win-one");
      $(".screen-win").removeClass("screen-win-two");
      $(".screen-win").removeClass("screen-win-tie");
      $(".message").text("");

      $(".boxes li").off();
      // Re-enable hover on boxes
      hover();
      // Call either singlePlayerGame or twoPlayerGame
      if ( $("input[name='opponent']:checked").val() == "computer" ) {
        singlePlayerGame();
      } else if ( ($("input[name='opponent']:checked").val()) == "human" ) {
        twoPlayerGame();
      }


      $("#finish").hide();
      $("#board").show();
   }); //ends new game click


}); // ends document ready

}()); // ends self-executing function
