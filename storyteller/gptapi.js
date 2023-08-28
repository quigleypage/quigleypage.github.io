pageTracker = 1;
pageText = [];
pageImageURL = [];
MessageArray = [];
pageLimit = 5;
style="bedtime";

function setParamaters(){
    topic = document.getElementById("topic").value;

    if(topic != ""){
        if(document.getElementById("bedtime").checked == true){
            MessageArray.push({role: "system", content: "You are a children's bedtime story generator. You are going to generate a " + toString(pageLimit) + "-page story. Each page should only be 1-2 sentences. You will generate a story about " + topic + "."});
            MessageArray.push({role: "user", content: "Generate the first page of the story now."});
        }
        else{
            style = "comicbook";
            MessageArray.push({role: "system", content: "You are a comic book story generator. You are going to generate a " + toString(pageLimit) + "-panel comic. Each panel should only be 1-2 sentences. You will generate a story about " + topic + "."});
            MessageArray.push({role: "user", content: "Generate text for the first panel of the comic now."});
        }

        document.getElementById("parameterForm").style.display = "none";
        document.getElementById("logo").style.animation = "load 1s linear infinite";
        document.getElementById("loadProgress").style.display = "block";

        generatePageText();
    }
}

async function generateImage() {
    if(style=="bedtime"){
        encodedImageRequest = { promptText: "A watercolor painting illustrating the following children's book scene: " + pageText[pageTracker], version: -1 };
    }
    else{
        encodedImageRequest = { promptText: "A comicbook-style illustration for the following comic book panel: " + pageText[pageTracker], version: -1 };
    }
    try {
        const response = await axios.post('https://gpt-test-app.herokuapp.com/generate-text', encodedImageRequest, {
            headers: {
              'Content-Type': 'application/json'
            }
        });
        console.log(response.data.text);
        pageImageURL[pageTracker] = response.data.text;

        document.getElementById("loadProgress").innerHTML += "<div class='milestone'></div>";
        document.getElementById("loadProgress").style.display = "none";
        document.getElementById("AIResponse").innerHTML += "<br><img class='centeredImage' src='" + pageImageURL[pageTracker] + "'><br><div class='pageText'>" + pageText[pageTracker] + "</div><br>";

        pageTracker += 1;
        if(style=="bedtime"){
            MessageArray.push({role: "user", content: "Now generate page " + toString(pageTracker) + " of the story."});
        }
        else{
            MessageArray.push({role: "user", content: "Now generate text for panel " + toString(pageTracker) + " of the comic."});
        }
        
        generatePageText();
    } 
    catch (error) {
        console.error(error);
    }
}


async function generatePageText() {
    
    if(pageTracker < pageLimit + 1){

        try {
            encodedMessageArray = { promptText: MessageArray, version: 3 };
            const response = await axios.post('https://gpt-test-app.herokuapp.com/generate-text', encodedMessageArray, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            botResponse = response.data.text;
            console.log(botResponse);
            MessageArray.push({role: "assistant", content: botResponse});
            pageText[pageTracker] = botResponse;
            document.getElementById("loadProgress").innerHTML += "<div class='milestone'></div>";

            generateImage();
        } 
        catch (error) {
            console.error(error);
        }

    }
    else{
        document.getElementById("logo").style.animation = "none";
    }
    
}