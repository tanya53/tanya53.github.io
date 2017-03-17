//https://books.google.com/books?id=G14FCgAAQBAJ&pg=PA59&lpg=PA59&dq=use+sprite+sheet+to+create+playing+cards+javascript&source=bl&ots=tQtTex2LiD&sig=4LkAt73_HfGhtuRwaBCpJWRVCh0&hl=en&sa=X&ved=0ahUKEwjIrP34kM3SAhWqjlQKHdlLD4gQ6AEIHzAB#v=onepage&q=use%20sprite%20sheet%20to%20create%20playing%20cards%20javascript&f=false
//http://www.piskelapp.com/
var matchingGame = {};
matchingGame.deck = [
  'cardAndre','cardAndre',
  'cardBuffy','cardBuffy',
  'cardDraco','cardDraco',
  'cardGeorge','cardGeorge',
  'cardGertrude','cardGertrude',
  'cardHillary','cardHillary',
  'cardIsabella','cardIsabella',
  'cardKonrad','cardKonrad',
  'cardLaLa','cardLaLa',
  'cardLauence','cardLauence',
  'cardLeo','cardLeo',
  'cardMartha','cardMartha',
  'cardOliver','cardOliver',
  'cardPatti','cardPatti',
  'cardPeter','cardPeter',
  'cardPetunia','cardPetunia',
  'cardPrudence','cardPrudence',
  'cardSergio','cardSergio',
  'cardTig','cardTig',
];

function shuffle(){
  return 0.5 - Math.random();
}

function selectCard(){
  //we do nothing if there are already two card flipped.
  console.log("length ",$(".card-flipped").length);
  if ($(".card-flipped").length > 1){
    console.log("*****point 1");
    return;
  }
  console.log("added card-flipped class");
  console.log(this);
  $(this).addClass("card-flipped");
  //check the pattern of bloth flipped card 0.7s later
  if ($(".card-flipped").length ===2){
    console.log("point 2");
    setTimeout(checkPattern,1500);
  }
}

function checkPattern(){
  if (isMatchPattern()){
    console.log("found match");
    $(".card-flipped").removeClass("card-flipped").addClass("card-removed");
    $("card-removed").bind("transitioned",removeTookCards());
  } else {
    console.log("did not find match");
    $(".card-flipped").removeClass("card-flipped");
  }
}
function isMatchPattern(){
  var cards = $(".card-flipped");
  var pattern = $(cards[0]).data("pattern");
  var anotherPattern = $(cards[1]).data("pattern");
  console.log(pattern, anotherPattern);
  return (pattern === anotherPattern);
}

function removeTookCards(){
  $(".card-removed").remove();
}

$(function(){
  matchingGame.deck.sort(shuffle);
  //clone 12 copies of the card
  for (var i=0; i<37; i++){
    $(".card:first-child").clone().appendTo("#cards");
  }
  //initialze each card's position
  $("#cards").children().each(function(index){
    //align the cards to be 4 x 3
    var x = ($(this).width() + 20) * (index %7);
    var y = ($(this).height() + 20) * Math.floor(index/7);
    $(this).css("transform","translateX(" + x +"px) translateY(" +y+"px)");
    //get a pattern from the shuffled deck
    var pattern = matchingGame.deck.pop();
    //visually apply the pattern on the card's back side.
    $(this).find(".back").addClass(pattern);

    //embed the pattern data into the DOM element
    $(this).attr("data-pattern",pattern);

    //listen the click event on each card DIV element
    $(this).click(selectCard);
  });
});
