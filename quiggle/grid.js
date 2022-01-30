var targetWord = "steak";
var wordLength = 5;
var chances = 6;
var size = wordLength*chances;
var nextSpace = 0;
var guessArray = [];
var rowTracker = 1;
var currentGuess = "";
var won = false;

//load saved data
if(getCookie("gamesPlayed") != ""){
    var gamesPlayed = parseInt(getCookie("gamesPlayed"));
}
else{
    var gamesPlayed = 0;
}
document.getElementById("gamesPlayed").innerHTML = "<br>Played: " + gamesPlayed;
if(getCookie("gamesWon") != ""){
    var gamesWon = parseInt(getCookie("gamesWon"));
}
else{
    var gamesWon = 0;
}
document.getElementById("gamesWon").innerHTML = "Won: " + gamesWon.toString();
if(getCookie("currentStreak") != ""){
    var currentStreak = parseInt(getCookie("currentStreak"));
}
else{
    var currentStreak = 0;
}
document.getElementById("currentStreak").innerHTML = "Current Streak: " + currentStreak.toString();
if(getCookie("maxStreak") != ""){
    var maxStreak = parseInt(getCookie("maxStreak"));
}
else{
    var maxStreak = 0;
}
document.getElementById("maxStreak").innerHTML = "Max Streak: " + maxStreak.toString();


function loadBoard(){
    
    nextSpace = 0;
    guessArray = [];
    rowTracker = 1;
    currentGuess = "";
    won = false;

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
    
    if(nextSpace < wordLength*rowTracker && selectedLetter != "backspace" && selectedLetter != "enter" && won == false){
        document.getElementById("Space" + nextSpace.toString()).innerHTML = selectedLetter;
        document.getElementById(nextSpace.toString()).style.outlineColor = "#404040";
        document.getElementById(nextSpace.toString()).style.animation = "pulse 1s";
        
        document.getElementById(selectedLetter).style.opacity = 0.4;
        document.getElementById(selectedLetter).style.pointerEvents = 'none';

        guessArray.push(selectedLetter.toLowerCase());
        nextSpace += 1;
    }
    else if(selectedLetter == "backspace" && (nextSpace) > wordLength*(rowTracker-1) && won == false){
        document.getElementById("Space" + (nextSpace-1).toString()).innerHTML = "";
        document.getElementById((nextSpace-1).toString()).style.outlineColor = "#b1b1b1";
        document.getElementById((nextSpace-1).toString()).style.animation = "";
        
        document.getElementById(guessArray[guessArray.length-1].toUpperCase()).style.opacity = 1.0;
        document.getElementById(guessArray[guessArray.length-1].toUpperCase()).style.pointerEvents = 'auto'; 
        
        guessArray.pop();
        nextSpace-=1;
    }
    else if(selectedLetter == "enter" && guessArray.length == wordLength*rowTracker && won == false){
        for(var l = wordLength*(rowTracker-1); l < guessArray.length; l++){
            currentGuess += guessArray[l];
            //console.log(guessArray[l] + " : " + targetWord[l-(wordLength*(rowTracker-1))]);
            if(guessArray[l] == targetWord[l-(wordLength*(rowTracker-1))]){
                document.getElementById(l).style.outlineColor = "#A6ECA8";
                document.getElementById(l).style.background = "#A6ECA8";
                document.getElementById(l).style.color = "#FFFFFF";
                document.getElementById(l).style.animation = "pulse2 0.5s";
               
                document.getElementById(guessArray[l].toUpperCase()).style.background = "#A6ECA8";
                document.getElementById(guessArray[l].toUpperCase()).style.color = "#FFFFFF";
                
                //temp - keep green buttons active
                document.getElementById(guessArray[l].toUpperCase()).style.opacity = "1.0";
                document.getElementById(guessArray[l].toUpperCase()).style.pointerEvents = 'auto';
                
                //disbale green button
                //document.getElementById(guessArray[l].toUpperCase()).style.opacity = "0.4";
                //document.getElementById(guessArray[l].toUpperCase()).style.pointerEvents = 'none';

                //automatically copy the greens to the next row
                /*if(rowTracker < size/wordLength){
                    document.getElementById(l+wordLength).style.outlineColor = "#A6ECA8";
                    document.getElementById(l+wordLength).style.background = "#A6ECA8";
                    document.getElementById(l+wordLength).style.color = "#FFFFFF";
                    document.getElementById(l+wordLength).style.animation = "pulse2 0.5s";
                    document.getElementById("Space" + (l+wordLength).toString()).innerHTML = guessArray[l].toUpperCase();
                    guessArray[l+wordLength] = guessArray[l];
                }*/
            }
            else{
                for(var k = 0; k < targetWord.length; k++){
                    if(guessArray[l] == targetWord[k]){
                        document.getElementById(l).style.outlineColor = "#EAE4A6";
                        document.getElementById(l).style.background = "#EAE4A6";
                        document.getElementById(l).style.color = "#FFFFFF";
                        document.getElementById(guessArray[l].toUpperCase()).style.background = "#EAE4A6";
                        document.getElementById(guessArray[l].toUpperCase()).style.color = "#FFFFFF";
                        document.getElementById(guessArray[l].toUpperCase()).style.opacity = "1.0";
                        document.getElementById(guessArray[l].toUpperCase()).style.pointerEvents = "auto";
                    }
                }
                if(document.getElementById(l).style.background == ""){
                    document.getElementById(l).style.outlineColor = "#C0C0C0";
                    document.getElementById(l).style.background = "#C0C0C0";
                    document.getElementById(l).style.color = "#FFFFFF";
                    document.getElementById(guessArray[l].toUpperCase()).style.background = "#C0C0C0";
                    document.getElementById(guessArray[l].toUpperCase()).style.color = "#FFFFFF";
                    document.getElementById(guessArray[l].toUpperCase()).style.opacity = "0.4";
                    document.getElementById(guessArray[l].toUpperCase()).style.pointerEvents = 'none';
                }
            }
        }


        console.log(currentGuess);
        if(currentGuess == targetWord){
            //win condition
            won = true;
            console.log("You win!");
            if(rowTracker == 1){
                document.getElementById("winorlose").innerHTML = "<br>Wow, you won on the first try!<br>";
            }
            else{
                document.getElementById("winorlose").innerHTML = "<br>You won after " + rowTracker.toString() + " guesses!<br>";
            }
            modal.style.display = "block";

            //save the win stats
            gamesPlayed += 1;
            setCookie("gamesPlayed", gamesPlayed.toString());
            document.getElementById("gamesPlayed").innerHTML = "<br>Played: " + gamesPlayed;
            gamesWon += 1;
            setCookie("gamesWon", gamesWon.toString());
            document.getElementById("gamesWon").innerHTML = "Won: " + gamesWon.toString();
            currentStreak += 1;
            setCookie("currentStreak", currentStreak.toString());
            document.getElementById("currentStreak").innerHTML = "Current Streak: " + currentStreak.toString();
            if(currentStreak > maxStreak){maxStreak = currentStreak;}
            setCookie("maxStreak", maxStreak.toString());
            document.getElementById("maxStreak").innerHTML = "Max Streak: " + maxStreak.toString();
        }
        else{
            if(rowTracker < size/wordLength){
                rowTracker += 1;
            }
            else{
                //you lose
                console.log("You lose!");
                document.getElementById("winorlose").innerHTML = "<br>You lost, the word was " + targetWord.toUpperCase() + "!<br>";
                modal.style.display = "block";
                
                //save the lost stats
                gamesPlayed += 1;
                setCookie("gamesPlayed", gamesPlayed.toString());
                document.getElementById("gamesPlayed").innerHTML = "<br>Played: " + gamesPlayed;
                document.getElementById("gamesWon").innerHTML = "Won: " + gamesWon.toString();
                currentStreak = 0;
                setCookie("currentStreak", currentStreak.toString());
                document.getElementById("currentStreak").innerHTML = "Current Streak: " + currentStreak.toString();
            }
        }
        currentGuess = "";
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

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}