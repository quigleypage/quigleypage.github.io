//var activeColor = "rgb(127, 201, 255)";
//var inactiveColor = "rgb(241, 241, 241)";
var size = 30;
var wordLength = 5;
var nextSpace = 0;
var guessArray = [];

var targetWord = "steak";

function loadBoard(){
    
    //reset board in case there is previous data
    document.getElementById("boardSpace").innerHTML = "";

    //generate the grid
    for(var i = 0; i < size; i++){
        document.getElementById("boardSpace").innerHTML += '<div class="square" id="' + i.toString() + '"><div class="content"><div class="table"><div class="table-cell" id="Space' + i.toString() + '"></div></div></div></div>';
    }

    document.getElementById("keyboard").innerHTML += '<div class="keys" id="Q" onclick="keyPress(id)"><div class="keyLetter"><div class="table"><div class="table-cell"><b>Q</b></div></div></div></div>';
    document.getElementById("keyboard").innerHTML += '<div class="keys" id="W" onclick="keyPress(id)"><div class="keyLetter"><div class="table"><div class="table-cell"><b>W</b></div></div></div></div>';
    document.getElementById("keyboard").innerHTML += '<div class="keys" id="E" onclick="keyPress(id)"><div class="keyLetter"><div class="table"><div class="table-cell"><b>E</b></div></div></div></div>';
    document.getElementById("keyboard").innerHTML += '<div class="keys" id="R" onclick="keyPress(id)"><div class="keyLetter"><div class="table"><div class="table-cell"><b>R</b></div></div></div></div>';
    document.getElementById("keyboard").innerHTML += '<div class="keys" id="T" onclick="keyPress(id)"><div class="keyLetter"><div class="table"><div class="table-cell"><b>T</b></div></div></div></div>';
    document.getElementById("keyboard").innerHTML += '<div class="keys" id="Y" onclick="keyPress(id)"><div class="keyLetter"><div class="table"><div class="table-cell"><b>Y</b></div></div></div></div>';
    document.getElementById("keyboard").innerHTML += '<div class="keys" id="U" onclick="keyPress(id)"><div class="keyLetter"><div class="table"><div class="table-cell"><b>U</b></div></div></div></div>';
    document.getElementById("keyboard").innerHTML += '<div class="keys" id="I" onclick="keyPress(id)"><div class="keyLetter"><div class="table"><div class="table-cell"><b>I</b></div></div></div></div>';
    document.getElementById("keyboard").innerHTML += '<div class="keys" id="O" onclick="keyPress(id)"><div class="keyLetter"><div class="table"><div class="table-cell"><b>O</b></div></div></div></div>';
    document.getElementById("keyboard").innerHTML += '<div class="keys" id="P" onclick="keyPress(id)"><div class="keyLetter"><div class="table"><div class="table-cell"><b>P</b></div></div></div></div>';
    document.getElementById("keyboard").innerHTML += '<div class="spacer"><div class="keyLetter"><div class="table"><div class="table-cell"></div></div></div></div>';
    document.getElementById("keyboard").innerHTML += '<div class="keys" id="A" onclick="keyPress(id)"><div class="keyLetter"><div class="table"><div class="table-cell"><b>A</b></div></div></div></div>';
    document.getElementById("keyboard").innerHTML += '<div class="keys" id="S" onclick="keyPress(id)"><div class="keyLetter"><div class="table"><div class="table-cell"><b>S</b></div></div></div></div>';
    document.getElementById("keyboard").innerHTML += '<div class="keys" id="D" onclick="keyPress(id)"><div class="keyLetter"><div class="table"><div class="table-cell"><b>D</b></div></div></div></div>';
    document.getElementById("keyboard").innerHTML += '<div class="keys" id="F" onclick="keyPress(id)"><div class="keyLetter"><div class="table"><div class="table-cell"><b>F</b></div></div></div></div>';
    document.getElementById("keyboard").innerHTML += '<div class="keys" id="G" onclick="keyPress(id)"><div class="keyLetter"><div class="table"><div class="table-cell"><b>G</b></div></div></div></div>';
    document.getElementById("keyboard").innerHTML += '<div class="keys" id="H" onclick="keyPress(id)"><div class="keyLetter"><div class="table"><div class="table-cell"><b>H</b></div></div></div></div>';
    document.getElementById("keyboard").innerHTML += '<div class="keys" id="J" onclick="keyPress(id)"><div class="keyLetter"><div class="table"><div class="table-cell"><b>J</b></div></div></div></div>';
    document.getElementById("keyboard").innerHTML += '<div class="keys" id="K" onclick="keyPress(id)"><div class="keyLetter"><div class="table"><div class="table-cell"><b>K</b></div></div></div></div>';
    document.getElementById("keyboard").innerHTML += '<div class="keys" id="L" onclick="keyPress(id)"><div class="keyLetter"><div class="table"><div class="table-cell"><b>L</b></div></div></div></div>';
    document.getElementById("keyboard").innerHTML += '<div class="backspaceKey" id="enter" onclick="keyPress(id)"><div class="keyLetter"><div class="table"><div class="table-cell"><i class="fas fa-paper-plane"></i></div></div></div></div>';
    document.getElementById("keyboard").innerHTML += '<div class="keys" id="Z" onclick="keyPress(id)"><div class="keyLetter"><div class="table"><div class="table-cell"><b>Z</b></div></div></div></div>';
    document.getElementById("keyboard").innerHTML += '<div class="keys" id="X" onclick="keyPress(id)"><div class="keyLetter"><div class="table"><div class="table-cell"><b>X</b></div></div></div></div>';
    document.getElementById("keyboard").innerHTML += '<div class="keys" id="C" onclick="keyPress(id)"><div class="keyLetter"><div class="table"><div class="table-cell"><b>C</b></div></div></div></div>';
    document.getElementById("keyboard").innerHTML += '<div class="keys" id="V" onclick="keyPress(id)"><div class="keyLetter"><div class="table"><div class="table-cell"><b>V</b></div></div></div></div>';
    document.getElementById("keyboard").innerHTML += '<div class="keys" id="B" onclick="keyPress(id)"><div class="keyLetter"><div class="table"><div class="table-cell"><b>B</b></div></div></div></div>';
    document.getElementById("keyboard").innerHTML += '<div class="keys" id="N" onclick="keyPress(id)"><div class="keyLetter"><div class="table"><div class="table-cell"><b>N</b></div></div></div></div>';
    document.getElementById("keyboard").innerHTML += '<div class="keys" id="M" onclick="keyPress(id)"><div class="keyLetter"><div class="table"><div class="table-cell"><b>M</b></div></div></div></div>';
    document.getElementById("keyboard").innerHTML += '<div class="backspaceKey" id="backspace" onclick="keyPress(id)"><div class="keyLetter"><div class="table"><div class="table-cell"><i class="fas fa-backspace"></i></div></div></div></div>';

}

function keyPress(selectedLetter){
    
    if(nextSpace < wordLength && selectedLetter != "backspace" && selectedLetter != "enter"){
        document.getElementById("Space" + nextSpace.toString()).innerHTML = selectedLetter;
        document.getElementById(nextSpace.toString()).style.outlineColor = "#404040";
        document.getElementById(nextSpace.toString()).style.animation = "pulse 1s";
        guessArray.push(selectedLetter.toLowerCase());
        nextSpace += 1;
    }
    else if(selectedLetter == "backspace"){
        document.getElementById("Space" + (nextSpace-1).toString()).innerHTML = "";
        document.getElementById((nextSpace-1).toString()).style.outlineColor = "#b1b1b1";
        document.getElementById((nextSpace-1).toString()).style.animation = "";
        guessArray.pop();
        nextSpace-=1;
    }
    else if(selectedLetter == "enter"){
        for(var l = 0; l < guessArray.length; l++){
            console.log(guessArray[l] + " : " + targetWord[l]);
            if(guessArray[l] == targetWord[l]){
                document.getElementById(l).style.outlineColor = "#A6ECA8";
                document.getElementById(l).style.background = "#A6ECA8";
                document.getElementById(l).style.color = "#FFFFFF";
            }
            else{
                for(var k = 0; k < targetWord.length; k++){
                    if(guessArray[l] == targetWord[k]){
                        document.getElementById(l).style.outlineColor = "#EAE4A6";
                        document.getElementById(l).style.background = "#EAE4A6";
                        document.getElementById(l).style.color = "#FFFFFF";s";
                    }
                }
                if(document.getElementById(l).style.background == ""){
                    document.getElementById(l).style.outlineColor = "#C0C0C0";
                    document.getElementById(l).style.background = "#C0C0C0";
                    document.getElementById(l).style.color = "#FFFFFF";
                }
            }
        }
    }

    console.log(guessArray);
    
}


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
}


var modal2 = document.getElementById("myModal2");
var btn2 = document.getElementById("myBtn2");
var span2 = document.getElementsByClassName("close")[1];
btn2.onclick = function() {
  modal2.style.display = "block";
}
span2.onclick = function() {
  modal2.style.display = "none";
}