messageArray = [];
model = 7;
transcriptText = "Q Assistants\n";
//scrollHeightTracker = 0;
botName = "Q";
botIntroText = "";
userInputPlaceholderText = "Message";

async function generateText(prompt) {
    document.getElementById('sendButton').disabled = true;
    document.getElementById('sendButton').innerHTML = '<div id="spinner" class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
    document.getElementById('userInput').value = "";
    document.getElementById('userInput').placeholder = "One moment please...";
    document.getElementById('userInput').disabled = true;

    //document.getElementById("AIResponse").innerHTML += '<div class="user-message-card"><div class="sender-name">You</div><div class="message">' + prompt.replaceAll("\n", "<br>") + '</div></div>';
    document.getElementById("AIResponse").innerHTML += '<div class="user-message-card"><div class="message">' + prompt.replaceAll("\n", "<br>") + '</div></div>';
    const loader = createFloatingQ();
    document.getElementById("AIResponse").appendChild(loader.element);
    messageArray.push({role: "user", content: prompt});
    transcriptText += "You:\n" + prompt + "\n\n-------\n\n";
    document.getElementById("AIResponse").scrollTop = document.getElementById("AIResponse").scrollHeight;
    encodedMessageArray = { promptText: messageArray, version: model };
    console.log(encodedMessageArray);

    if(messageArray.length >= 1){
        document.getElementById('introText').style.display = "none";
        document.getElementById('suggestedThemes').style.display = "none";
    }

    try {
        const response = await axios.post('https://gpt-test-app.herokuapp.com/generate-text', encodedMessageArray, {
            headers: {
              'Content-Type': 'application/json'
            }
        });
        botResponse = response.data.text;
        console.log(botResponse);

        messageArray.push({role: "assistant", content: botResponse})
        botResponseCleaned = botResponse.replace(/\n/g, "<br />");
        // Bold
        botResponseCleaned = botResponseCleaned.replaceAll(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        botResponseCleaned = botResponseCleaned.replaceAll(/__(.*?)__/g, '<strong>$1</strong>');
        // Italic
        botResponseCleaned = botResponseCleaned.replaceAll(/\*(.*?)\*/g, '<em>$1</em>');
        botResponseCleaned = botResponseCleaned.replaceAll(/_(.*?)_/g, '<em>$1</em>');
        // Bold and Italic
        botResponseCleaned = botResponseCleaned.replaceAll(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
        botResponseCleaned = botResponseCleaned.replaceAll(/___(.*?)___/g, '<strong><em>$1</em></strong>');
        // Inline code
        botResponseCleaned = botResponseCleaned.replaceAll(/`(.*?)`/g, '<code>$1</code>');
        // Code block
        botResponseCleaned = botResponseCleaned.replaceAll(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

        //scrollHeightTracker = document.getElementById("AIResponse").scrollHeight;
        //document.getElementById("AIResponse").innerHTML += '<div class="bot-message-card"><div class="sender-name">' + botName + '</div><div class="message">' + botResponseCleaned + '</div></div>';
        loader.destroy();
        document.getElementById("AIResponse").innerHTML += '<div class="bot-message-card"><div class="message">' + botResponseCleaned + '</div></div>';
        //document.getElementById("AIResponse").scrollTop = document.getElementById("AIResponse").scrollHeight;
        transcriptText += botName + ":\n" + botResponse + "\n\n-------\n\n";
        showArrowDown();
        document.getElementById('sendButton').innerHTML = '<i class="material-icons">send</i>';
        document.getElementById('sendButton').disabled = false;
        document.getElementById('userInput').placeholder = userInputPlaceholderText;
        document.getElementById('userInput').disabled = false;
        document.getElementById('downloadButton').style.display = "block";

    } catch (error) {
        console.error(error);
        document.getElementById("AIResponse").innerHTML = "Error: " + error;
    }
}

function downloadText(){
    const data = transcriptText;
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    // Get the current date and time
    let now = new Date();

    // Format the year, month, day, hour, minute, and second
    let year = now.getFullYear();
    let month = (now.getMonth() + 1).toString().padStart(2, '0');
    let day = now.getDate().toString().padStart(2, '0');
    let hour = now.getHours().toString().padStart(2, '0');
    let minute = now.getMinutes().toString().padStart(2, '0');
    let second = now.getSeconds().toString().padStart(2, '0');

    // Concatenate the formatted components with underscores
    let timeString = `${year}-${month}-${day}_${hour}-${minute}-${second}`;

    const a = document.createElement('a');
    a.href = url;
    a.download = 'Q Assistants Transcript - ' + timeString + '.txt';
    a.click();

    // Cleanup: release the object URL after the download has started
    setTimeout(() => URL.revokeObjectURL(url), 0);
}

function updateMessageBox(message){
    document.getElementById('userInput').value = message;
}
  

var j = 0;
var speed = 50; /* The speed/duration of the effect in milliseconds */
var hitxt = ""; /* The text */
function typeWriter() {
    if (j < hitxt.length) {
        document.getElementById("introText").innerHTML += hitxt.charAt(j);
        j++;
        setTimeout(typeWriter, speed);
    }
}

function showArrowDown(){
    //console.log(document.getElementById("AIResponse").scrollHeight - document.getElementById("AIResponse").scrollTop + " | " + document.getElementById("AIResponse").clientHeight);
    if(document.getElementById("AIResponse").scrollHeight - document.getElementById("AIResponse").scrollTop > document.getElementById("AIResponse").clientHeight + 64){
        document.getElementById('arrowDown').style.display = "block";
    }
    else{
        document.getElementById('arrowDown').style.display = "none";
    }
}

function createFloatingQ() {
    // Create container with styles
    const container = document.createElement('div');
    container.style.cssText = `
      width: 64px;
      height: 64px;
      background: white;
      position: relative;
      border-radius: 8px;
      overflow: hidden;
    `;
  
    // Create animation class
    class Circle {
      constructor(size) {
        this.element = document.createElement('div');
        this.element.style.cssText = `
          position: absolute;
          background: black;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          width: ${size}px;
          height: ${size}px;
        `;
        
        const PADDING = 10;
        this.x = PADDING + Math.random() * (100 - 2 * PADDING);
        this.y = PADDING + Math.random() * (100 - 2 * PADDING);
        this.dx = (Math.random() - 0.5) * 0.08;
        this.dy = (Math.random() - 0.5) * 0.08;
        
        this.updatePosition();
      }
  
      updatePosition() {
        this.element.style.left = this.x + '%';
        this.element.style.top = this.y + '%';
      }
    }
  
    // Animation controller
    const circles = [];
    let isForming = false;
    const PADDING = 10;
    let animationFrame;
    let formationInterval;
    let lastTime = performance.now();
  
    function getQPosition(index) {
      const qPositions = [
        { x: 50, y: 20 }, { x: 35, y: 25 }, { x: 25, y: 35 },
        { x: 20, y: 50 }, { x: 25, y: 65 }, { x: 35, y: 75 },
        { x: 50, y: 80 }, { x: 65, y: 75 }, { x: 75, y: 65 },
        { x: 80, y: 50 }, { x: 75, y: 35 }, { x: 65, y: 25 },
        { x: 65, y: 70 }, { x: 75, y: 75 }, { x: 85, y: 80 },
        { x: 40, y: 30 }, { x: 60, y: 30 }, { x: 40, y: 70 },
        { x: 60, y: 70 }, { x: 55, y: 65 }
      ];
      return qPositions[index] || { x: 50, y: 50 };
    }
  
    function animate(currentTime) {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
  
      circles.forEach((circle, index) => {
        if (isForming) {
          const target = getQPosition(index);
          circle.x += (target.x - circle.x) * 0.1;
          circle.y += (target.y - circle.y) * 0.1;
        } else {
          circle.x += circle.dx * deltaTime;
          circle.y += circle.dy * deltaTime;
  
          if (circle.x < PADDING || circle.x > (100 - PADDING)) {
            circle.dx = -circle.dx;
            circle.x = Math.max(PADDING, Math.min(100 - PADDING, circle.x));
          }
          if (circle.y < PADDING || circle.y > (100 - PADDING)) {
            circle.dy = -circle.dy;
            circle.y = Math.max(PADDING, Math.min(100 - PADDING, circle.y));
          }
  
          if (Math.random() < 0.001) {
            circle.dx = (Math.random() - 0.5) * 0.08;
            circle.dy = (Math.random() - 0.5) * 0.08;
          }
        }
        
        circle.updatePosition();
      });
  
      animationFrame = requestAnimationFrame(animate);
    }
  
    // Initialize circles
    const sizes = [3.5, 4, 4.5, 5];
    for (let i = 0; i < 20; i++) {
      const circle = new Circle(sizes[i % sizes.length]);
      container.appendChild(circle.element);
      circles.push(circle);
    }
  
    // Start animation
    animationFrame = requestAnimationFrame(animate);
    formationInterval = setInterval(() => {
      isForming = true;
      setTimeout(() => isForming = false, 1000);
    }, 4000);
  
    // Cleanup function
    function destroy() {
      cancelAnimationFrame(animationFrame);
      clearInterval(formationInterval);
      container.remove();
    }
  
    return { element: container, destroy };
  }