/*headerVerbiage = "header (may include a banner, navbar, or search box, as appropriate)";
bodyVerbiage = "body content (without headers or footers)";
footerVerbiage = "footer";

async function generateText(descPrompt, tag) {
    if(tag == headerVerbiage){
        document.getElementById("loading-wheel").style.display = "block";
    }
    fullPrompt = "Generate HTML, including style tags, script tags (if appropriate), but not img tags, for the homepage " + tag + " of the below described website:\n\n" + descPrompt;
    try {
        encodedPrompt = { promptText: fullPrompt };
        const response = await axios.post('https://gpt-test-app.herokuapp.com/generate-text', encodedPrompt, {
            headers: {
              'Content-Type': 'application/json'
            }
        });
        console.log(response.data.text);
        document.getElementById(tag).innerHTML = response.data.text;
        if(tag == headerVerbiage){
            generateText(descPrompt, footerVerbiage);
        }
        else if(tag == footerVerbiage){
            generateText(descPrompt, bodyVerbiage);
        }
        else{
            document.getElementById("initialSite").innerHTML = "";
        }

    } catch (error) {
        console.error(error);
        document.getElementById(tag).innerHTML = "Error: " + error;
    }

}*/

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
        document.getElementById(tag).innerHTML = "Error: " + error;
    }

}