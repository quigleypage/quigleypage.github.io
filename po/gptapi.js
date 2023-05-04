messageArray = [];

async function generateText(prompt, section) {
    if(section == "userstory"){
        //document.getElementById("spinner").style.display = "block";
        document.getElementById("AIResponse").innerHTML += '<div class="desc-message-card"><div class="sender-name">Description</div><div class="message">' + document.getElementById('userInput').value + '</div></div>';
        document.getElementById("AIResponse").scrollTop = document.getElementById("AIResponse").scrollHeight;
        //<button class="copyButton"><img src="copy.png" height="12px;"></button>
        document.getElementById('userInput').value = "";
    }
    messageArray.push({role: "user", content: prompt});
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

        if(section == "userstory"){
            botResponse = botResponse.replace(/\n/g, "<br />");
            console.log(botResponse);
            
            document.getElementById("AIResponse").innerHTML += '<div class="story-message-card"><div class="sender-name">User Story</div><div class="message">' + botResponse + '</div></div>';
            generateText("Write the Acceptance Criteria for the feature.", "acceptancecriteria");
        }
        else if(section == "acceptancecriteria"){
            botResponse = botResponse.replace(/\n/g, "<br />");
            console.log(botResponse);
            
            document.getElementById("AIResponse").innerHTML += '<div class="story-message-card"><div class="sender-name">Acceptance Criteria</div><div class="message">' + botResponse + '</div></div>';
            generateText("Write example HTML code for the feature, including style tags, and respond with only the code (no commentary).", "mockup");
        }
        else if(section == "mockup"){
            if(botResponse.startsWith("```")){
                botResponse = botResponse.replaceAll("```", "");
                console.log(botResponse);
            }
            document.getElementById("AIResponse").innerHTML += '<div class="mock-message-card"><div class="sender-name">Mock-up</div><div class="message">' + botResponse + '</div></div>';
            //document.getElementById("spinner").style.display = "none";
            //document.getElementById("AIResponse").style.display = "block";
        }
        document.getElementById("AIResponse").scrollTop = document.getElementById("AIResponse").scrollHeight;
    } catch (error) {
        console.error(error);
        document.getElementById("AIResponse").innerHTML = "Error: " + error;
    }
}

function copyText(textToCopy) {
    var copyText = textToCopy;
  
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(copyText.value);
  }