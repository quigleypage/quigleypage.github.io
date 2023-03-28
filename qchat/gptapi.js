messageArray = [];

async function generateText(prompt) {
    document.getElementById('userInput').value = "";
    //document.getElementById('userInput').disabled = true;
    document.getElementById("AIResponse").innerHTML += '<div class="user-message-card"><div class="sender-name">You</div><div class="message">' + prompt + '</div></div>';
    document.getElementById("AIResponse").scrollTop = document.getElementById("AIResponse").scrollHeight;
    messageArray.push({role: "user", content: prompt})
    try {
        encodedMessageArray = { promptText: messageArray, version: 3 };
        const response = await axios.post('https://gpt-test-app.herokuapp.com/generate-text', encodedMessageArray, {
            headers: {
              'Content-Type': 'application/json'
            }
        });
        botResponse = response.data.text;
        console.log(botResponse);
        messageArray.push({role: "assistant", content: botResponse})
        document.getElementById("AIResponse").innerHTML += '<div class="bot-message-card"><div class="sender-name">Bot</div><div class="message">' + botResponse + '</div></div>';
        document.getElementById("AIResponse").scrollTop = document.getElementById("AIResponse").scrollHeight;
        //document.getElementById('userInput').disabled = false;
    } catch (error) {
        console.error(error);
        document.getElementById("AIResponse").innerHTML = "Error: " + error;
    }
}

/*
function assignPersona(persona){
    messageArray.push({role: "system", content: persona})
}*/