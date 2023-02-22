async function generateText(descPrompt, stylePrompt) {
    document.getElementById("AIResponse").innerHTML = "Loading...";
    fullPrompt = "Write some HTML, including style tags, for the following web component:\n\nDescription:\n" + descPrompt + "\n\nAesthetic Guidelines:\n" + stylePrompt;
    try {
        encodedPrompt = { promptText: fullPrompt };
        const response = await axios.post('https://gpt-test-app.herokuapp.com/generate-text', encodedPrompt, {
            headers: {
              'Content-Type': 'application/json'
            }
        });
        console.log(response.data.text);
        //document.getElementById("AIResponseHTML").innerHTML = '<code>' + response.data.text + '</code>';
        document.getElementById("AIResponse").innerHTML = response.data.text;
    } catch (error) {
        console.error(error);
        document.getElementById("AIResponse").innerHTML = "Error: " + error;
    }
}