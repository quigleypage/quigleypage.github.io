messageArray = [];

async function generateText(prompt) {
    document.getElementById("AIResponse").innerHTML = "Loading...";
    messageArray.push({role: "user", content: prompt})
    try {
        encodedMessageArray = { promptText: messageArray };
        const response = await axios.post('https://gpt-test-app.herokuapp.com/generate-text', encodedMessageArray, {
            headers: {
              'Content-Type': 'application/json'
            }
        });
        console.log(response.data.text);
        document.getElementById("AIResponse").innerHTML = response.data.text;
    } catch (error) {
        console.error(error);
        document.getElementById("AIResponse").innerHTML = "Error: " + error;
    }
}