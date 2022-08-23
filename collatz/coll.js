var numArrary = [];
var currentNumber = Math.floor(Math.random() * 100001) + 1; // random number from 1 to 1 less than the number given
var xdata = [];
var ydata = [];
//Collatz(currentNumber);

var autoMode = 0;
if(autoMode ==1){

    //run automatically within desired range
    for(var i = 10000000; i < 11000000; i++){
        numArrary = [];
        Collatz2(i);
        xdata.push(i);
        ydata.push(numArrary.length);
        //console.log(i.toString() + ": " + numArrary.length.toString());
    }
    //force delay to let page load and then graph
    setTimeout(function(){

        var trace1 = {
            x: xdata,
            y: ydata,
            type: 'scatter'
        };
        
        var data = [trace1];
        
        Plotly.newPlot('lineGraph', data);

    }, 100);
    console.log("Range Min: " + Math.min(...ydata).toString());
    console.log("Range Max: " + Math.max(...ydata).toString());

}



function Collatz(cNum){
    document.getElementById("initialPrompt").style.display = "none";
    setTimeout(function(){

        if(cNum % 2 == 0){
            currentNumber = cNum/2;
        }
        else{
            currentNumber = (3*cNum) + 1;
        }
        //console.log(currentNumber);
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

//duplicate function for running pure logic
function Collatz2(cNum){
   
    if(cNum % 2 == 0){
        currentNumber = cNum/2;
    }
    else{
        currentNumber = (3*cNum) + 1;
    }
    numArrary.push(currentNumber);
    if(currentNumber > 1){
        Collatz2(currentNumber);
    }

}