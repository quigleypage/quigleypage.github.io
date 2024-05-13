messageArray = [];

async function generateText(prompt) {
    document.getElementById("AIResponse").innerHTML = "Loading...";
    messageArray.push({role: "user", content: prompt})

    encodedMessageArray = { promptText: messageArray, version: 3 };
    isImage = false;

    if(document.getElementById("GPT4").checked){
        encodedMessageArray = { promptText: messageArray, version: 4 };
    }
    else if(document.getElementById("GPT4TurboPreview").checked){
        encodedMessageArray = { promptText: messageArray, version: 5 };
    }
    else if(document.getElementById("GPT4o").checked){
        encodedMessageArray = { promptText: messageArray, version: 6 };
    }
    else if(document.getElementById("DALLE").checked){
        encodedMessageArray = { promptText: prompt, version: -1 };
        isImage = true;
    }
    else if(document.getElementById("DALLE512").checked){
        encodedMessageArray = { promptText: prompt, version: -2 };
        isImage = true;
    }
    else if(document.getElementById("DALLE1024").checked){
        encodedMessageArray = { promptText: prompt, version: -3 };
        isImage = true;
    }
    else if(document.getElementById("DALLE3-1024x1024").checked){
        encodedMessageArray = { promptText: prompt, version: -4 };
        isImage = true;
    }
    else if(document.getElementById("DALLE3-1024x1792").checked){
        encodedMessageArray = { promptText: prompt, version: -5 };
        isImage = true;
    }
    else if(document.getElementById("DALLE3-1792x1024").checked){
        encodedMessageArray = { promptText: prompt, version: -6 };
        isImage = true;
    }
    else if(document.getElementById("DALLE3HD-1024x1024").checked){
        encodedMessageArray = { promptText: prompt, version: -7 };
        isImage = true;
    }
    else if(document.getElementById("DALLE3HD-1024x1792").checked){
        encodedMessageArray = { promptText: prompt, version: -8 };
        isImage = true;
    }
    else if(document.getElementById("DALLE3HD-1792x1024").checked){
        encodedMessageArray = { promptText: prompt, version: -9 };
        isImage = true;
    }

    try {
        const response = await axios.post('https://gpt-test-app.herokuapp.com/generate-text', encodedMessageArray, {
            headers: {
              'Content-Type': 'application/json'
            }
        });
        console.log(response.data.text);
        if(!isImage){
            document.getElementById("AIResponse").innerHTML = response.data.text;
            document.getElementById("DALLEResponse").src = "";
        }
        else{
            document.getElementById("AIResponse").innerHTML = "";
            document.getElementById("DALLEResponse").src = response.data.text;
        }
    } catch (error) {
        console.error(error);
        document.getElementById("AIResponse").innerHTML = "Error: " + error;
    }
}