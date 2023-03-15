messageArray = [];

async function generateText(prompt) {
    document.getElementById('userInput').value = "";
    document.getElementById("AIResponse").innerHTML += "User: " + prompt + "<br><br>";
    document.getElementById("LoadingDots").style.display = "block";
    messageArray.push({role: "user", content: prompt})
    try {
        encodedMessageArray = { promptText: messageArray };
        const response = await axios.post('https://gpt-test-app.herokuapp.com/generate-text', encodedMessageArray, {
            headers: {
              'Content-Type': 'application/json'
            }
        });
        botResponse = response.data.text;
        console.log(botResponse);
        messageArray.push({role: "assistant", content: botResponse})
        document.getElementById("LoadingDots").style.display = "none";
        document.getElementById("AIResponse").innerHTML += "Bot: " + botResponse + "<br><br>";
    } catch (error) {
        console.error(error);
        document.getElementById("AIResponse").innerHTML = "Error: " + error;
    }
}