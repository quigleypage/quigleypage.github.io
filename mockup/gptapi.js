messageArray = [];

async function generateText(prompt) {
    document.getElementById('userInput').value = "";
    document.getElementById("AIResponse").innerHTML += '<div class="user-message-card"><div class="sender-name">You</div><div class="message">' + prompt + '</div></div>';
    document.getElementById("AIResponse").scrollTop = document.getElementById("AIResponse").scrollHeight;
    if(messageArray.length == 0){
        messageArray.push({role: "user", content: "Generate HTML code, including style tags, for the below described component. In your response, only provide the code. Do not include any commentary or explanations of the code.\n\n" + prompt})
        document.getElementById("canvasParent").style.display = "block";
        document.getElementById("userInput").placeholder = "Describe desired adjustments...";
    }
    else{
        messageArray.push({role: "user", content: prompt});
    }
    try {
        encodedMessageArray = { promptText: messageArray, version: 3 };
        const response = await axios.post('https://gpt-test-app.herokuapp.com/generate-text', encodedMessageArray, {
            headers: {
              'Content-Type': 'application/json'
            }
        });
        botResponse = response.data.text;
        console.log(botResponse);
        botResponse = botResponse.replaceAll("```", "");
        console.log(botResponse);
        
        messageArray.push({role: "assistant", content: botResponse})
        document.getElementById("botCanvas").innerHTML = botResponse;
        document.getElementById("AIResponse").scrollTop = document.getElementById("AIResponse").scrollHeight;
    } catch (error) {
        console.error(error);
        document.getElementById("AIResponse").innerHTML = "Error: " + error;
    }
}