async function generateText(descPrompt, tag) {
    if(tag == "header"){
        document.getElementById("loading-wheel").style.display = "block";
    }
    fullPrompt = "Generate HTML, including style tags, for the site " + tag + " of the below described website:\n\n" + descPrompt;
    try {
        encodedPrompt = { promptText: fullPrompt };
        const response = await axios.post('https://gpt-test-app.herokuapp.com/generate-text', encodedPrompt, {
            headers: {
              'Content-Type': 'application/json'
            }
        });
        console.log(response.data.text);
        document.getElementById(tag + "Tag").innerHTML = response.data.text;
        if(tag == "header"){
            generateText(descPrompt, "footer");
        }
        else if(tag == "footer"){
            generateText(descPrompt, "body");
        }
        else{
            document.getElementById("initialSite").innerHTML = "";
        }

    } catch (error) {
        console.error(error);
        document.getElementById(tag + "Tag").innerHTML = "Error: " + error;
    }

}