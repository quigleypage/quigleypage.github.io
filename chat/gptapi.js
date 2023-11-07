messageArray = [];
model = 3;

async function generateText(prompt) {
    document.getElementById('sendButton').disabled = true;
    document.getElementById('userInput').value = "";
    document.getElementById("AIResponse").innerHTML += '<div class="user-message-card"><div class="sender-name">You</div><div class="message">' + prompt + '</div></div>';
    document.getElementById("AIResponse").scrollTop = document.getElementById("AIResponse").scrollHeight;
    document.getElementById("logo").style.animation = "load 1s linear infinite";
    document.getElementById("initialSelections").style.display = "none";

    if(document.getElementById("GPT4").checked == true){
        model = 4;
    }
    else if(document.getElementById("GPT4T").checked == true){
        model = 5;
    }
    if(document.getElementById("systemPrompt").value != ""){
        messageArray.push({role: "system", content: document.getElementById("systemPrompt").value})
    }

    messageArray.push({role: "user", content: prompt})
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
        document.getElementById("AIResponse").scrollTop = document.getElementById("AIResponse").scrollHeight;
        document.getElementById('sendButton').disabled = false;
        document.getElementById("logo").style.animation = "none";

    } catch (error) {
        console.error(error);
        document.getElementById("AIResponse").innerHTML = "Error: " + error;
    }
}