var targetWord = "steak";
var wordLength = 5;
var chances = 6;
var size = wordLength*chances;
var nextSpace = 0;
var guessArray = [];
var rowTracker = 1;
var currentGuess = "";
var won = false;
var startDateTime = new Date();

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
document.getElementById("gamesWon").innerHTML = "Won: " + gamesWon.toString() + " (" + Math.round((gamesWon/gamesPlayed)*100).toString() + "%)";
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
if(getCookie("sumOfWonGuesses") != ""){
    var sumOfWonGuesses = parseInt(getCookie("sumOfWonGuesses"));
}
else{
    var sumOfWonGuesses = 0;
}
document.getElementById("avgGuesses").innerHTML = "Average Guesses: " + (sumOfWonGuesses / gamesWon).toFixed(1).toString();
if(getCookie("sumOfWonDurations") != ""){
    var sumOfWonDurations = parseFloat(getCookie("sumOfWonDurations")); // read in sumOfWonDurations in minutes
}
else{
    var sumOfWonDurations = 0;
}
var avgTime = sumOfWonDurations / gamesWon; // convert to average duration in minutes
var avgDisplayTime = (Math.floor(avgTime)).toString() + "m " + (Math.round(((avgTime - Math.floor(avgTime))*60))).toString() + "s"; // convert to minutes and seconds
document.getElementById("avgDuration").innerHTML = "Average Time: " + avgDisplayTime;
var distributionOfWonGuesses = [];
var distributionYData = [];
for(var m = 1; m <= chances; m++){
    if(getCookie("distributionOfWonGuesses" + m.toString()) != ""){
        distributionOfWonGuesses[m] = parseInt(getCookie("distributionOfWonGuesses" + m.toString())); // this is indexed at 1-6
    }
    else{
        distributionOfWonGuesses[m] = 0;
    }
    distributionYData.push(m); // note, this is indexed at 0-5, not 1-6. This is correced for in the plotDist function
}
if(getCookie("distributionOfWonGuesses1") != ""){
    plotDist();
}

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

            //save the win stats
            gamesPlayed += 1; // # games played
            setCookie("gamesPlayed", gamesPlayed.toString());
            document.getElementById("gamesPlayed").innerHTML = "<br>Played: " + gamesPlayed;
            // # games won
            gamesWon += 1; 
            setCookie("gamesWon", gamesWon.toString());
            document.getElementById("gamesWon").innerHTML = "Won: " + gamesWon.toString() + " (" + Math.round((gamesWon/gamesPlayed)*100).toString() + "%)";
            // current streak
            currentStreak += 1; 
            setCookie("currentStreak", currentStreak.toString());
            document.getElementById("currentStreak").innerHTML = "Current Streak: " + currentStreak.toString();
            // max streak
            if(currentStreak > maxStreak){maxStreak = currentStreak;} 
            setCookie("maxStreak", maxStreak.toString());
            document.getElementById("maxStreak").innerHTML = "Max Streak: " + maxStreak.toString();
            // sum of won guesses and average guesses
            sumOfWonGuesses += rowTracker; 
            setCookie("sumOfWonGuesses", sumOfWonGuesses.toString());
            document.getElementById("avgGuesses").innerHTML = "Average Guesses: " + (sumOfWonGuesses / gamesWon).toFixed(1).toString();
            // current time, sum of won durations and average duration
            var endDateTime = new Date();
            var diff = (endDateTime.getTime() - startDateTime.getTime()) / 1000;
            diff /= 60;
            var currentTime = Math.abs(diff); // difference between start and end time in minutes
            sumOfWonDurations += currentTime;
            setCookie("sumOfWonDurations", sumOfWonDurations.toString());
            var currentDisplayTime = (Math.floor(currentTime)).toString() + "m " + (Math.round(((currentTime - Math.floor(currentTime))*60))).toString() + "s";
            avgTime = sumOfWonDurations / gamesWon;
            avgDisplayTime = (Math.floor(avgTime)).toString() + "m " + (Math.round(((avgTime - Math.floor(avgTime))*60))).toString() + "s"; // convert from minutes to minutes and seconds
            document.getElementById("avgDuration").innerHTML = "Average Time: " + avgDisplayTime;
            // allocate guess distribution
            distributionOfWonGuesses[rowTracker] += 1;
            setCookie("distributionOfWonGuesses" + rowTracker.toString(), distributionOfWonGuesses[rowTracker].toString());
            plotDist();
            
            //show win stats
            won = true;
            console.log("You win!");
            if(rowTracker == 1){
                document.getElementById("winorlose").innerHTML = "<br>Wow, you won on the first try!<br>Time: " + currentDisplayTime + "<br>";
            }
            else{
                document.getElementById("winorlose").innerHTML = "<br>You won after " + rowTracker.toString() + " guesses in " + currentDisplayTime + "!<br>";
            }
            document.getElementById("playAgain").innerHTML = "<button class='playAgain' onclick='window.location.reload();'><b>Play Again</b></button>"
            modal.style.display = "block";

        }
        else{ //if they did not win yet
            if(rowTracker < size/wordLength){ //let them keep playing
                rowTracker += 1;
            }
            else{ //they lost
                //you lose
                console.log("You lose!");
                document.getElementById("winorlose").innerHTML = "<br>You lost, the word was " + targetWord.toUpperCase() + "!<br>";
                modal.style.display = "block";
                
                //save the lost stats
                gamesPlayed += 1;
                setCookie("gamesPlayed", gamesPlayed.toString());
                document.getElementById("gamesPlayed").innerHTML = "<br>Played: " + gamesPlayed;
                document.getElementById("gamesWon").innerHTML = "Won: " + gamesWon.toString() + " (" + Math.round((gamesWon/gamesPlayed)*100).toString() + "%)";
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

function plotDist(){
    var distributionXData = [];
    for(var n = 1; n <= chances; n++){
        distributionXData.push(distributionOfWonGuesses[n]);
    }
    var distChartData = [
        {
            type: 'bar',
            x: distributionXData,
            y: distributionYData,
            orientation: 'h',
            textposition: 'inside',
            text: distributionXData,
        }
      ];
    var config = {
        modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'resetScale2d', 'hoverClosestGl2d', 'hoverClosestPie','toggleHover', 'resetViews', 'sendDataToCloud', 'toggleSpikelines', 'resetViewMapbox','hoverClosestCartesian', 'hoverCompareCartesian','toImage'], 
        displaylogo: false,
        responsive: true,
    };
    var layout = {
        yaxis: {
            tick0: 1,
            dtick: 1,
            tickfont: {
                family: 'Roboto, sans-serif',
                size: 28,
            },
        },
        xaxis:{
            showgrid: false,
        },
        margin: {
            l: 40,
            r: 100,
            b: 0,
            t: 70,
            pad: 16,
        },
        font: {
            size: 24,
            family: 'Roboto, sans-serif',
        }
    };
      
    Plotly.newPlot('distrbutionChart', distChartData, layout, config);
}