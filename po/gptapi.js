messageArray = [];
outputText = "";
featureDescriptionForDesignURL = "";

async function generateText(prompt, section) {
    if(section == "userstory"){
        document.getElementById("userInput").style.display = "none";
        document.getElementById("sendButton").style.display = "none";
        document.getElementById("spinner").style.display = "block";
        document.getElementById("AIResponse").innerHTML += '<div class="desc-message-card"><div class="sender-name">Description</div><div class="message">' + document.getElementById('userInput').value + '</div></div>';
        document.getElementById("AIResponse").scrollTop = document.getElementById("AIResponse").scrollHeight;
        outputText += "Description:\n" + document.getElementById('userInput').value + "\n\n";
        //document.getElementById('userInput').value = "";

        featureDescriptionForDesignURL =  document.getElementById('userInput').value;
        featureDescriptionForDesignURL = featureDescriptionForDesignURL.replaceAll(/[^\w\s]/gi, '_').replaceAll(/\s+/g, '_');
        console.log(featureDescriptionForDesignURL);
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
            outputText += "User Story:\n" + botResponse + "\n\n";
            botResponse = botResponse.replace(/\n/g, "<br />");
            console.log(botResponse);
            
            document.getElementById("AIResponse").innerHTML += '<div class="story-message-card"><div class="sender-name">User Story</div><div class="message">' + botResponse + '</div></div>';
            generateText("Write the Acceptance Criteria for the feature.", "acceptancecriteria");
        }
        else if(section == "acceptancecriteria"){
            outputText += "Acceptance Criteria:\n" + botResponse + "\n\n";
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
            outputText += "Mock-up Code:\n" + botResponse;
            document.getElementById("spinner").style.display = "none";
            document.getElementById("designSessionLink").innerHTML = "Need UI help? Try <b><a href='https://quigley.page/design?s=" + featureDescriptionForDesignURL + "'>Q Design</a></b>";
            document.getElementById("doneButtons").style.display = "block";
        }
        document.getElementById("AIResponse").scrollTop = document.getElementById("AIResponse").scrollHeight;
    } catch (error) {
        console.error(error);
        document.getElementById("AIResponse").innerHTML = "Error: " + error;
    }
}

function copyText() {
    navigator.clipboard.writeText(outputText);
}

function downloadText(){
    const data = outputText;
    const blob = new Blob([data], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'userstory.txt';
    a.click();

    // Cleanup: release the object URL after the download has started
    setTimeout(() => URL.revokeObjectURL(url), 0);
}

function shareText(){
    const shareData = {
        title: 'Q Product Owner',
        text: 'Check out the feature documentation I generated using Q Product Owner:\n\n' + outputText + '\n\n',
        url: 'https://quigley.page/po/'
    }
    navigator.share(shareData);
}