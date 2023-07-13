var turnCounter = 1; // track which turn it is
var correctAnswer = 0; // the correct number of likes
var currentGuess = 0; // the users last guess
var shareText = "";
var nations = ['China','India','United States','Indonesia','Pakistan','Nigeria','Brazil','Bangladesh','Russia','Mexico','Japan','Philippines','Ethiopia','Egypt','Vietnam','DR Congo','Iran','Turkey','Germany','Thailand','France','United Kingdom','Tanzania','South Africa','Italy','Myanmar','Colombia','Kenya','South Korea','Spain','Argentina','Algeria','Iraq','Uganda','Sudan','Ukraine','Canada','Poland','Morocco','Uzbekistan','Afghanistan','Peru','Angola','Malaysia','Mozambique','Saudi Arabia','Yemen','Ghana','Ivory Coast','Nepal','Venezuela','Madagascar','Australia','North Korea','Cameroon','Niger','Taiwan','Mali','Syria','Burkina Faso','Sri Lanka','Malawi','Chile','Kazakhstan','Zambia','Romania','Ecuador','Netherlands','Somalia','Senegal','Guatemala','Chad','Cambodia','Zimbabwe','Guinea','South Sudan','Rwanda','Burundi','Benin','Bolivia','Tunisia','Belgium','Haiti','Jordan','Cuba','Czech Republic','Sweden','Dominican Republic','Greece','Portugal','Azerbaijan','Israel','Hungary','Honduras','Tajikistan','United Arab Emirates','Belarus','Papua New Guinea','Austria','Switzerland','Sierra Leone','Togo','Paraguay','Laos','Hong Kong (China)','Kyrgyzstan','Libya','El Salvador','Serbia','Nicaragua','Turkmenistan','Bulgaria','Congo','Denmark','Central African Republic','Finland','Norway','Lebanon','Palestine','Singapore','Slovakia','Costa Rica','New Zealand','Ireland','Oman','Kuwait','Liberia','Mauritania','Panama','Croatia','Eritrea','Georgia','Uruguay','Mongolia','Bosnia and Herzegovina','Puerto Rico (US)','Qatar','Armenia','Lithuania','Jamaica','Albania','Moldova','Namibia','Gambia','Botswana','Lesotho','Gabon','Slovenia','Latvia','North Macedonia','Kosovo','Guinea-Bissau','Equatorial Guinea','Bahrain','Estonia','Trinidad and Tobago','East Timor','Mauritius','Eswatini','Djibouti'];
var dates = ['31 Dec 2022','1 Mar 2023','11 Jul 2023','31 Dec 2022','1 Jul 2020','21 Mar 2022','1 Aug 2022','15 Jun 2022','1 Jan 2023','31 Mar 2023','1 May 2023','11 Jul 2023','1 Jul 2022','1 Jul 2021','Dec 2022','1 Jul 2019','11 Jul 2023','31 Dec 2022','31 Dec 2022','1 Jul 2021','1 Jan 2023','30 Jun 2021','23 Aug 2022','1 Jul 2022','31 Mar 2023','1 Jul 2022','30 Jun 2023','1 Jan 2023','31 Dec 2022','1 Apr 2023','18 May 2022','1 Jan 2022','1 Jul 2023','1 Jul 2021','1 Jul 2018','1 Feb 2022','11 Jul 2023','31 Mar 2023','11 Jul 2023','1 Apr 2023','1 Jan 2023','1 Jul 2022','30 Jun 2022','11 Jul 2023','1 Jul 2022','10 May 2022','1 Jul 2022','27 Jun 2021','14 Dec 2021','25 Nov 2021','30 Jun 2019','1 Jul 2021','11 Jul 2023','1 Jul 2021','1 Jul 2019','1 Jul 2021','30 Apr 2023','1 Jul 2023','1 Jul 2021','1 Jul 2022','1 Jul 2022','1 Jul 2022','30 Jun 2023','1 May 2023','14 Sep 2022','17 Jul 2022','11 Jul 2023','11 Jul 2023','1 Jan 2014','1 Jul 2021','1 Jul 2021','1 Jul 2021','3 Mar 2019','20 Apr 2022','1 Jul 2022','1 Jul 2020','15 Aug 2022','1 Jul 2022','1 Jul 2023','1 Jul 2022','1 Jan 2022','1 Apr 2023','1 Jul 2020','11 Jul 2023','31 Dec 2022','1 Jan 2023','30 Apr 2023','1 Jul 2021','23 Nov 2021','31 Dec 2022','1 Mar 2023','1 May 2023','1 Jan 2023','1 Jul 2021','1 Jan 2021','31 Dec 2020','1 Jan 2023','1 Jul 2021','1 Apr 2023','31 Mar 2023','1 Jul 2022','8 Nov 2022','1 Jul 2022','1 Jul 2021','31 Dec 2022','1 Mar 2023','1 Jan 2020','1 Jul 2022','31 Oct 2022','30 Jun 2020','1 Jul 2023','31 Dec 2022','1 Jul 2023','1 Apr 2023','1 Jul 2020','30 Apr 2023','31 Mar 2023','1 Jul 2021','1 Jan 2023','30 Jun 2022','31 Mar 2023','30 Jun 2022','31 Mar 2023','3 Apr 2022','30 Apr 2023','31 Dec 2020','1 Jul 2021','1 Jul 2022','1 Jul 2020','31 Aug 2021','1 Jul 2023','1 Jan 2023','30 Jun 2022','31 Dec 2022','1 Jul 2022','1 Jul 2022','31 Mar 2023','1 Jan 2023','1 May 2023','1 Jul 2019','1 Jan 2022','1 Jan 2022','1 Jul 2022','1 Jul 2022','1 Jul 2021','1 Jul 2023','1 Jul 2021','1 Jan 2023','1 Apr 2023','1 Nov 2021','31 Dec 2020','1 Jul 2023','1 Jul 2022','1 Jul 2021','1 Jan 2023','30 Jun 2022','1 Jul 2022','31 Dec 2022','1 Jul 2023','1 Jul 2022'];
var sources = ['Official estimate','Official projection','National population clock','Official estimate','Official projection','Official projection','2022 census result','2022 census result','Official estimate','National quarterly estimate','Official estimate','National population clock','National annual projection','Official estimate','Official estimate','Official figure','National population clock','Official estimate','National quarterly estimate','Official estimate','Official estimate','Official estimate','2022 census result','Official estimate','Monthly national estimate','National annual projection','Official projection','Official projection','Official estimate','Official estimate','2022 census result','Official estimate','Official estimate','Official projection','Official projection','National monthly estimate','National population clock','National monthly estimate','National population clock','National quarterly estimate','Official estimate','National annual projection','National annual projection','National population clock','National annual projection','2022 census result','Official estimate','2021 census result','2021 census result','2021 census result','Official projection','National annual projection','National population clock','National annual projection','National annual projection','National annual projection','Official estimate','UN projection','Official estimate','National projection','Official estimate','National annual projection','National annual projection','National quarterly estimate','2022 census result','2022 census result','National population clock','National population clock','Authorized survey','National annual projection','National annual projection','National annual projection','2019 census result','2022 census result','National annual projection','National annual projection','2022 census result','National annual projection','National annual projection','National annual projection','National estimate','Official estimate','National annual projection','National population clock','Official estimate','Official estimate','Monthly national estimate','National annual projection','2021 census result','2022 estimate','Monthly national estimate','National monthly estimate','Official estimate','National annual projection','Official estimate','Official estimate','Official estimate','National annual projection','National quarterly estimate','National quarterly estimate','National annual projection','2022 census result','National annual projection','National annual projection','National estimate','Monthly national estimate','Official estimate','National annual projection','2022 census result','Official estimate','UN projection','Official annual estimate','UN projection','National quarterly estimate','National annual projection','Monthly national estimate','National quarterly estimate','Official estimate','National annual projection','Official estimate','National quarterly estimate','National annual projection','National quarterly estimate','2022 census','Monthly national estimate','Official estimate','National annual projection','National annual projection','National annual projection','2021 census','UN projection','Official estimate','National annual projection','National annual projection','Official estimate','Annual projection','Monthly national estimate','National quarterly estimate','Monthly national estimate','National projection','Official estimate','Official estimate','National annual projection','National projection','National annual projection','Official projection','National annual projection','National quarterly estimate','Monthly national estimate','2021 census result','Official estimate','National annual projection','Official estimate','Official estimate','Official estimate','Official estimate','National annual projection','National estimate','Official projection','National projection'];
var populations = [1412,1392,335,278,220,217,203,170,146,129,125,111,105,102,99,95,85,85,84,68,68,67,62,61,59,56,52,52,51,48,46,45,43,43,42,41,40,38,37,36,34,33,33,33,32,32,32,31,29,29,28,27,27,26,24,24,23,23,23,22,22,22,20,20,20,19,18,18,18,17,17,17,16,15,13,13,13,13,13,12,12,12,12,11,11,11,11,11,10,10,10,10,10,10,10,9,9,9,9,9,8,8,7,7,7,7,7,7,7,7,7,6,6,6,6,6,6,5,5,5,5,5,5,5,5,5,5,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1];

// MODAL HANDLING --------------------------------------------------------------------
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal2) {
      modal2.style.display = "none";
    }
  }
  //SECOND MODAL  
  var modal2 = document.getElementById("myModal2");
  var btn2 = document.getElementById("myBtn2");
  var span2 = document.getElementsByClassName("close")[1];
  btn2.onclick = function() {
    modal2.style.display = "block";
  }
//end of modal handling --------------------------------------------------------------

//STATS initialization----------------------------------------------------------------
if(getCookie("tweetle_gamesPlayed") != ""){ // number of games completed in history
    var gamesPlayed = parseInt(getCookie("tweetle_gamesPlayed"));
    document.getElementById("gamesPlayed").innerHTML = "<hr>Played: " + gamesPlayed + "<br>";
    document.getElementById("goodLuck").innerHTML = "<br>";
}
else{
    var gamesPlayed = 0;
    //modal2.style.display = "block"; //pop instructions on first play, not nice on desktop
}
if(getCookie("tweetle_gamesWon") != ""){ // number of games won in history
    var gamesWon = parseInt(getCookie("tweetle_gamesWon"));
    document.getElementById("gamesWon").innerHTML = "Won: " + gamesWon + " (" + ((gamesWon/gamesPlayed)*100).toFixed(2) + "%)<br>";
}
else{
    var gamesWon = 0;
}
var avgLossAmount = 0; //defined globally since it will not be calculated if there is no existing save data
if(getCookie("tweetle_sumOfLostDifferences") != ""){ // the sum of loss differences, used to calculate the mean
    var sumOfLostDifferences = parseInt(getCookie("tweetle_sumOfLostDifferences"));
    if(sumOfLostDifferences > 0){
        avgLossAmount = (sumOfLostDifferences/(gamesPlayed-gamesWon)).toFixed(2);
    }
    document.getElementById("avgLossAmount").innerHTML = "Average Loss Amount: " + avgLossAmount + "<br>";
}
else{
    var sumOfLostDifferences = 0;
}
if(getCookie("tweetle_currentStreak") != ""){ // current number of consecutive wins
    var currentStreak = parseInt(getCookie("tweetle_currentStreak"));
    document.getElementById("currentStreak").innerHTML = "Current Streak: " + currentStreak + "<br>";
}
else{
    var currentStreak = 0;
}
if(getCookie("tweetle_maxStreak") != ""){ // current number of consecutive wins
    var maxStreak = parseInt(getCookie("tweetle_maxStreak"));
    document.getElementById("maxStreak").innerHTML = "Max Streak: " + maxStreak + "<br>";
}
else{
    var maxStreak = 0;
}

var distributionOfWonGuesses = []; // do not show in dom, will be used by plotly graph upon game completion
for(var i = 1; i <= 6; i++){
    if(getCookie("tweetle_distribution" + i.toString()) != ""){
        distributionOfWonGuesses[i] = parseInt(getCookie("tweetle_distribution" + i.toString()));
        plotDist();
    }
    else{
        distributionOfWonGuesses[i] = 0;
    }
}
//end of stats------------------------------------------------------------------------

//pick a random country by index
randomIndex = Math.floor(Math.random() * 160);
console.log(randomIndex + " | " + nations[randomIndex] + " | " + dates[randomIndex] + " | " + sources[randomIndex] + " | " + String(populations[randomIndex]));
document.getElementById("searchResults").innerHTML = "<div style='text-align:center'><span style='font-weight:bold;color:black;font-size:14pt;'>" + nations[randomIndex] + "</span><br><span style='color:gray;font-size:10pt;'>" + sources[randomIndex] + ", as of " + dates[randomIndex] + "</span></div>";
correctAnswer = populations[randomIndex];
document.getElementById("guess1").disabled = false;


function checkGuess(){

    currentGuess = document.getElementById("guess" + turnCounter.toString()).value;
    console.log("Current Guess: " + currentGuess);

    //check if the input is empty before proceeding
    isEmpty = currentGuess.toString().length;
    //console.log("Is Empty? 0  means yes: " + isEmpty);

    if(isEmpty != 0 && currentGuess>=0){

        document.getElementById("guess" + turnCounter.toString() + "bar").className = "";
        document.getElementById("guess" + turnCounter.toString() + "bar").innerHTML = "<div id='progressbarcontainer" + turnCounter.toString() +  "'class='progress input-group mb-3' style='height:calc(1.5em + 1rem + 2px);font-size:1.25rem;border-radius:0.3rem;'><div id='progressbar" + turnCounter.toString() +"' class='progress-bar' role='progressbar' style='width:0%;color:#495057;background-color: #EAE4A6;transition: width 1s ease 0s;'><div style='padding:.5rem 1rem;text-align: left;'>" + currentGuess.toString() + "</div></div></div>";

        //dummy text to force the progress bar to work
        document.getElementById("guess7").disabled = false;
        document.getElementById("guess7").placeholder = "Guess the population...";
        document.getElementById("guess7").focus();

        //setup the next turn or declare the game over
        turnCounter += 1;
        if(currentGuess != correctAnswer){
            if(turnCounter <= 6){ // get the next guess input ready unless the player is winning
                document.getElementById("guess" + turnCounter.toString()).disabled = false;
                document.getElementById("guess" + turnCounter.toString()).placeholder = "Guess the population...";
                document.getElementById("guess" + turnCounter.toString()).focus();
            }
            else{ // no more guesses, player loses
                console.log("you lose");
                // Update Games Played, sum of loss differences, and streak
                gamesPlayed += 1;
                sumOfLostDifferences += Math.abs(correctAnswer-currentGuess);
                currentStreak = 0;
                updateCookiesAndDOM();

                document.getElementById("results").innerHTML = "<br>Sorry, the correct answer was " + correctAnswer.toString() + ".<br>You were off by " + (Math.abs(correctAnswer-currentGuess)).toString() + "!<button class='replayButton' onclick='share()'><i class='fas fa-share-alt'></i></button>  <button class='replayButton' onclick='location.reload();'><i class='fas fa-redo-alt'></i></button>";
                setTimeout(function(){modal2.style.display = "block";},2000);
            }
        }

        //evaluate the guess
        if(currentGuess == correctAnswer){ //win condition
            console.log("you win");
            shareText += "🟩🟩🟩🟩🟩\n";
            // Update Games Played, won, and streaks
            gamesPlayed += 1;
            gamesWon += 1;
            currentStreak += 1;
            if(currentStreak>maxStreak){
                maxStreak = currentStreak;
            }
            distributionOfWonGuesses[turnCounter-1] += 1;
            updateCookiesAndDOM();
            plotDist();
            //modal
            if(turnCounter-1 > 1){
                document.getElementById("results").innerHTML = "<br>Congratulations, you won after " + (turnCounter-1).toString() + " turns!<button class='replayButton' onclick='share()'><i class='fas fa-share-alt'></i></button>  <button class='replayButton' onclick='location.reload();'><i class='fas fa-redo-alt'></i></button>";
            }
            else{
                document.getElementById("results").innerHTML = "<br>Wow, you got it on your first try!<button class='replayButton' onclick='share()'><i class='fas fa-share-alt'></i></button>  <button class='replayButton' onclick='location.reload();'><i class='fas fa-redo-alt'></i></button>";
            }
            setTimeout(function(){modal2.style.display = "block";},2000);
            //progress bar
            document.getElementById("progressbar" + (turnCounter-1).toString()).style.width = "100%";
            setTimeout(function(){document.getElementById("progressbar" + (turnCounter-1).toString()).style.backgroundColor = "#A6ECA8";document.getElementById("progressbarcontainer" + (turnCounter-1).toString()).style.animation = "pulse 1s";}, 1000);
        }
        else if(currentGuess < correctAnswer){ // if the previous guess was too low
            console.log("go higher");
            if(((currentGuess/correctAnswer)*100) >= 80){
                shareText += "🟨🟨🟨🟨🟨\n";
            }
            else if(((currentGuess/correctAnswer)*100) >= 60){
                shareText += "🟨🟨🟨🟨\n";
            }
            else if(((currentGuess/correctAnswer)*100) >= 40){
                shareText += "🟨🟨🟨\n";
            }
            else if(((currentGuess/correctAnswer)*100) >= 20){
                shareText += "🟨🟨\n";
            }
            else {
                shareText += "🟨\n";
            }
            document.getElementById("progressbar" + (turnCounter-1).toString()).style.width = ((currentGuess/correctAnswer)*100).toString() + "%"; 
        }
        else{ // if the previous guess was too high
            console.log("go lower");
            shareText += "🟥🟥🟥🟥🟥\n";
            document.getElementById("progressbar" + (turnCounter-1).toString()).style.width = "100%";
            setTimeout(function(){document.getElementById("progressbar" + (turnCounter-1).toString()).style.backgroundColor = "#E8A4A4";document.getElementById("progressbarcontainer" + (turnCounter-1).toString()).style.animation = "shake 0.5s";}, 1000);
        }
        
    }
}

// submit guess if enter key is hit
document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        checkGuess();
    }
});


//UPDATE STATS COOKIES AND DOM ELEMENTS after game end
function updateCookiesAndDOM(){
    document.getElementById("sendGuess").style.display = "none"; // get rid of the submit button
    document.getElementById("modalTitle").innerHTML = "Thank you for playing Popul";
    document.getElementById("goodLuck").innerHTML = "<br>";

    //stats
    setCookie("tweetle_gamesPlayed", gamesPlayed.toString());
    document.getElementById("gamesPlayed").innerHTML = "<hr>Played: " + gamesPlayed + "<br>";
    setCookie("tweetle_gamesWon", gamesWon.toString());
    document.getElementById("gamesWon").innerHTML = "Won: " + gamesWon + " (" + ((gamesWon/gamesPlayed)*100).toFixed(2) + "%)<br>";
    setCookie("tweetle_sumOfLostDifferences", sumOfLostDifferences.toString());
    if(sumOfLostDifferences > 0){
        avgLossAmount = (sumOfLostDifferences/(gamesPlayed-gamesWon)).toFixed(2);
    }
    document.getElementById("avgLossAmount").innerHTML = "Average Loss Amount: " + avgLossAmount + "<br>";
    setCookie("tweetle_currentStreak", currentStreak.toString());
    document.getElementById("currentStreak").innerHTML = "Current Streak: " + currentStreak + "<br>";
    setCookie("tweetle_maxStreak", maxStreak.toString());
    document.getElementById("maxStreak").innerHTML = "Max Streak: " + maxStreak + "<br>";
    if(distributionOfWonGuesses[turnCounter-1] > 0){
        setCookie("tweetle_distribution" + (turnCounter-1).toString(), distributionOfWonGuesses[turnCounter-1].toString()); // dom updated via plotly function
    }
}

function share(){
    const shareData = {
        title: 'Popul',
        text: 'Try playing Popul!\n' + shareText,
        url: 'https://quigley.page/popul/'
    }
    navigator.share(shareData);
}

//COOKIE FUNCTIONS
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

//PLOT DISTRIBUTION 
function plotDist(){
    var distributionXData = [];
    for(var n = 1; n <= 6; n++){
        distributionXData.push(distributionOfWonGuesses[n]);
    }
    var distChartData = [
        {
            type: 'bar',
            x: distributionXData,
            y: [1,2,3,4,5,6],
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
        width: 440,
        height: 160,
        yaxis: {
            tick0: 1,
            dtick: 1,
            tickfont: {
                family: 'Roboto, sans-serif',
                size: 14,
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
            b: 20,
            t: 0,
            pad: 16,
        },
        font: {
            size: 10,
            family: 'Roboto, sans-serif',
        }
    };
      
    Plotly.newPlot('distrbutionChart', distChartData, layout, config);
}