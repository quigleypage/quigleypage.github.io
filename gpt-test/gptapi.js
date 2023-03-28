messageArray = [];

async function generateText(prompt) {
    document.getElementById("AIResponse").innerHTML = "Loading...";
    messageArray.push({role: "user", content: prompt})

    encodedMessageArray = { promptText: messageArray, version: 3 };
    isImage = false;

    if(document.getElementById("GPT4").checked){
        encodedMessageArray = { promptText: messageArray, version: 4 };
    }
    else if(document.getElementById("DALLE").checked){
        encodedMessageArray = { promptText: prompt, version: -1 };
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