personaAName = "";
personaBName = "";
conversationLength = 0;
personaAMessageArray = [];
personaBMessageArray = [];
personaAAvatarURL = "";
personaBAvatarURL = "";
turnTracker = "A";
messagesGenerated = 0;

function setParamaters(){
    personaAName = document.getElementById("CharA").value;
    personaBName = document.getElementById("CharB").value;
    conversationLength = document.getElementById("textLength").value;
    console.log(personaAName + " | " + personaBName + " | " + String(conversationLength));

    if(personaAName != "" && personaBName != "" && conversationLength > 0 && conversationLength < 11){
        personaAMessageArray.push({role: "system", content: "You are " + personaAName + " and you are having a text message conversation with " + personaBName + ". You will start the conversation. Do not start the conversation with your name."});
        personaBMessageArray.push({role: "system", content: "You are " + personaBName + " and you are having a text message conversation with " + personaAName + "."});

        document.getElementById("parameterForm").style.display = "none";
        document.getElementById("logo").style.animation = "load 1s linear infinite";

        generateAvatarA();
    }
}

async function generateAvatarA() {
    encodedAvatarRequestA = { promptText: "A social media avatar for " + personaAName, version: -1 };
    try {
        const response = await axios.post('https://gpt-test-app.herokuapp.com/generate-text', encodedAvatarRequestA, {
            headers: {
              'Content-Type': 'application/json'
            }
        });
        console.log(response.data.text);
        personaAAvatarURL = response.data.text;

        generateAvatarB();
    } 
    catch (error) {
        console.error(error);
        document.getElementById("AIResponse").innerHTML += "<br><br><div id='ErrorMessage'><b>Error:</b> " + error + "</div>";
    }
}

async function generateAvatarB() {
    encodedAvatarRequestB = { promptText: "A social media avatar for " + personaBName, version: -1 };
    try {
        const response = await axios.post('https://gpt-test-app.herokuapp.com/generate-text', encodedAvatarRequestB, {
            headers: {
              'Content-Type': 'application/json'
            }
        });
        console.log(response.data.text);
        personaBAvatarURL = response.data.text;

        generateText();
    } 
    catch (error) {
        console.error(error);
        document.getElementById("AIResponse").innerHTML += "<br><br><div id='ErrorMessage'><b>Error:</b> " + error + "</div>";
    }
}


async function generateText() {
    
    if(messagesGenerated < conversationLength){

        try {
            if(turnTracker == "A"){
                encodedpersonaAMessageArray = { promptText: personaAMessageArray, version: 3 };
                const response = await axios.post('https://gpt-test-app.herokuapp.com/generate-text', encodedpersonaAMessageArray, {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                });
                botResponse = response.data.text;
                document.getElementById("AIResponse").innerHTML += "<div class='message-bubble'><img class='avatar' src='" + personaAAvatarURL + "'><div class='message-content'><div class='sender-name'>" + personaAName + "</div><div class='message-text'>" + botResponse + "</div></div></div>";
                personaAMessageArray.push({role: "assistant", content: botResponse});
                personaBMessageArray.push({role: "user", content: botResponse});
                turnTracker = "B";
            }
            else{
                encodedpersonaBMessageArray = { promptText: personaBMessageArray, version: 3 };
                const response = await axios.post('https://gpt-test-app.herokuapp.com/generate-text', encodedpersonaBMessageArray, {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                });
                botResponse = response.data.text;
                document.getElementById("AIResponse").innerHTML += "<div class='message-bubble'><div class='message-contentB'><div class='sender-name'>" + personaBName + "</div><div class='message-text'>" + botResponse + "</div></div><img class='avatarB' src='" + personaBAvatarURL + "'></div>";
                personaAMessageArray.push({role: "user", content: botResponse});
                personaBMessageArray.push({role: "assistant", content: botResponse});
                turnTracker = "A";
            }

            //auto scroll is not working for some reason
            //document.getElementById("AIResponse").scrollTop = document.getElementById("AIResponse").scrollHeight;
            messagesGenerated += 1;
            generateText();
        } 
        catch (error) {
            console.error(error);
            document.getElementById("AIResponse").innerHTML += "<br><br><div id='ErrorMessage'><b>Error:</b> " + error + "</div>";
        }

    }
    else{
        document.getElementById("logo").style.animation = "none";
    }
    
}