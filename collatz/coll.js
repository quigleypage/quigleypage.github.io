var numArrary = [];
var currentNumber = Math.floor(Math.random() * 100001) + 1; // random number from 1 to 1 less than the number given
//Collatz(currentNumber);

function Collatz(cNum){
    document.getElementById("initialPrompt").style.display = "none";
    setTimeout(function(){

        if(cNum % 2 == 0){
            currentNumber = cNum/2;
        }
        else{
            currentNumber = (3*cNum) + 1;
        }
        console.log(currentNumber);
        numArrary.push(currentNumber);
        document.getElementById("number").innerHTML = currentNumber.toString();
        if(currentNumber > 1){
            Collatz(currentNumber);
        }
        else{
            document.getElementById("number").innerHTML = "This number took " + numArrary.length.toString() + " steps to complete!";
        }
    }, 250);
}