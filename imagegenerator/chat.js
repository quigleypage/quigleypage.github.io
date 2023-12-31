option = -4;

var i = 0;
var speed = 50; /* The speed/duration of the effect in milliseconds */
var hitxt = "mage Generator"; /* The text */

function typeWriter() {
  if (i < hitxt.length) {
    document.getElementById("hi").innerHTML += hitxt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

function clearConversation(){
  document.getElementById('clearButton').style.display = "none";
  fadeOut();
}

function fadeOut() {
  let opacity = parseFloat(document.getElementById('AIResponse').style.opacity);
  // If the opacity is not a valid number, assume it is 1
  if (isNaN(opacity)) {
    opacity = 1;
  }
  let timer = setInterval(function() {
    opacity -= 0.05;
    document.getElementById('AIResponse').style.opacity = opacity;
    //console.log(opacity);
    // If the opacity reaches 0 or below, stop the timer and clear the innerhtml
    if (opacity <= 0) {
      clearInterval(timer);
      document.getElementById('AIResponse').innerHTML = "";
    }
  }, 25);
}

async function generateText(prompt) {
    document.getElementById('sendButton').disabled = true;
    document.getElementById('sendButton').innerHTML = '<div id="spinner" class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'
    document.getElementById('userInput').disabled = true;
    document.getElementById('clearButton').disabled = true;
    if (navigator.userAgent.match(/(iPhone|Android|BlackBerry|Windows Phone)/)) {
      document.getElementById('userInput').blur();
    }
    
    encodedMessageArray = { promptText: prompt, version: option };
    console.log(encodedMessageArray);

    try {
        const response = await axios.post('https://gpt-test-app.herokuapp.com/generate-text', encodedMessageArray, {
            headers: {
              'Content-Type': 'application/json'
            }
        });
        botResponse = response.data.text;
        console.log(botResponse);
        document.getElementById('clearButton').style.display = "block";
        document.getElementById('AIResponse').style.opacity = 1;
        document.getElementById("AIResponse").innerHTML = '<div class="bot-message-card"><div class="sender-name">' + prompt + '</div><div class="message"><img class="generatedImage" src="' + botResponse + '"></div></div>' + document.getElementById("AIResponse").innerHTML;
        document.getElementById('userInput').value = "";
        document.getElementById('userInput').disabled = false;
        document.getElementById('sendButton').disabled = false;
        document.getElementById('clearButton').disabled = false;
        document.getElementById('sendButton').innerHTML = '<i class="material-icons">send</i>'

    } catch (error) {
        console.error(error);
        document.getElementById("AIResponse").innerHTML = "Error: " + error;
    }
}

// Get the input field
var input = document.getElementById("userInput");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("sendButton").click();
  }
});


function updateGeneration(choice){
  if(choice=='sd'){
    document.getElementById("sdButton").style.backgroundColor = "#A7C7E7";
    document.getElementById("hdButton").style.backgroundColor = "#DDDDDD";
    document.getElementById("fhdButton").style.backgroundColor = "#DDDDDD";

    document.getElementById("sdButtons").style.display = "block";
    document.getElementById("hdButtons").style.display = "none";
    document.getElementById("fhdButtons").style.display = "none";

    option = -2;
    document.getElementById("256Button").style.backgroundColor = "#DDDDDD";
    document.getElementById("512Button").style.backgroundColor = "#C3B1E1";
    document.getElementById("1024Button").style.backgroundColor = "#DDDDDD";
  }
  else if(choice=='hd'){
    document.getElementById("sdButton").style.backgroundColor = "#DDDDDD";
    document.getElementById("hdButton").style.backgroundColor = "#A7C7E7";
    document.getElementById("fhdButton").style.backgroundColor = "#DDDDDD";

    document.getElementById("sdButtons").style.display = "none";
    document.getElementById("hdButtons").style.display = "inline-block";
    document.getElementById("fhdButtons").style.display = "none";

    option = -4;
    document.getElementById("squareButton").style.backgroundColor = "#C3B1E1";
    document.getElementById("portraitButton").style.backgroundColor = "#DDDDDD";
    document.getElementById("landscapeButton").style.backgroundColor = "#DDDDDD";
  }
  else if(choice=='fhd'){
    document.getElementById("sdButton").style.backgroundColor = "#DDDDDD";
    document.getElementById("hdButton").style.backgroundColor = "#DDDDDD";
    document.getElementById("fhdButton").style.backgroundColor = "#A7C7E7";

    document.getElementById("sdButtons").style.display = "none";
    document.getElementById("hdButtons").style.display = "none";
    document.getElementById("fhdButtons").style.display = "inline-block";

    option = -7;
    document.getElementById("squareHDButton").style.backgroundColor = "#C3B1E1";
    document.getElementById("portraitHDButton").style.backgroundColor = "#DDDDDD";
    document.getElementById("landscapeHDButton").style.backgroundColor = "#DDDDDD";
  }
  console.log(option);
}

function updateModel(choice){
  option = choice;
  if(option == -1){
    document.getElementById("256Button").style.backgroundColor = "#C3B1E1";
    document.getElementById("512Button").style.backgroundColor = "#DDDDDD";
    document.getElementById("1024Button").style.backgroundColor = "#DDDDDD";
  }
  else if(option == -2){
    document.getElementById("256Button").style.backgroundColor = "#DDDDDD";
    document.getElementById("512Button").style.backgroundColor = "#C3B1E1";
    document.getElementById("1024Button").style.backgroundColor = "#DDDDDD";
  }
  else if(option == -3){
    document.getElementById("256Button").style.backgroundColor = "#DDDDDD";
    document.getElementById("512Button").style.backgroundColor = "#DDDDDD";
    document.getElementById("1024Button").style.backgroundColor = "#C3B1E1";
  }

  else if(option == -4){
    document.getElementById("squareButton").style.backgroundColor = "#C3B1E1";
    document.getElementById("portraitButton").style.backgroundColor = "#DDDDDD";
    document.getElementById("landscapeButton").style.backgroundColor = "#DDDDDD";
  }
  else if(option == -5){
    document.getElementById("squareButton").style.backgroundColor = "#DDDDDD";
    document.getElementById("portraitButton").style.backgroundColor = "#C3B1E1";
    document.getElementById("landscapeButton").style.backgroundColor = "#DDDDDD";
  }
  else if(option == -6){
    document.getElementById("squareButton").style.backgroundColor = "#DDDDDD";
    document.getElementById("portraitButton").style.backgroundColor = "#DDDDDD";
    document.getElementById("landscapeButton").style.backgroundColor = "#C3B1E1";
  }

  else if(option == -7){
    document.getElementById("squareHDButton").style.backgroundColor = "#C3B1E1";
    document.getElementById("portraitHDButton").style.backgroundColor = "#DDDDDD";
    document.getElementById("landscapeHDButton").style.backgroundColor = "#DDDDDD";
  }
  else if(option == -8){
    document.getElementById("squareHDButton").style.backgroundColor = "#DDDDDD";
    document.getElementById("portraitHDButton").style.backgroundColor = "#C3B1E1";
    document.getElementById("landscapeHDButton").style.backgroundColor = "#DDDDDD";
  }
  else if(option == -9){
    document.getElementById("squareHDButton").style.backgroundColor = "#DDDDDD";
    document.getElementById("portraitHDButton").style.backgroundColor = "#DDDDDD";
    document.getElementById("landscapeHDButton").style.backgroundColor = "#C3B1E1";
  }
  console.log(option);
}