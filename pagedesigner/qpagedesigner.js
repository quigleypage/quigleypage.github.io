messageArray = [{role: "system", content: "You are a design assistant that generates HTML code, including style and script tags, for the user's described web page. Wrap any CSS code in style tags, and JS code in script tags, within the HTML. Define custom classes instead of using generic tags that may conflict with existing page elements.  In your responses, only provide code. Do not include any introductory commentary, code explanations, or elaborations at any point in the conversation."}];
qmodel = 7;
qcurrentCode = "";
qImageDataURL = "";

async function qgenerateText(prompt) {
    if(prompt != ""){
        document.getElementById('quserInput').value = "";
        document.getElementById('quserInput').disabled = true;
        document.getElementById('qsendButton').disabled = true;
        document.getElementById('qsendButton').innerHTML = '<div id="spinner" class="q-lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
        document.getElementById("quserInput").placeholder = "One moment please..."

        messageArray.push({role: "user", content: prompt});
        try {
            encodedMessageArray = { promptText: messageArray, version: qmodel };
            const response = await axios.post('https://gpt-test-app.herokuapp.com/generate-text', encodedMessageArray, {
                headers: {
                'Content-Type': 'application/json'
                }
            });
            botResponse = response.data.text;
            console.log("Raw Response:");
            console.log(botResponse);
            botResponse = botResponse.replaceAll("```html", "");
            botResponse = botResponse.replaceAll("```", "");
            console.log("Cleaned Response:");
            console.log(botResponse);
            
            messageArray.push({role: "assistant", content: botResponse});
            document.getElementById("q-AIResponse").innerHTML = botResponse;
            qcurrentCode = botResponse;
        } 
        catch (error) {
            console.error(error);
        }
        document.getElementById('qsendButton').innerHTML = '<i class="material-icons">send</i>';
        document.getElementById('qsendButton').disabled = false;
        document.getElementById('quserInput').disabled = false;
        document.getElementById("quserInput").placeholder = "Describe desired adjustments";
        document.getElementById("qlogo").style.display = "block";
    }
}



function qdownloadCode(){
    
    if(qcurrentCode != ""){

        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
        const day = String(now.getDate()).padStart(2, '0');

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        const formattedDateTime = `${year}-${month}-${day} - ${hours}-${minutes}-${seconds}`;


        document.getElementById("qlogo").style.animation = "q-spin 0.8s ease-out 1";
        const data = qcurrentCode;
        const blob = new Blob([data], { type: 'text/html' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'q-page-designer-export - ' + formattedDateTime + '.html';
        a.click();

        // Cleanup: release the object URL after the download has started
        setTimeout(() => URL.revokeObjectURL(url), 0);

        setTimeout(function() {
            document.getElementById("qlogo").style.animation = "none";
        }, 800); // 1000 milliseconds = 1 second
        
    }
}

function qextractText() {
    const fileInput = document.getElementById('qfileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file.');
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {
        const contents = event.target.result;
        const htmlElement = document.createElement('div');
        htmlElement.HTML = contents;

        // Extract text from HTML element
        const extractedText = htmlElement.HTML;

        messageArray.push({role: "system", content: "Here is the user's existing HTML code:\n\n" + extractedText});
        document.getElementById('q-AIResponse').innerHTML = extractedText;
        document.getElementById("quserInput").placeholder = "Describe desired adjustments";
        document.getElementById("qlogo").style.display = "block";
    };

    reader.onerror = function(event) {
        console.error('File could not be read! Code ' + event.target.error.code);
    };

    reader.readAsText(file);
}

function qConvertImageToURL() {
    qInput = document.getElementById('qImageInput');
    qFile = qInput.files[0];
    qImageDataURL = "";

    if (qFile) {
        const qReader = new FileReader();
        
        // Set the onload event handler before starting the file read operation.
        qReader.onload = function(event) {
            qImageDataURL = event.target.result;
            console.log(qImageDataURL);
            // Now you can use qImageDataURL as needed

            qpromptArrary = [
                { type: "text", text: "Use this image as a starting point." },
                {
                  type: "image_url",
                  image_url: {
                    "url": qImageDataURL
                  },
                },
            ];
            qgenerateText(qpromptArrary);
        
        };
        
        // Start reading the file and convert it to a data URL.
        qReader.readAsDataURL(qFile);

    } else {
        alert("Please select or capture an image first.");
    }


}