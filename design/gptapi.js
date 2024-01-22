messageArray = [{role: "system", content: "You are a design assistant that generates HTML code, including style tags, for the user's described component. Wrap any CSS code in style tags within the HTML. Define custom classes instead of using generic tags that may conflict with existing page elements.  In your responses, only provide code. Do not include any introductory commentary, code explanations, or elaborations at any point in the conversation."}];
htmlArray = [];
let currentView = 0;

async function generateText(prompt) {
    if(prompt != ""){
        document.getElementById('userInput').value = "";
        document.getElementById('userInput').disabled = true;
        document.getElementById('sendButton').disabled = true;
        document.getElementById('sendButton').innerHTML = '<div id="spinner" class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
        document.getElementById("AIResponse").innerHTML += '<button id="' + htmlArray.length + '" name="' + htmlArray.length + '" class="accordion" onclick="viewVersion(name)" disabled>' + prompt + '</button>';
        document.getElementById("AIResponse").scrollTop = document.getElementById("AIResponse").scrollHeight;
        //document.getElementById("logo").style.animation = "load 1s linear infinite";
        //document.getElementById("logo").style.animation = "load 1s cubic-bezier(.17,.67,.83,.67) infinite";
        if(messageArray.length == 1){
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
            document.getElementById(String(htmlArray.length)).disabled = false; // this has to go here before the length increments; this means it will still disabled if errors occur
            htmlArray.push(botResponse);
            
            messageArray.push({role: "assistant", content: botResponse});
            document.getElementById("botCanvas").innerHTML = botResponse;
            document.getElementById("errorLine").innerHTML = "";
            currentView = htmlArray.length;

        } 
        catch (error) {
            console.error(error);
            document.getElementById("errorLine").innerHTML = "Error: " + error;
            htmlArray.push(error); // push errors even though they are inaccessible to keep index sequencing in line
        }
        document.getElementById("optionsMenu").style.display = "block";
        document.getElementById("canvasParent").style.display = "block";
        document.getElementById("AIResponse").scrollTop = 0;
        //document.getElementById("logo").style.animation = "none";
        document.getElementById('sendButton').innerHTML = '<i style="color:white;" class="material-icons right">send</i>';
        document.getElementById('sendButton').disabled = false;
        document.getElementById('userInput').disabled = false;
    }
}

function viewOptions(){
    if(document.getElementById("optionsMenuContent").style.display == "none")
        document.getElementById("optionsMenuContent").style.display = "block";
    else{
        document.getElementById("optionsMenuContent").style.display = "none";
    }
}

function viewVersion(name){
    version = parseInt(name);
    currentView = version+1;
    document.getElementById("botCanvas").innerHTML = htmlArray[version];
    document.getElementById("optionsMenuContent").style.display = "none";
}

/*function pinDesign(name){
    version = parseInt(name);
    encryptedHTML = encrypt(htmlArray[version]);
    window.open('https://quigley.page/design/?c=' + encryptedHTML, '_blank');
}*/
function pinDesign(){
    encryptedHTML = encrypt(htmlArray[currentView-1]);
    window.open('https://quigley.page/design/?c=' + encryptedHTML, '_blank');
    document.getElementById("optionsMenuContent").style.display = "none";
}

/*function popOut(name){
    version = parseInt(name);
    encryptedHTML = encrypt(htmlArray[version]);
    window.open('https://quigley.page/design/demo/?c=' + encryptedHTML, '_blank');
}*/
function popOut(){
    encryptedHTML = encrypt(htmlArray[currentView-1]);
    window.open('https://quigley.page/design/demo/?c=' + encryptedHTML, '_blank');
    document.getElementById("optionsMenuContent").style.display = "none";
}

/*function copyCode(name){
    version = parseInt(name);
    navigator.clipboard.writeText(htmlArray[version])
}*/
function copyCode(){
    navigator.clipboard.writeText(htmlArray[currentView-1]);
    document.getElementById("optionsMenuContent").style.display = "none";
}

/*function downloadCode(name){
    version = parseInt(name);
    const data = htmlArray[version];
    const blob = new Blob([data], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();

    // Cleanup: release the object URL after the download has started
    setTimeout(() => URL.revokeObjectURL(url), 0);
}*/
function downloadCode(){
    const data = htmlArray[currentView-1];
    const blob = new Blob([data], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();

    // Cleanup: release the object URL after the download has started
    setTimeout(() => URL.revokeObjectURL(url), 0);
    document.getElementById("optionsMenuContent").style.display = "none";

}

/*function shareCode(name){
    version = parseInt(name);
    const shareData = {
        title: 'Q Design Assistant',
        text: 'Check out the code I generated using Q Design Assistant:\n\n' + htmlArray[version] + '\n\n',
        url: 'https://quigley.page/design/'
    }
    navigator.share(shareData);
}*/
function shareCode(){
    const shareData = {
        title: 'Q Design Assistant',
        text: 'Check out the code I generated using Q Web Designer:\n\n' + htmlArray[currentView-1] + '\n\n',
        url: 'https://quigley.page/design/'
    }
    navigator.share(shareData);
    document.getElementById("optionsMenuContent").style.display = "none";

}