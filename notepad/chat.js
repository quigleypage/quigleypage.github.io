messageArray = [];
model = 7;

async function generateText(prompt) {
    messageArray[0] = {role: "system", content: "You are a helpful assistant that responds to user prompts based on the information in their notepad:\n\n" + generateNotesSummary()};

    document.getElementById("chatMessages").innerHTML += '<div class="chat-bubble sent">' + prompt.replaceAll("\n", "<br>") + '</div>';
    document.getElementById("chatMessages").innerHTML += '<div id="typingDots" class="chat-bubble received"><div class="typing"><div class="dot"></div><div class="dot"></div><div class="dot"></div><div></div>';
    messageArray.push({role: "user", content: prompt});
    document.getElementById("chatMessages").scrollTop = document.getElementById("chatMessages").scrollHeight;
    encodedMessageArray = { promptText: messageArray, version: model };
    console.log(encodedMessageArray);
    document.getElementById('messageInput').value = "";
    document.getElementById('chatSendButton').disabled = true;

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

        document.getElementById('typingDots').remove();
        document.getElementById("chatMessages").innerHTML += '<div class="chat-bubble received">' + botResponseCleaned + '</div>';

        document.getElementById('chatSendButton').disabled = false;


    } catch (error) {
        console.error(error);
        document.getElementById("chatMessages").innerHTML = "Error: " + error;
    }
}