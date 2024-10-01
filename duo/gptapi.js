personaAName = "";
personaARole = "";
personaAInstructions = "";
personaBName = "";
personaBRole = "";
personaBInstructions = "";
conversationTopic = "";
conversationLength = 20;
personaAMessageArray = [];
personaBMessageArray = [];
turnTracker = "A";
messagesGenerated = 0;
transcriptText = "";
SummaryMessageArray = [];

function setParamaters(){
    document.getElementById('spinnerWrapper').innerHTML = '<div id="spinner" class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
    document.getElementById('stopButton').style.display = "block";
    personaAName = document.getElementById("CharA").value;
    personaARole = document.getElementById("RoleA").value;
    personaAInstructions = document.getElementById("InstructionsA").value;
    personaBName = document.getElementById("CharB").value;
    personaBRole = document.getElementById("RoleB").value;
    personaBInstructions = document.getElementById("InstructionsB").value;
    conversationTopic = document.getElementById("topic").value;
    transcriptText += "Persona A: " + personaAName + ", " + personaARole + "\nInstructions: " + personaAInstructions + "\n\nPersona B: " + personaBName + ", " + personaBRole + "\nInstructions: " + personaBInstructions + "\n\nTopic of Conversation: " + conversationTopic + "\n=============\n\n";
    //console.log(personaAName + " | " + personaBName + " | " + String(conversationLength));

    if(personaAName != "" && personaBName != ""){
        personaAMessageArray.push({role: "system", content: "You are " + personaAName + ". Your role is " + personaARole + ". You are having a conversation with " + personaBName + ", whose role is " + personaBRole + ". You will start the conversation. Do not start messages with your name." + personaAInstructions + ". When you feel the conversation has come to a natural end, either because you have solved the given problem or have nothing else to add, then reply ~~~DONE~~~. The topic of the conversation is:\n\n" + conversationTopic});
        personaBMessageArray.push({role: "system", content: "You are " + personaBName + ". Your role is " + personaBRole + ". You are having a conversation with " + personaAName + ", whose role is " + personaARole + ". Do not start messages with your name." + personaBInstructions + ". When you feel the conversation has come to a natural end, either because you have solved the given problem or have nothing else to add, then reply ~~~DONE~~~. The topic of the conversation is:\n\n" + conversationTopic});

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
                console.log(botResponse);
                transcriptText += personaAName + ":\n" + botResponse + "\n\n-------\n\n";
                personaAMessageArray.push({role: "assistant", content: botResponse});
                personaBMessageArray.push({role: "user", content: botResponse});

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
                //remove stop word from visual
                botResponseCleaned = botResponseCleaned.replaceAll('~~~DONE~~~','');
                        
                document.getElementById("AIResponse").innerHTML +=  "<br><div style='padding:8px;'><b>" + personaAName + ", " + personaARole + "</b><br>" + botResponseCleaned + "</div>";
                turnTracker = "B";
                messagesGenerated += 1;

                if(botResponse.includes("~~~DONE~~~") == false){
                    generateText();
                }
                else{
                    // call summarization function
                    wrapUp();
                }
            }
            else{
                encodedpersonaBMessageArray = { promptText: personaBMessageArray, version: 7 };
                const response = await axios.post('https://gpt-test-app.herokuapp.com/generate-text', encodedpersonaBMessageArray, {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                });
                botResponse = response.data.text;
                console.log(botResponse);
                transcriptText += personaBName + ":\n" + botResponse + "\n\n-------\n\n";
                personaAMessageArray.push({role: "user", content: botResponse});
                personaBMessageArray.push({role: "assistant", content: botResponse});

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
                //remove stop word from visual
                botResponseCleaned = botResponseCleaned.replaceAll('~~~DONE~~~','');

                document.getElementById("AIResponse").innerHTML += "<br><div class='personaBMessageCard'><b>" + personaBName + ", " + personaBRole + "</b><br>" + botResponseCleaned + "</div>";
                turnTracker = "A";
                messagesGenerated += 1;

                if(botResponse.includes("~~~DONE~~~") == false){
                    generateText();
                }
                else{
                    //call summarization
                    wrapUp();
                }
            }

        } 
        catch (error) {
            console.error(error);
            document.getElementById("AIResponse").innerHTML += "<br><br><div id='ErrorMessage'><b>Error:</b> " + error + "</div>";
        }

    }
    
}

function wrapUp(){
    document.getElementById('stopButton').style.display = "none";
    document.getElementById('downloadButton').style.display = "block";
    messagesGenerated = conversationLength + 1;
    summarize();
    //document.getElementById('spinnerWrapper').innerHTML = ''; // this stops the spinner, comment out this line when you get summaries working
}

function downloadText(){
    const data = "Q Dynamic Duo\n=============\n" + transcriptText;
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

async function summarize() {
    SummaryMessageArray.push({role: "system", content: "Summarize the following conversation in 2-4 sentences, emphasizing any key outcomes, results, or conclusions:\n\n" + transcriptText});
    try {
        encodedSummaryMessageArray = { promptText: SummaryMessageArray, version: 7 };
        const response = await axios.post('https://gpt-test-app.herokuapp.com/generate-text', encodedSummaryMessageArray, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        botResponse = response.data.text;
        //console.log(botResponse);
        //transcriptText += "Conversation Summary:\n" + botResponse;
        
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
                
        document.getElementById("AIResponse").innerHTML =  "<div class='summaryCard'><b>Conversation Summary</b><br>" + botResponseCleaned + "</div>" + document.getElementById("AIResponse").innerHTML;
        document.getElementById('spinnerWrapper').innerHTML = '';

    } 
    catch (error) {
        console.error(error);
        document.getElementById("AIResponse").innerHTML += "<br><br><div id='ErrorMessage'><b>Error:</b> " + error + "</div>";
    }
}