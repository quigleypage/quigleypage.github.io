var wordLength = 5;
var chances = 6;
var size = wordLength*chances;
var guessArray = [];
var rowTracker = 1;
var currentGuess = "";
var won = false;
var startDateTime;

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
var showHistoricPlot = false;
for(var m = 1; m <= chances; m++){
    if(getCookie("distributionOfWonGuesses" + m.toString()) != ""){
        distributionOfWonGuesses[m] = parseInt(getCookie("distributionOfWonGuesses" + m.toString())); // this is indexed at 1-6
        showHistoricPlot = true;
    }
    else{
        distributionOfWonGuesses[m] = 0;
    }
    distributionYData.push(m); // note, this is indexed at 0-5, not 1-6. This is correced for in the plotDist function
}
if(showHistoricPlot == true){
    plotDist();
}

function keyPress(selectedLetter){
    
    if(startDateTime == undefined){ //start the timer after the first letter is played
        startDateTime = new Date();
        //console.log(startDateTime);
    }


    if(selectedLetter == "enter" && won == false){ //replace with spin button selected and money is positive

        if(dictionaryArray.includes(currentGuess) || validWordList.includes(currentGuess) || currentGuess == targetWord){ // if the current guess is a valid word in the dictionary
            
            if(currentGuess == targetWord){
                //win condition

                //save the win stats
                
                // # games won
                gamesWon += 1; 
                setCookie("gamesWon", gamesWon.toString());
                document.getElementById("gamesWon").innerHTML = "Won: " + gamesWon.toString() + " (" + Math.round((gamesWon/gamesPlayed)*100).toString() + "%)";
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
                document.getElementById("playAgain").innerHTML = "<button class='playAgain' onclick='loadNewGame()'><b>Save & Play Again</b></button>   <button class='playAgain' onclick='generateEmojiShare()'><b>Share</b></button>";
                modal.style.display = "block";
                //generateEmojiShare();
            }
            else{ //if they did not win yet
                if(rowTracker < size/wordLength){ //let them keep playing
                    rowTracker += 1;
                }
                else{ //they lost
                    //you lose
                    console.log("You lose!");
                    document.getElementById("winorlose").innerHTML = "<br>You lost, the word was " + targetWord.toUpperCase() + "!<br>";
                    document.getElementById("playAgain").innerHTML = "<button class='playAgain' onclick='loadNewGame()'><b>Save & Play Again</b></button>   <button class='playAgain' onclick='generateEmojiShare()'><b>Share</b></button>";
                    modal.style.display = "block";
                    //generateEmojiShare();
                    
                    //save the lost stats
                    document.getElementById("gamesWon").innerHTML = "Won: " + gamesWon.toString() + " (" + Math.round((gamesWon/gamesPlayed)*100).toString() + "%)";
                }
            }
            currentGuess = "";
        }
        else{ //if the user guessed an invalid word
            for(var i = wordLength*(rowTracker-1); i < guessArray.length; i++){
                document.getElementById(i).style.color = "#ff6961";
                document.getElementById(i).style.animation = "shake 0.5s";
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

function setCookie(cname, cvalue) {
    var exdays = 36525;
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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
            fixedrange: true,
        },
        xaxis:{
            showgrid: false,
            fixedrange: true,
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

function loadNewGame(){
    window.location = window.location.href.split("?")[0];
}

function generateEmojiShare(){
    var emojiString = "Check out this heterogram!\nHere's how I did:\n\nPlayed: " + gamesPlayed.toString() + "\nWon: " + gamesWon.toString() + " (" + Math.round((gamesWon/gamesPlayed)*100).toString() + "%)\nAverage Time: " + avgDisplayTime + "\nAverage Guesses: " + (sumOfWonGuesses / gamesWon).toFixed(1).toString() + "\n\n";
    var shareLink = "https://quigley.page/heterogram/?s=" + encryptMakeYourOwn(targetWord);
    for(var w = 0; w < guessArray.length; w++){
        if(document.getElementById(w).style.background == "rgb(166, 236, 168)"){
            emojiString += "🟩";
        }
        else if(document.getElementById(w).style.background == "rgb(234, 228, 166)"){
            emojiString += "🟨";
        }
        else{
            emojiString += "⬜";
        }

        if((w+1)%wordLength == 0){
            emojiString += "\n";
        }
    }
    console.log(emojiString);
    const shareData = {
        title: 'slotle',
        text: emojiString,
        url: shareLink
    }
    navigator.share(shareData);
}

// slot functionality
(function () {
    const items = ['🍭','❌','⛄️','🦄','🍌','💩','👻','😻','💵','🤡','🦖','🍎','🖕','🔥','😭','😂','🥺','🤣','❤️','✨','🙏','🐃','7️⃣','💯','🐉','🔔',];
    const doors = document.querySelectorAll('.door');
    
    document.querySelector('#spinner').addEventListener('click', spin);
    document.querySelector('#reseter').addEventListener('click', init);
  
    function init(firstInit = true, groups = 1, duration = 1) {
      for (const door of doors) {
        if (firstInit) {
          door.dataset.spinned = '0';
        } else if (door.dataset.spinned === '1') {
          return;
        }
  
        const boxes = door.querySelector('.boxes');
        const boxesClone = boxes.cloneNode(false);
        const pool = ['❓'];
  
        if (!firstInit) {
          const arr = [];
          for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
            arr.push(...items);
          }
          pool.push(...shuffle(arr));
          console.log(pool[pool.length-1]); // this is where we can append the result - KEVIN LOOK AT THIS LINE OF CODE

          boxesClone.addEventListener(
            'transitionstart',
            function () {
              door.dataset.spinned = '1';
              this.querySelectorAll('.box').forEach((box) => {
                box.style.filter = 'blur(1px)';
              });
            },
            { once: true }
          );
  
          boxesClone.addEventListener(
            'transitionend',
            function () {
              this.querySelectorAll('.box').forEach((box, index) => {
                box.style.filter = 'blur(0)';
                if (index > 0) this.removeChild(box);
              });
            },
            { once: true }
          );
        }
  
        for (let i = pool.length - 1; i >= 0; i--) {
          const box = document.createElement('div');
          box.classList.add('box');
          box.style.width = door.clientWidth + 'px';
          box.style.height = door.clientHeight + 'px';
          box.textContent = pool[i];
          boxesClone.appendChild(box);
        }
        boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
        boxesClone.style.transform = `translateY(-${door.clientHeight * (pool.length - 1)}px)`;
        door.replaceChild(boxesClone, boxes);
      }
    }
  
    async function spin() {
      init(false, 1, 2);
      
      for (const door of doors) {
        const boxes = door.querySelector('.boxes');
        const duration = parseInt(boxes.style.transitionDuration);
        boxes.style.transform = 'translateY(0)';
        await new Promise((resolve) => setTimeout(resolve, duration * 100));
      }

      //update saved statistics
      gamesPlayed += 1; // # games played
      setCookie("gamesPlayed", gamesPlayed.toString());
      document.getElementById("gamesPlayed").innerHTML = "<br>Played: " + gamesPlayed;

    }
  
    function shuffle([...arr]) {
      let m = arr.length;
      while (m) {
        const i = Math.floor(Math.random() * m--);
        [arr[m], arr[i]] = [arr[i], arr[m]];
      }
      return arr;
    }
  
    init();
  })();