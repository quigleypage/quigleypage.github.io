messageArray = [{role: "system", content: "You are a design assistant that generates HTML code, including style tags, for the user's described component. Avoid using generic tags that may conflict with existing page elements. Wrap any CSS code in style tags within the HTML. In your responses, only provide code. Do not include any commentary or explanations at any point in the conversation."}];

async function generateText(prompt) {
    document.getElementById('userInput').value = "";
    document.getElementById("AIResponse").innerHTML += '<div class="user-message-card"><div class="message">' + prompt + '</div></div>';
    document.getElementById("AIResponse").scrollTop = document.getElementById("AIResponse").scrollHeight;
    document.getElementById("logo").style.animation = "load 0.5s linear infinite";
    if(messageArray.length == 1){
        //messageArray.push({role: "user", content: "Generate HTML code, including style tags, for the below described component. In your response, only provide the code. Do not include any commentary or explanations at any point in the conversation.\n\n" + prompt});
        document.getElementById("userInput").placeholder = "Describe desired adjustments...";
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
        console.log("Raw Response:");
        console.log(botResponse);
        botResponse = botResponse.replaceAll("```", "");
        console.log("Cleaned Response:");
        console.log(botResponse);
        
        messageArray.push({role: "assistant", content: botResponse})
        document.getElementById("botCanvas").innerHTML = botResponse;
        document.getElementById("canvasParent").style.display = "block";
        document.getElementById("AIResponse").scrollTop = 0;
        document.getElementById("logo").style.animation = "none";
    } 
    catch (error) {
        console.error(error);
        document.getElementById("AIResponse").innerHTML = "Error: " + error;
    }
}