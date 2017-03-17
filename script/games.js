//number of faces to start with
var numberOfFaces = 2;

function generateFaces(){
  var theLeftSide = document.getElementById("leftside");
   var theRightSide = document.getElementById("rightside");
  for (i = 0; i<numberOfFaces;i++){
    var img = document.createElement("img");
    var top = Math.floor(Math.random()*400);
    var left = Math.floor(Math.random()*400);
    top=top.toString() + "px";
    left=left.toString() + "px";
    img.setAttribute('src','images/bear.png');
    img.setAttribute('position','absolute');
    img.setAttribute("class",'bearpng');
    theLeftSide.appendChild(img);
    theLeftSide.lastChild.style.top= top;
    theLeftSide.lastChild.style.left= left;
  }
  // need to clone images to the right side
  var the_clone=theLeftSide.cloneNode(true);
  the_clone.removeChild(the_clone.lastChild);
  theRightSide.appendChild(the_clone);

  //increase the number of faces and start over, passed level
  theLeftSide.lastChild.onclick=function nextLevel(event){
    event.stopPropagation();
    numberOfFaces += 2;
    while(theLeftSide.firstChild)
      theLeftSide.removeChild(theLeftSide.firstChild);
    while(theRightSide.firstChild)
      theRightSide.removeChild(theRightSide.firstChild);
    generateFaces();
    };

   //incorrect answer
   var gameArea = document.getElementById("gameArea");
   gameArea.onclick = function gameOver(){
     var theLeftSide = document.getElementById("leftside");
     var theRightSide = document.getElementById("rightside");
     while(theLeftSide.firstChild){
       theLeftSide.removeChild(theLeftSide.firstChild);
       }
     while(theRightSide.firstChild){
       theRightSide.removeChild(theRightSide.firstChild);
     }
     alert("Game Over!");
     gameArea.onclick=null;
     numberOfFaces = 2;

     }
   }

$(document).ready(function(){
  console.log('we executed this code');
  $("#gamebtn").on('click',function(){
    //need to reset if hit play while playing
    $("#leftside").empty();
    $("#rightside").empty();
    numberOfFaces = 2;
    generateFaces();
  });

});
