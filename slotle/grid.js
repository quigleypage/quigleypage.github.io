//declare global variables
var resultArray = [];
var todaysPlayCount = 0;
var todaysCredit = 6.00;
var bet = 0.5;

//load saved data
if(getCookie("slotle_gamesPlayed") != ""){
    var gamesPlayed = parseInt(getCookie("slotle_gamesPlayed"));
}
else{
    var gamesPlayed = 0;
}
document.getElementById("gamesPlayed").innerHTML = "<br>Played: " + gamesPlayed;

// slot functionality
(function () {
    //const items = ['🍭','❌','⛄️','🦄','🍌','👻','😻','💵','🤡','🦖','🍎','🔥','😭','😂','🥺','🤣','❤️','✨','🙏','🐃','7️⃣','💯','🐉','🔔','🍺','⭐','🦅','👑','🍀'];
    const items = ['🐃','7️⃣','💯','🐉','🔔','🍺','⭐','🦅','👑','🍀'];
    const doors = document.querySelectorAll('.door');
    
    document.querySelector('#spinner50').addEventListener('click', set50);
    document.querySelector('#spinner50').addEventListener('click', spin);
    document.querySelector('#spinner100').addEventListener('click', set100);
    document.querySelector('#spinner100').addEventListener('click', spin);
    document.querySelector('#spinner200').addEventListener('click', set200);
    document.querySelector('#spinner200').addEventListener('click', spin);
    document.querySelector('#spinner300').addEventListener('click', set300);
    document.querySelector('#spinner300').addEventListener('click', spin);
    document.querySelector('#spinner600').addEventListener('click', set600);
    document.querySelector('#spinner600').addEventListener('click', spin);
    //document.querySelector('#reseter').addEventListener('click', init);

    function set50(){
        bet = 0.5;
    }
    function set100(){
        bet = 1;
    }
    function set200(){
        bet = 2;
    }
    function set300(){
        bet = 3;
    }
    function set600(){
        bet = 6;
    }
  
    function init(firstInit = true, groups = 1, duration = 1) {
      for (const door of doors) {
        if (firstInit) {
          door.dataset.spinned = '0';
        } else if (door.dataset.spinned === '1') {
          return;
        }
  
        const boxes = door.querySelector('.boxes');
        const boxesClone = boxes.cloneNode(false);
        const pool = ['❓'];
  
        if (!firstInit) {
          const arr = [];
          for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
            arr.push(...items);
          }
          pool.push(...shuffle(arr));
          //console.log(pool[pool.length-1]); // this is where we can append the result - KEVIN LOOK AT THIS LINE OF CODE
          resultArray.push(pool[pool.length-1]); // add each result to arrary

          boxesClone.addEventListener(
            'transitionstart',
            function () {
              door.dataset.spinned = '1';
              this.querySelectorAll('.box').forEach((box) => {
                box.style.filter = 'blur(1px)';
              });
            },
            { once: true }
          );
  
          boxesClone.addEventListener(
            'transitionend',
            function () {
              this.querySelectorAll('.box').forEach((box, index) => {
                box.style.filter = 'blur(0)';
                if (index > 0) this.removeChild(box);
              });
            },
            { once: true }
          );
        }
  
        for (let i = pool.length - 1; i >= 0; i--) {
          const box = document.createElement('div');
          box.classList.add('box');
          box.style.width = door.clientWidth + 'px';
          box.style.height = door.clientHeight + 'px';
          box.textContent = pool[i];
          boxesClone.appendChild(box);
        }
        boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
        boxesClone.style.transform = `translateY(-${door.clientHeight * (pool.length - 1)}px)`;
        door.replaceChild(boxesClone, boxes);
      }
    }
    
    async function spin() {
        
        resultArray = []; // reset the results befor writing
        document.getElementById("box0").style.backgroundColor = "#FFFFFF";
        document.getElementById("box1").style.backgroundColor = "#FFFFFF";
        document.getElementById("box2").style.backgroundColor = "#FFFFFF";
        document.getElementById("box3").style.backgroundColor = "#FFFFFF";
        document.getElementById("box4").style.backgroundColor = "#FFFFFF";
        document.getElementById("spinner50").disabled = true; // disable the button while spinning so we do not click twice
        document.getElementById("spinner100").disabled = true;
        document.getElementById("spinner200").disabled = true;
        document.getElementById("spinner300").disabled = true;
        document.getElementById("spinner600").disabled = true;
        
        init(); // run this extra call of init() instead of using the reset button

        init(false, 1, 2);

        //Beginning of spin variable updates
        todaysCredit -= bet;
        document.getElementById("credit").innerHTML = "CREDIT: $" + todaysCredit.toFixed(2).toString();
        
        for (const door of doors) {
            const boxes = door.querySelector('.boxes');
            const duration = parseInt(boxes.style.transitionDuration);
            boxes.style.transform = 'translateY(0)';
            await new Promise((resolve) => setTimeout(resolve, duration * 100));
        }
        
        //update saved statistics
        gamesPlayed += 1; // # games played
        setCookie("slotle_gamesPlayed", gamesPlayed.toString());
        document.getElementById("gamesPlayed").innerHTML = "<br>Played: " + gamesPlayed;

        postSpinUpdates();
    }
  
    function shuffle([...arr]) {
      let m = arr.length;
      while (m) {
        const i = Math.floor(Math.random() * m--);
        [arr[m], arr[i]] = [arr[i], arr[m]];
      }
      return arr;
    }

    function postSpinUpdates(){

        setTimeout(function(){ // use set timeout to add an artificial delay that causes the ui to pause until after the spin - NOT GOOD BUT WORKS

            for(var checki = 0; checki < resultArray.length; checki++){ // go through each box and compare it to each other box. if it has a match, turn both green
                for(var checkj = 0; checkj < resultArray.length; checkj++){ // THIS SHOULD BE REPLACED BY WIN CONDITIONS AND PAYOUT LOGIC
                    if(checki != checkj){
                        if(resultArray[checki] == resultArray[checkj]){
                            document.getElementById("box"+checki.toString()).style.backgroundColor = "#A6ECA8";
                            document.getElementById("box"+checkj.toString()).style.backgroundColor = "#A6ECA8";
                            todaysCredit += (0.5*bet); // pay out 25c as a test
                            document.getElementById("credit").innerHTML = "CREDIT: $" + todaysCredit.toFixed(2).toString();
                        }
                    }
                }
            }

            if(todaysCredit >=0.5){ // if the player has enough credit left for another spin, then reenable the button
                document.getElementById("spinner50").disabled = false;
            }
            if(todaysCredit >= 1){
                document.getElementById("spinner100").disabled = false;
            }
            if(todaysCredit >= 2){
                document.getElementById("spinner200").disabled = false;
            }
            if(todaysCredit >= 3){
                document.getElementById("spinner300").disabled = false;
            }
            if(todaysCredit >= 6){
                document.getElementById("spinner600").disabled = false;
            }

            console.log(resultArray); // show results after completing spin

        }, 1800);
    }
  
    init();
  })();


// MODAL HANDLING --------------------------------------------------------------------
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
}

//SECOND MODAL  
var modal2 = document.getElementById("myModal2");
var btn2 = document.getElementById("myBtn2");
var span2 = document.getElementsByClassName("close")[1];
btn2.onclick = function() {
  modal2.style.display = "block";
}
span2.onclick = function() {
  modal2.style.display = "none";
}
//-------------------------------------------------------------------------------------------------

//COOKIE FUNCTIONS
function setCookie(cname, cvalue) {
    var exdays = 36525;
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

//SHARE BUTTON FUNCTION
function generateEmojiShare(){
    var emojiString = "Check out my SLOTLE stats:\n\nPlayed: " + gamesPlayed.toString() + "\nWon: " + gamesWon.toString() + " (" + Math.round((gamesWon/gamesPlayed)*100).toString() + "%)\nAverage Guesses: " + (sumOfWonGuesses / gamesWon).toFixed(1).toString() + "\n\n";
    var shareLink = "https://quigley.page/slotle/";
    for(var w = 0; w < guessArray.length; w++){
        if(document.getElementById(w).style.background == "rgb(166, 236, 168)"){
            emojiString += "🟩";
        }
        else if(document.getElementById(w).style.background == "rgb(234, 228, 166)"){
            emojiString += "🟨";
        }
        else{
            emojiString += "⬜";
        }

        if((w+1)%wordLength == 0){
            emojiString += "\n";
        }
    }
    console.log(emojiString);
    const shareData = {
        title: 'slotle',
        text: emojiString,
        url: shareLink
    }
    navigator.share(shareData);
}