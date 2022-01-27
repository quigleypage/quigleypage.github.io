var target = 0;
var activeColor = "rgb(127, 201, 255)";
var inactiveColor = "rgb(241, 241, 241)";
var activeArray = [];

function loadBoard(loadSize){
    
    var size = loadSize;

    //reset board in case there is previous data
    document.getElementById("boardSpace").innerHTML = "";
    document.getElementById("currentExpression").innerHTML = "<br>";
    document.getElementById("currentExpression").style.color = "black";
    document.getElementById("targetNumber").style.color = "black";
    activeArray = [];

    //generate the grid
    for(var i = 1; i <= size; i++){
        document.getElementById("boardSpace").innerHTML += '<div class="square" id="' + i.toString() + '" onclick="testLog(id)"><div class="content"><div class="table"><div class="table-cell">' + i.toString() + '</div></div></div></div>';
    }

    if(size == 9)
    {
        var elements = document.querySelectorAll('.square');
        for(var k=0; k<elements.length; k++){
            elements[k].style.width = "30%";
            elements[k].style.paddingBottom = "30%";
            elements[k].style.margin = "1.66%";
        }
    }
    else if(size == 25){
        var elements = document.querySelectorAll('.square');
        for(var k=0; k<elements.length; k++){
            elements[k].style.width = "18%";
            elements[k].style.paddingBottom = "18%";
            elements[k].style.margin = "1%";
        }
    }

    //calculate target
    var int1 = 1 + Math.floor(Math.random() * (size));
    var int2 = int1;
    while(int2 == int1){
        int2 = 1 + Math.floor(Math.random() * (size));
    }
    var int3 = int2;
    while(int3 == int2 || int3 == int1){
        int3 = 1 + Math.floor(Math.random() * (size));
    }
    var int4 = int3;
    while(int4 == int3 || int4 == int2 || int4 == int1){
        int4 = 1 + Math.floor(Math.random() * (size));
    }
    target = int1 * int2 * int3 * int4;
    console.log(target.toString() + " = " + int1.toString() + " x " + int2.toString() + " x " + int3.toString() + " x " + int4.toString());
    document.getElementById("targetNumber").innerHTML = target.toString();
}

// let the user create an expression
function testLog(testID){

    //add the new digit
    if((document.getElementById(testID).style.background == inactiveColor || document.getElementById(testID).style.background == "") && activeArray.length < 4){
        document.getElementById(testID).style.background = activeColor;
        activeArray.push(testID);
    }
    else if (activeArray.length < 4){ //remove the digit
        document.getElementById(testID).style.background = inactiveColor;
        const index = activeArray.indexOf(testID);
        if (index > -1) {
            activeArray.splice(index, 1);
        }
    }
   
    //show current progress
    var currentProduct = 0;
    if(activeArray.length == 0){
        document.getElementById("currentExpression").innerHTML = "<br>";
    }
    else{ // calculate current product
        currentProduct = activeArray[0];
        document.getElementById("currentExpression").innerHTML = activeArray[0].toString() + "*";
        for(var j = 1; j < activeArray.length; j++){
            currentProduct *= activeArray[j];
            if(j < 3){
                document.getElementById("currentExpression").innerHTML += activeArray[j].toString() + "*";
            }
            else{
                document.getElementById("currentExpression").innerHTML += activeArray[j].toString() + " = " + currentProduct.toString();
                if(currentProduct == target){
                    document.getElementById("currentExpression").style.color = "green";
                    document.getElementById("targetNumber").style.color = "green";
                }
                else{
                    document.getElementById("currentExpression").style.color = "red";
                    document.getElementById("targetNumber").style.color = "red";
                }
            }
        }

    }

}


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


var modal2 = document.getElementById("myModal2");
var btn2 = document.getElementById("myBtn2");
var span2 = document.getElementsByClassName("close")[1];
btn2.onclick = function() {
  modal2.style.display = "block";
}
span2.onclick = function() {
  modal2.style.display = "none";
}