personaAName = "";
personaARole = "";
personaBName = "";
personaBRole = "";
conversationTopic = "";
conversationLength = 10;
personaAMessageArray = [];
personaBMessageArray = [];
turnTracker = "A";
messagesGenerated = 0;
transcriptText = "Q Dynamic Duo\n=============\n\n";

function setParamaters(){
    document.getElementById('spinnerWrapper').innerHTML = '<div id="spinner" class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
    personaAName = document.getElementById("CharA").value;
    personaARole = document.getElementById("RoleA").value;
    personaBName = document.getElementById("CharB").value;
    personaBRole = document.getElementById("RoleB").value;
    conversationTopic = document.getElementById("topic").value;
    //console.log(personaAName + " | " + personaBName + " | " + String(conversationLength));

    if(personaAName != "" && personaBName != "" && conversationLength > 0 && conversationLength < 11){
        personaAMessageArray.push({role: "system", content: "You are " + personaAName + ". Your role is " + personaARole + ". You are having a conversation with " + personaBName + ", whose role is " + personaBRole + ". You will start the conversation. Do not start messages with your name. The topic of the conversation is:\n\n" + conversationTopic});
        personaBMessageArray.push({role: "system", content: "You are " + personaBName + ". Your role is " + personaBRole + ". You are having a conversation with " + personaAName + ", whose role is " + personaARole + ". Do not start messages with your name. The topic of the conversation is:\n\n" + conversationTopic});

        document.getElementById("parameterForm").style.display = "none";
        generateText();
    }
}

async function generateText() {
    
    if(messagesGenerated < conversationLength){

        try {
            if(turnTracker == "A"){
                encodedpersonaAMessageArray = { promptText: personaAMessageArray, version: 7 };
                const response = await axios.post('https://gpt-test-app.herokuapp.com/generate-text', encodedpersonaAMessageArray, {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                });
                botResponse = response.data.text;
                personaAMessageArray.push({role: "assistant", content: botResponse});
                personaBMessageArray.push({role: "user", content: botResponse});
                transcriptText += personaAName + ":\n" + botResponse + "\n\n-------\n\n";

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
                // Inline code
                botResponseCleaned = botResponseCleaned.replaceAll(/`(.*?)`/g, '<code>$1</code>');
                // Code block
                botResponseCleaned = botResponseCleaned.replaceAll(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
                        
                document.getElementById("AIResponse").innerHTML +=  "<br><div style='padding:8px;'><b>" + personaAName + ", " + personaARole + "</b><br>" + botResponseCleaned + "</div>";
                turnTracker = "B";
            }
            else{
                encodedpersonaBMessageArray = { promptText: personaBMessageArray, version: 7 };
                const response = await axios.post('https://gpt-test-app.herokuapp.com/generate-text', encodedpersonaBMessageArray, {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                });
                botResponse = response.data.text;
                personaAMessageArray.push({role: "user", content: botResponse});
                personaBMessageArray.push({role: "assistant", content: botResponse});
                transcriptText += personaBName + ":\n" + botResponse + "\n\n-------\n\n";

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
                // Inline code
                botResponseCleaned = botResponseCleaned.replaceAll(/`(.*?)`/g, '<code>$1</code>');
                // Code block
                botResponseCleaned = botResponseCleaned.replaceAll(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

                document.getElementById("AIResponse").innerHTML += "<br><div style='padding:8px;background-color:#EFEFEF;border-radius:8px;'><b>" + personaBName + ", " + personaBRole + "</b><br>" + botResponseCleaned + "</div>";
                turnTracker = "A";
            }

            messagesGenerated += 1;
            generateText();
        } 
        catch (error) {
            console.error(error);
            document.getElementById("AIResponse").innerHTML += "<br><br><div id='ErrorMessage'><b>Error:</b> " + error + "</div>";
        }

    }
    else{
        //stop the loading animation
        document.getElementById('spinnerWrapper').innerHTML = '';
        document.getElementById('downloadButton').style.display = "block";
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
    a.download = 'Q Dynamic Duo Transcript - ' + timeString + '.txt';
    a.click();

    // Cleanup: release the object URL after the download has started
    setTimeout(() => URL.revokeObjectURL(url), 0);
}