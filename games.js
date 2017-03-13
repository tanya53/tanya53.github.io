var numberOfFaces = 2;
function generateFaces(){
  console.log(numberOfFaces);
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
    console.log("creating the left side");
  }
  // need to clone images to the right side
  var the_clone=theLeftSide.cloneNode(true);
  the_clone.removeChild(the_clone.lastChild);
  theRightSide.appendChild(the_clone);
  console.log("removed one of the children");

  //increase the number of faces and start over, passed level
  theLeftSide.lastChild.onclick=function nextLevel(event){
    console.log("seeing if we passed the test");
    event.stopPropagation();
    numberOfFaces += 2;
  while(theLeftSide.firstChild)
    theLeftSide.removeChild(theLeftSide.firstChild);
  while(theRightSide.firstChild)
      theRightSide.removeChild(theRightSide.firstChild);
      generateFaces();
    };

   //got wrong answer
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
     console.log("there was an error");
     alert("Game Over!");
     gameArea.onclick=null;
     //theLeftSide.lastChild.onclick=null;
     numberOfFaces = 2;

     }
   }

$(document).ready(function(){
  console.log('we executed this code');
  $("#gamebtn").on('click',function(){
    // adds the faces to the right side in random locations
    console.log("we clicked the button");
    generateFaces();
    console.log("we are back from generateFaces");
  });

  console.log("we made it to here");
});
