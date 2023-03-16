messageArray = [];

async function generateText(prompt, section) {
    if(section == "userstory"){
        document.getElementById("AIResponse").innerHTML += '<div class="desc-message-card"><div class="sender-name">Description</div><div class="message">' + document.getElementById('userInput').value + '</div></div>';
        document.getElementById('userInput').value = "";
    }
    messageArray.push({role: "user", content: prompt});
    try {
        encodedMessageArray = { promptText: messageArray };
        const response = await axios.post('https://gpt-test-app.herokuapp.com/generate-text', encodedMessageArray, {
            headers: {
              'Content-Type': 'application/json'
            }
        });
        botResponse = response.data.text;
        console.log(botResponse);
        messageArray.push({role: "assistant", content: botResponse})
        if(section == "userstory"){
            document.getElementById("AIResponse").innerHTML += '<div class="story-message-card"><div class="sender-name">User Story</div><div class="message">' + botResponse + '</div></div>';
            generateText("Now write the Acceptance Criteria for the feature.", "acceptancecriteria");
        }
        else if(section == "acceptancecriteria"){
            document.getElementById("AIResponse").innerHTML += '<div class="story-message-card"><div class="sender-name">Acceptance Criteria</div><div class="message">' + botResponse + '</div></div>';
            generateText("Write some HTML code for the feature.", "mockup");
        }
        else if(section == "mockup"){
            document.getElementById("AIResponse").innerHTML += '<div class="mock-message-card"><div class="sender-name">Mock-up</div><div class="message">' + botResponse + '</div></div>';
        }
        document.getElementById("AIResponse").scrollTop = document.getElementById("AIResponse").scrollHeight;
    } catch (error) {
        console.error(error);
        document.getElementById("AIResponse").innerHTML = "Error: " + error;
    }
}