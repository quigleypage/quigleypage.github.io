messageArray = [];
model = 3;

async function generateText(prompt) {
    document.getElementById('sendButton').disabled = true;
    document.getElementById('sendButton').innerHTML = '<div id="spinner" class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
    document.getElementById('userInput').value = "";
    document.getElementById('userInput').placeholder = "One moment please...";
    document.getElementById('userInput').disabled = true;

    if(messageArray.length == 0){
        document.getElementById('introText').style.display = "none";
        messageArray.push({role: "system", content: "You are the host of an interactive murder mystery game that is played via a chat interface. The player acts as the detective, but does not have a related professional background and is a bystander to the crime. You are an ambiguous narrator that is not a character in the story. You should refer to actions and comments from other characters and provide quotes when relevant. The game should require the player to interpret clues and review evidence, but include some distractions so that the player does not guess the murderer too quickly. The game is not over until the player correctly guesses the murderer. After you have given them sufficient info to attempt a guess, then you can periodically start asking if they want to place a guess. DO NOT ask them every turn. You will start by introducing the story of the crime, including a description of the environment and the key characters that will be involved in the game. Following this information, prompt the player to share their initial impression to get the conversation going. The theme of the murder mystery is: " + prompt});
    }
    else{
        document.getElementById("AIResponse").innerHTML += '<div class="user-message-card"><div class="sender-name">You</div><div class="message">' + prompt + '</div></div>';
        document.getElementById("AIResponse").scrollTop = document.getElementById("AIResponse").scrollHeight;
        messageArray.push({role: "user", content: prompt})
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
        document.getElementById("AIResponse").innerHTML += '<div class="bot-message-card"><div class="sender-name">Q</div><div class="message">' + botResponseCleaned + '</div></div>';
        //document.getElementById("AIResponse").scrollTop = document.getElementById("AIResponse").scrollHeight;
        document.getElementById('sendButton').innerHTML = '<i style="color:white;" class="material-icons right">send</i>';
        document.getElementById('sendButton').disabled = false;
        document.getElementById('userInput').placeholder = "Respond";
        document.getElementById('userInput').disabled = false;

    } catch (error) {
        console.error(error);
        document.getElementById("AIResponse").innerHTML = "Error: " + error;
    }
}