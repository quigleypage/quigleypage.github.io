messageArray = [{role: "system", content: "You are a design assistant that generates HTML code, including style tags, for the user's described component. Wrap any CSS code in style tags within the HTML. Define custom classes instead of using generic tags that may conflict with existing page elements.  In your responses, only provide code. Do not include any introductory commentary, code explanations, or elaborations at any point in the conversation."}];
htmlArray = [];

async function generateText(prompt) {
    if(prompt != ""){
        document.getElementById('userInput').value = "";
        //document.getElementById("AIResponse").innerHTML += '<div class="user-message-card"><div class="message">' + prompt + '</div></div>';
        document.getElementById("AIResponse").innerHTML += '<button id="' + htmlArray.length + '" name="' + htmlArray.length + '" class="accordion">' + prompt + '</button><div class="panel"><button name="' + htmlArray.length + '" class="card-buttons" onclick="viewVersion(name)"><i class="material-icons">visibility</i></button><button name="' + htmlArray.length + '" class="card-buttons" onclick="copyCode(name)"><i class="material-icons">content_copy</i></button><button name="' + htmlArray.length + '" class="card-buttons" onclick="downloadCode(name)"><i class="material-icons">file_download</i></button><button name="' + htmlArray.length + '" class="card-buttons" onclick="shareCode(name)"><i class="material-icons">share</i></button></div>';
        document.getElementById("AIResponse").scrollTop = document.getElementById("AIResponse").scrollHeight;
        document.getElementById("logo").style.animation = "load 1s linear infinite";
        //document.getElementById("logo").style.animation = "load 1s cubic-bezier(.17,.67,.83,.67) infinite";
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
            htmlArray.push(botResponse);
            
            messageArray.push({role: "assistant", content: botResponse})
            document.getElementById("botCanvas").innerHTML = botResponse;
            document.getElementById("canvasParent").style.display = "block";
            document.getElementById("AIResponse").scrollTop = 0;
            document.getElementById("logo").style.animation = "none";

            //accordion handler needs to activate listener retroactively
            var acc = document.getElementsByClassName("accordion");
            var i;
            
            for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
                } 
            });
            }

        } 
        catch (error) {
            console.error(error);
            document.getElementById("errorLine").innerHTML = "Error: " + error;
            document.getElementById("canvasParent").style.display = "block";
        }
    }
}

function viewVersion(name){
    version = parseInt(name);
    document.getElementById("botCanvas").innerHTML = htmlArray[version];
}

function copyCode(name){
    version = parseInt(name);
    navigator.clipboard.writeText(htmlArray[version])
}

function downloadCode(name){
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
}

function shareCode(name){
    version = parseInt(name);
    const shareData = {
        title: 'Q Design Assistant',
        text: 'Check out the code I generated using Q Design Assistant:\n\n' + htmlArray[version] + '\n\n',
        url: 'https://quigley.page/design/'
    }
    navigator.share(shareData);
}