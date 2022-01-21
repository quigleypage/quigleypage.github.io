//generate the grid
var size = 16;
for(var i = 0; i < size; i++){
    document.getElementById("boardSpace").innerHTML += '<div class="square" id="' + i.toString() + '" onclick="testLog(id)"><div class="content"><div class="table"><div class="table-cell">' + i.toString() + '</div></div></div></div>';
}

//calculate target
var int1 = Math.floor(Math.random() * size);
var int2 = int1;
while(int2 == int1){
    int2 = Math.floor(Math.random() * size);
}
var int3 = int2;
while(int3 == int2 || int3 == int1){
    int3 = Math.floor(Math.random() * size);
}
var int4 = int3;
while(int4 == int3 || int4 == int2 || int4 == int1){
    int4 = Math.floor(Math.random() * size);
}
var target = int1 * int2 * int3 * int4;
console.log(target.toString() + " = " + int1.toString() + " x " + int2.toString() + " x " + int3.toString() + " x " + int4.toString());
document.getElementById("targetNumber").innerHTML = target.toString();

// let the user create an expression
var activeColor = "rgb(127, 201, 255)";
var inactiveColor = "rgb(241, 241, 241)";
var activeArray = [];
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