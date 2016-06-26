var winningarray = [[0,1,2], [0,3,6]];
var oharray = [];
var exarray = [];

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
      $("#start").hide();
      $("#player1").addClass("active");
      // But should I remove board above and append it here for consistency?
      $("#board").show();
    });

//DON'T NEED TO DO ANY OF THIS BECAUSE OF MOUSEENTER/MOUSELEAVE
// Give all boxes a class of available at first
// Cycle over boxes with this class
// After a square is chosen, remove class of available
// Or, just filter for box-filled-1 and box-filled-2
// $(".boxes li").addClass("available");

// On hover, player-specific svg appears
    $(".boxes li").hover(function() {
        if ($("#player1").hasClass("active")) {
          $(this).css("background-image", "url(./img/o.svg)");
        }
        else {
          $(this).css("background-image", "url(./img/x.svg)");

        }
    }, function() {
      $(this).css("background-image", "none");
    });


 $(".boxes li").click(function(){
      if ($("#player1").hasClass("active")) {
       $(this).addClass("box-filled-1");
       // Add square to o array
       var ohsquarenumber = ($(".boxes li").index($(this)));
       oharray.push(ohsquarenumber);
       console.log(oharray);
      }
      else {
       $(this).addClass("box-filled-2");
       // Add square to x array
       var exsquarenumber = ($(".boxes li").index($(this)));
       exarray.push(exsquarenumber);
       console.log(exarray);
      }

    $(this).unbind("mouseenter mouseleave");

  // Test state of board against possible solutions

   winningarray = JSON.stringify(winningarray);
   var newoharray = JSON.stringify(oharray);
   var newexarray = JSON.stringify(exarray);

   var ohwinner = winningarray.indexOf(newoharray);
   var exwinner = winningarray.indexOf(newexarray);
   if (ohwinner != -1) {
     console.log("O wins");
   } else if (exwinner != -1) {
     console.log("X wins")
   }
//  var ohwinner = winningarray.indexOf(oharray);
// var ohwinner = winningarray.includes(oharray);
// jQuery.inArray(oharray, winningarray)

// Cycle through winningarray
  /* for (var i=0; i<winningarray.length; i++) {
      console.log(winningarray[i].indexOf(oharray));
      console.log(jQuery.inArray(oharray, winningarray[i]))
      console.log(winningarray[i].includes(oharray));
         if (winningarray[i].includes(oharray)){
          console.log("O wins");
        }
        else if (winningarray[i].includes(exarray)){
          console.log("X wins");
        }
    } */

//  if (ohwinner > 0) {
//    console.log("O wins")
//  }

  // You want to do this before toggling active class
    $("#player1").toggleClass("active");
    $("#player2").toggleClass("active");
  });


}); //this is the document ready closing brackets

//Should I build the board as an object? Should I build each square as an object?
//The thing is, I don't want to access multiple properties


/*

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
