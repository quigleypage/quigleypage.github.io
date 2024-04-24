messageArray = [];
model = 3;
transcriptText = "Q Assistants\n";
suggestedThemes = ["haunted mansion", "ghosts", "paranormal", "cruise", "ship", "pirates", "treasure", "ski resort", "avalanche", "survival", "medieval castle", "knights", "betrayal", "space station", "aliens", "sabotage", "tropical island", "cult", "sacrifice", "train", "espionage", "assassination", "circus", "clowns", "museum", "art", "theft", "hospital", "doctors", "poison", "library", "books", "codes", "zoo", "animals", "escape", "school", "teachers", "blackmail", "casino", "gamblers", "debt", "farm", "crops", "arson", "aquarium", "shark", "bakery", "cupcakes", "forest", "camping", "hunting", "hotel", "wedding", "bride", "groom", "airport", "flight", "bomb", "airplane", "submarine", "mutiny", "lighthouse", "storm", "cooking", "rock and roll", "Europe", "cowboys", "dinosaurs", "time travel", "science fiction", "history"];
scrollHeightTracker = 0;
botName = "Q";

let randomThemes = [];
while (randomThemes.length < 3) {
  let randomIndex = Math.floor(Math.random() * suggestedThemes.length);
  let randomValue = suggestedThemes[randomIndex];
  if (!randomThemes.includes(randomValue)) {
    randomThemes.push(randomValue);
  }
}

async function generateText(prompt) {
    document.getElementById('sendButton').disabled = true;
    document.getElementById('sendButton').innerHTML = '<div id="spinner" class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
    document.getElementById('userInput').value = "";
    document.getElementById('userInput').placeholder = "One moment please...";
    document.getElementById('userInput').disabled = true;

    if(messageArray.length == 1){
        document.getElementById('introText').style.display = "none";
        document.getElementById('suggestedThemes').style.display = "none";
    }

    document.getElementById("AIResponse").innerHTML += '<div class="user-message-card"><div class="sender-name">You</div><div class="message">' + prompt + '</div></div>';
    messageArray.push({role: "user", content: prompt});
    transcriptText += "You:\n" + prompt + "\n\n-------\n\n";
    document.getElementById("AIResponse").scrollTop = document.getElementById("AIResponse").scrollHeight;
    encodedMessageArray = { promptText: messageArray, version: model };
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
        scrollHeightTracker = document.getElementById("AIResponse").scrollHeight;
        document.getElementById("AIResponse").innerHTML += '<div class="bot-message-card"><div class="sender-name">' + botName + '</div><div class="message">' + botResponseCleaned + '</div></div>';
        //document.getElementById("AIResponse").scrollTop = document.getElementById("AIResponse").scrollHeight;
        transcriptText += botName + ":\n" + botResponse + "\n\n-------\n\n";
        document.getElementById('sendButton').innerHTML = '<i style="color:white;" class="material-icons right">send</i>';
        document.getElementById('sendButton').disabled = false;
        document.getElementById('userInput').placeholder = "Message";
        document.getElementById('userInput').disabled = false;
        document.getElementById('downloadButton').style.display = "block";
        if(document.getElementById("AIResponse").scrollTop != document.getElementById("AIResponse").scrollHeight && messageArray.length > 2){
            document.getElementById('arrowDown').style.display = "block";
            setTimeout(function() {
                document.getElementById('arrowDown').style.display = "none";
              }, 6000);
        }

    } catch (error) {
        console.error(error);
        document.getElementById("AIResponse").innerHTML = "Error: " + error;
    }
}

function downloadText(){
    const data = transcriptText;
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    // Get the current date and time
    let now = new Date();

    // Format the year, month, day, hour, minute, and second
    let year = now.getFullYear();
    let month = (now.getMonth() + 1).toString().padStart(2, '0');
    let day = now.getDate().toString().padStart(2, '0');
    let hour = now.getHours().toString().padStart(2, '0');
    let minute = now.getMinutes().toString().padStart(2, '0');
    let second = now.getSeconds().toString().padStart(2, '0');

    // Concatenate the formatted components with underscores
    let timeString = `${year}-${month}-${day}_${hour}-${minute}-${second}`;

    const a = document.createElement('a');
    a.href = url;
    a.download = 'Q Assistants Transcript - ' + timeString + '.txt';
    a.click();

    // Cleanup: release the object URL after the download has started
    setTimeout(() => URL.revokeObjectURL(url), 0);
}

function updateMessageBox(message){
    document.getElementById('userInput').value = message;
}