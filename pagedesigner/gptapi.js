messageArray = [{role: "system", content: "You are a design assistant that generates HTML code, including style and script tags, for the user's described web page. Wrap any CSS code in style tags, and JS code in script tags, within the HTML. Define custom classes instead of using generic tags that may conflict with existing page elements.  In your responses, only provide code. Do not include any introductory commentary, code explanations, or elaborations at any point in the conversation."}];
model = 7;
currentCode = "";

async function qgenerateText(prompt) {
    if(prompt != ""){
        document.getElementById('userInput').value = "";
        document.getElementById('userInput').disabled = true;
        document.getElementById('sendButton').disabled = true;
        document.getElementById('sendButton').innerHTML = '<div id="spinner" class="q-lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
        document.getElementById("userInput").placeholder = "One moment please..."

        messageArray.push({role: "user", content: prompt});
        try {
            encodedMessageArray = { promptText: messageArray, version: model };
            const response = await axios.post('https://gpt-test-app.herokuapp.com/generate-text', encodedMessageArray, {
                headers: {
                'Content-Type': 'application/json'
                }
            });
            botResponse = response.data.text;
            console.log("Raw Response:");
            console.log(botResponse);
            botResponse = botResponse.replaceAll("```html", "");
            botResponse = botResponse.replaceAll("```", "");
            console.log("Cleaned Response:");
            console.log(botResponse);
            
            messageArray.push({role: "assistant", content: botResponse});
            document.getElementById("AIResponse").innerHTML = botResponse;
            currentCode = botResponse;
            document.getElementById("userInput").placeholder = "Describe desired adjustments";

        } 
        catch (error) {
            console.error(error);
        }
        document.getElementById('sendButton').innerHTML = '<i class="material-icons">send</i>';
        document.getElementById('sendButton').disabled = false;
        document.getElementById('userInput').disabled = false;
    }
}



function qdownloadCode(){
    
    if(currentCode != ""){
        //document.getElementById("qlogo").style.animation = "q-spin-and-expand 1s";
        const data = currentCode;
        const blob = new Blob([data], { type: 'text/html' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'q-page-designer-export.html';
        a.click();

        // Cleanup: release the object URL after the download has started
        setTimeout(() => URL.revokeObjectURL(url), 0);
        //document.getElementById("qlogo").style.animation = "none";
    }
}
