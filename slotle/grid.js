//declare global variables
var resultArray = [];
var todaysPlayCount = 0;
var todaysCredit = 6.00;

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
    const items = ['🍭','❌','⛄️','🦄','🍌','👻','😻','💵','🤡','🦖','🍎','🔥','😭','😂','🥺','🤣','❤️','✨','🙏','🐃','7️⃣','💯','🐉','🔔','🍺','⭐'];
    const doors = document.querySelectorAll('.door');
    
    document.querySelector('#spinner').addEventListener('click', spin);
    document.querySelector('#reseter').addEventListener('click', init);
  
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
          console.log(pool[pool.length-1]); // this is where we can append the result - KEVIN LOOK AT THIS LINE OF CODE

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
      init(false, 1, 2);

      //Beginning of spin variable updates
      todaysCredit -= 0.5;
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

    }
  
    function shuffle([...arr]) {
      let m = arr.length;
      while (m) {
        const i = Math.floor(Math.random() * m--);
        [arr[m], arr[i]] = [arr[i], arr[m]];
      }
      return arr;
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