async function generateText(descPrompt) {
    document.getElementById("loading-wheel").style.display = "block";
    fullPrompt = "Generate HTML, including style tags, script tags (if appropriate), but not img tags, for the homepage of the below described website:\n\n" + descPrompt;
    try {
        encodedPrompt = { promptText: fullPrompt };
        const response = await axios.post('https://gpt-test-app.herokuapp.com/generate-text', encodedPrompt, {
            headers: {
              'Content-Type': 'application/json'
            }
        });
        console.log(response.data.text);
        document.getElementById("initialSite").innerHTML = "";
        document.getElementById("newSite").innerHTML = response.data.text;
    } catch (error) {
        console.error(error);
        document.getElementById("loading-wheel").style.display = "none;";
        document.getElementById("newSite").innerHTML = "Error: " + error;
    }

}