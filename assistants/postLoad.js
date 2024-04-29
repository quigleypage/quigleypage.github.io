const urlParams = new URL(window.location.toLocaleString()).searchParams;
if(urlParams.get('n') != null){
    botName = decrypt(urlParams.get('n'));
    document.getElementById('assistantName').innerHTML = botName;
    transcriptText += botName + "\n";
    document.title = "Q - " + botName;
   // hitxt = botName;
    //typeWriter();
}
transcriptText += "====================\n-------\n\n";
if(urlParams.get('m') != null)
    model = parseInt(urlParams.get('m'));
if(urlParams.get('i') != null){
    botIntroText = decrypt(urlParams.get('i'));
    //document.getElementById('introText').innerHTML = "<br><br><br>" + decrypt(urlParams.get('i'));
    hitxt = botIntroText;
    typeWriter();
}
if(urlParams.get('p') != null)
    messageArray.push({role: "system", content: decrypt(urlParams.get('p'))});
if(urlParams.get('s') != null){
    rawSuggestedPromptList = decrypt(urlParams.get('s'));
    suggestedPromptArray = rawSuggestedPromptList.split(';');
    for(var i = 0; i < suggestedPromptArray.length; i++){
        if(i!=0)
            document.getElementById('suggestedThemes').innerHTML += "<br>";
        document.getElementById('suggestedThemes').innerHTML += '<button class="q-suggested-themes" onclick="updateMessageBox(\'' + suggestedPromptArray[i] + '\')"><b>' + suggestedPromptArray[i] + '</b></button>';
    }
}