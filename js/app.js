var winningarray = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ];
var oharray = [];
var exarray = [];
var fillcounter = 0;

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
    console.log("O wins");
    nowinner = false;
  } else if (exarray.includes(firsttest) && exarray.includes(secondtest) && exarray.includes(thirdtest)) {
    console.log("X wins");
    nowinner = false;
  } else {
    nowinner = true;
    drawTest();
  }

}

// How do I test for a draw?
// If all squares are filled and nowinner == true
// Cycle through all the boxes
// if box has class .box-filled-1 or .box-filled-2
function drawTest(){
    fillcounter = 0;

        $(".boxes li").each(function(){
            if ( $(this).hasClass("box-filled-1") || $(this).hasClass("box-filled-2") ) {
              fillcounter += 1;
            }
        });

    console.log("fillcounter is " + fillcounter);
    if ( (fillcounter == 9) && (nowinner === true) ) {
      console.log("It's a draw.");
    }

}



  // You want to do this before toggling active class
    $("#player1").toggleClass("active");
    $("#player2").toggleClass("active");
  });


});




/*
- for each turn:
    - on hover over each square, svg appears
    - player picks a square by clicking
    - svg is added to that square
    - blue background is added to that square
    - then that square isn't available anymore
    - can I use filter to weed out squares that are taken?
    - test state of board against all possible solutions
    - if player wins, indicate that
    - game is over
    - else, active class toggles to other player
*/
