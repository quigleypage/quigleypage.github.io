productName = "Quigley+";
var i = 0;
var speed = 50; /* The speed/duration of the effect in milliseconds */
var hitxt = "Welcome to " + productName + " Support"; /* The text */
messageArray = [];

urlParams = new URL(window.location.toLocaleString()).searchParams;
urlProduct = urlParams.get('p');
if(urlProduct != null){
  loadProduct(urlProduct);
}

function loadProduct(p){
  productName = p;
  hitxt = "Welcome to " + productName + " Support"; /* The text */
  document.getElementById('productName').style.display = "none";
  document.getElementById('submitButton').style.display = "none";
  messageArray.push({role: "system", content: "You are a helpful live chat representative that supports " + productName + ". If you do not know the answer to a question, give it your best guess."});
  document.getElementById('searchBar').style.display = "flex";
  document.getElementById('trendingArticles').style.display = "block";
  document.getElementById('pageLogo').innerHTML = "<b>" + productName + "</b>";
  document.getElementById('navbar').style.display = "flex";
  typeWriter();
}

function clearConversation(){
  messageArray = [{role: "system", content: "You are a helpful live chat representative that supports " + productName + ". If you do not know the answer to a question, give it your best guess."}];
  document.getElementById('userInput').placeholder = "Ask a question to get started...";
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

function typeWriter() {
  if (i < hitxt.length) {
    document.getElementById("hi").innerHTML += hitxt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

async function generateText(prompt) {
    document.getElementById('sendButton').disabled = true;
    document.getElementById('sendButton').innerHTML = '<div id="spinner" class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'
    document.getElementById('userInput').value = "";
    document.getElementById('userInput').placeholder = "Follow-up or ask another question...";
    document.getElementById('clearButton').style.display = "block";
    document.getElementById('clearButton').disabled = true;
    if (navigator.userAgent.match(/(iPhone|Android|BlackBerry|Windows Phone)/)) {
      document.getElementById('userInput').blur();
    }
    
    //document.getElementById("AIResponse").innerHTML += '<div class="user-message-card"><div class="sender-name">You</div><div class="message">' + prompt + '</div></div>';    
    document.getElementById('AIResponse').style.opacity = 1;
    document.getElementById("AIResponse").innerHTML = '<div class="user-message-card"><div class="sender-name">You</div><div class="message">' + prompt + '</div></div>' + document.getElementById("AIResponse").innerHTML;    
    //document.getElementById("AIResponse").innerHTML = '<div class="user-message-card"><div class="message">' + prompt + '</div></div>' + document.getElementById("AIResponse").innerHTML;    


    messageArray.push({role: "user", content: prompt})
    encodedMessageArray = { promptText: messageArray, version: 3 };
    console.log(encodedMessageArray);

    try {
        const response = await axios.post('https://gpt-test-app.herokuapp.com/generate-text', encodedMessageArray, {
            headers: {
              'Content-Type': 'application/json'
            }
        });
        botResponse = response.data.text;
        console.log(botResponse);

        messageArray.push({role: "assistant", content: botResponse})
        botResponseCleaned = botResponse.replace(/\n/g, "<br />");
        //document.getElementById("AIResponse").innerHTML += '<div class="bot-message-card"><div class="sender-name">Q</div><div class="message">' + botResponseCleaned + '</div></div>';
        document.getElementById("AIResponse").innerHTML = '<div class="bot-message-card"><div class="sender-name">' + productName + ' Support Bot</div><div class="message">' + botResponseCleaned + '</div></div>' + document.getElementById("AIResponse").innerHTML;
        //document.getElementById("AIResponse").innerHTML = '<div class="bot-message-card"><div class="message">' + botResponseCleaned + '</div></div>' + document.getElementById("AIResponse").innerHTML;
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