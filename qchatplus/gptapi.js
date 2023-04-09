messageArray = [];

async function evaluateIfImage(prompt) {
    document.getElementById('userInput').value = "";
    document.getElementById("AIResponse").innerHTML += '<div class="user-message-card"><div class="sender-name">You</div><div class="message">' + prompt + '</div></div>';
    document.getElementById("AIResponse").scrollTop = document.getElementById("AIResponse").scrollHeight;
    messageArray.push({role: "user", content: prompt})
    try {
        encodedMessageArray = { promptText: [{role: "user", content: "Choose Yes or No - Is the following prompt an image generation request: " + prompt}], version: 3 };
        const response = await axios.post('https://gpt-test-app.herokuapp.com/generate-text', encodedMessageArray, {
            headers: {
              'Content-Type': 'application/json'
            }
        });
        imageCheckRaw = response.data.text;
        imageCheck = imageCheckRaw.replace(/[^A-Z0-9]/ig, "").toLowerCase();
        console.log(imageCheck);

        if(imageCheck == "yes"){
            generateText("DALLE", prompt);
        }
        else{
            generateText("GPT3.5");
        }

    } catch (error) {
        console.error(error);
        document.getElementById("AIResponse").innerHTML = "Error: " + error;
    }
}

async function generateText(ver, prompt) {

    if(ver == "DALLE"){
        encodedMessageArray = { promptText: prompt, version: -1 };
    }
    else{
        encodedMessageArray = { promptText: messageArray, version: 3 };
    }

    try {
        const response = await axios.post('https://gpt-test-app.herokuapp.com/generate-text', encodedMessageArray, {
            headers: {
              'Content-Type': 'application/json'
            }
        });
        botResponse = response.data.text;
        console.log(botResponse);

        messageArray.push({role: "assistant", content: botResponse})
        if(ver == "DALLE"){
            document.getElementById("AIResponse").innerHTML += '<div class="bot-message-card"><div class="sender-name">Bot</div><div class="message"><img src="' + botResponse + '"></div></div>';
        }
        else{
            botResponseCleaned = botResponse.replace(/\n/g, "<br />");
            document.getElementById("AIResponse").innerHTML += '<div class="bot-message-card"><div class="sender-name">Bot</div><div class="message">' + botResponseCleaned + '</div></div>';
        }
        document.getElementById("AIResponse").scrollTop = document.getElementById("AIResponse").scrollHeight;

    } catch (error) {
        console.error(error);
        document.getElementById("AIResponse").innerHTML = "Error: " + error;
    }
}