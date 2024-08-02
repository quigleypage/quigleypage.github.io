messageArray = [];
model = 3;
transcriptText = "Q Murder Mystery\n\nYour Theme: ";
suggestedThemes = ["haunted mansion", "ghosts", "paranormal", "cruise", "ship", "pirates", "treasure", "ski resort", "avalanche", "survival", "medieval castle", "knights", "betrayal", "space station", "aliens", "sabotage", "tropical island", "cult", "sacrifice", "train", "espionage", "assassination", "circus", "clowns", "museum", "art", "theft", "hospital", "doctors", "poison", "library", "books", "codes", "zoo", "animals", "escape", "school", "teachers", "blackmail", "casino", "gamblers", "debt", "farm", "crops", "arson", "aquarium", "shark", "bakery", "cupcakes", "forest", "camping", "hunting", "hotel", "wedding", "bride", "groom", "airport", "flight", "bomb", "airplane", "submarine", "mutiny", "lighthouse", "storm", "cooking", "rock and roll", "Europe", "cowboys", "dinosaurs", "time travel", "science fiction", "history"];
scrollHeightTracker = 0;

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

    if(messageArray.length == 0){
        document.getElementById('introText').style.display = "none";
        document.getElementById('suggestedThemes').style.display = "none";
        messageArray.push({role: "system", content: "You are the host of an interactive murder mystery game that is played via a chat interface. The player acts as the detective, but does not have a related professional background and is a bystander to the crime. You are an ambiguous narrator that is not a character in the story. You should refer to actions and comments from other characters and provide quotes when relevant. The game should require the player to interpret clues and review evidence, but include some distractions so that the player does not guess the murderer too quickly. The game is not over until the player correctly guesses the murderer. After you have given them sufficient info to attempt a guess, then you can periodically start asking if they want to place a guess. DO NOT ask them every turn. You will start by introducing the story of the crime, including a title, description of the environment, the identity of the victim, and the key characters that will be involved in the game. Remember, the killer MUST be one of these characters. Following this information, prompt the player to share their initial impression to get the conversation going. The theme of the murder mystery is: " + prompt});
        transcriptText += prompt + "\n\n\n-------\n\n";
    }
    else{
        document.getElementById("AIResponse").innerHTML += '<div class="user-message-card"><div class="sender-name">You</div><div class="message">' + prompt + '</div></div>';
        document.getElementById("AIResponse").scrollTop = document.getElementById("AIResponse").scrollHeight;
        messageArray.push({role: "user", content: prompt})
        transcriptText += "You:\n" + prompt + "\n\n-------\n\n";
        //console.log(transcriptText);
    }

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
        // Bold
        botResponseCleaned = botResponseCleaned.replaceAll(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        botResponseCleaned = botResponseCleaned.replaceAll(/__(.*?)__/g, '<strong>$1</strong>');
        // Italic
        botResponseCleaned = botResponseCleaned.replaceAll(/\*(.*?)\*/g, '<em>$1</em>');
        botResponseCleaned = botResponseCleaned.replaceAll(/_(.*?)_/g, '<em>$1</em>');
        // Bold and Italic
        botResponseCleaned = botResponseCleaned.replaceAll(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
        botResponseCleaned = botResponseCleaned.replaceAll(/___(.*?)___/g, '<strong><em>$1</em></strong>');
        scrollHeightTracker = document.getElementById("AIResponse").scrollHeight;
        document.getElementById("AIResponse").innerHTML += '<div class="bot-message-card"><div class="sender-name">Q</div><div class="message">' + botResponseCleaned + '</div></div>';
        //document.getElementById("AIResponse").scrollTop = document.getElementById("AIResponse").scrollHeight;
        transcriptText += "Q:\n" + botResponse + "\n\n-------\n\n";
        document.getElementById('sendButton').innerHTML = '<i style="color:white;" class="material-icons right">send</i>';
        document.getElementById('sendButton').disabled = false;
        document.getElementById('userInput').placeholder = "Respond";
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
    a.download = 'Q Murder Mystery Transcript - ' + timeString + '.txt';
    a.click();

    // Cleanup: release the object URL after the download has started
    setTimeout(() => URL.revokeObjectURL(url), 0);
}
