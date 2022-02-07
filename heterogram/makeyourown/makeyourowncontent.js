var wordLength = 5;
var chances = 1;
var size = wordLength*chances;
var guessArray = [];
var rowTracker = 1;

function loadBoard(){
    
    nextSpace = 0;
    guessArray = [];
    rowTracker = 1;

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
    document.getElementById("keyboard").innerHTML += '<div class="backspaceKey" id="enter" onclick="generateLink()"><div class="keyLetter"><div class="table"><div class="table-cell"><i class="fas fa-paper-plane"></i></div></div></div></div>';
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
    
    if(nextSpace < wordLength*rowTracker && selectedLetter != "backspace" && selectedLetter != "enter"){
        document.getElementById("Space" + nextSpace.toString()).innerHTML = selectedLetter;
        document.getElementById(nextSpace.toString()).style.outlineColor = "#404040";
        document.getElementById(nextSpace.toString()).style.animation = "pulse 1s";
        
        document.getElementById(selectedLetter).style.opacity = 0.4;
        document.getElementById(selectedLetter).style.pointerEvents = 'none';

        guessArray.push(selectedLetter.toLowerCase());
        nextSpace += 1;
    }
    else if(selectedLetter == "backspace" && (nextSpace) > wordLength*(rowTracker-1)){
        document.getElementById("Space" + (nextSpace-1).toString()).innerHTML = ""; // restyle the grid square
        document.getElementById((nextSpace-1).toString()).style.outlineColor = "#b1b1b1";
        document.getElementById((nextSpace-1).toString()).style.animation = "";
        
        document.getElementById(guessArray[guessArray.length-1].toUpperCase()).style.opacity = 1.0; //restyle the keyboard key
        document.getElementById(guessArray[guessArray.length-1].toUpperCase()).style.pointerEvents = 'auto'; 

        for(var bs = wordLength*(rowTracker-1); bs < guessArray.length; bs++){ //restyle the invalid letters if necessary
            document.getElementById(bs).style.color = "#000000";
            document.getElementById(bs).style.animation = "";
        }
        
        guessArray.pop();
        nextSpace-=1;
    }

    console.log(guessArray);
    
}

function generateLink(){
    
    if(guessArray.length == wordLength){
        var customLink = "https://quigley.page/heterogram/?s=";
        var wordToEncrypt = "";
        for(var l = 0; l < guessArray.length; l++){
            wordToEncrypt += guessArray[l];
            //customLink += guessArray[l];
        }
        customLink += encryptMakeYourOwn(wordToEncrypt);
        document.getElementById("MYOLink").innerHTML = "<a id='customLink' href='" + customLink + "'>" + customLink + "</a>"; 
    }
    
}
function copyLink(){
    
    if(document.getElementById("customLink") != undefined){
        var copyText = document.getElementById("customLink").innerHTML;
        navigator.clipboard.writeText(copyText);
        document.getElementById("copyButton").style.animation = "pulse 1s";
    }
    
}