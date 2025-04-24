option = -10;

var i = 0;
var speed = 50; /* The speed/duration of the effect in milliseconds */
var hitxt = "mage Generator 2"; /* The text */

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
    document.getElementById('sendButton').innerHTML = '<div id="spinner" class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
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
        document.getElementById('sendButton').innerHTML = '<i class="material-icons">send</i>';

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