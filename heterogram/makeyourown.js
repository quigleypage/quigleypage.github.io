function encryptMakeYourOwn (unencryptedTerm) {
    var encryptedResult = "";
    for(var u = 0; u < unencryptedTerm.length; u++){
        if(unencryptedTerm[u] == "a"){encryptedResult+="97";}
        else if(unencryptedTerm[u] == "b"){encryptedResult+="94";}
        else if(unencryptedTerm[u] == "c"){encryptedResult+="86";}
        else if(unencryptedTerm[u] == "d"){encryptedResult+="82";}
        else if(unencryptedTerm[u] == "e"){encryptedResult+="79";}
        else if(unencryptedTerm[u] == "f"){encryptedResult+="71";}
        else if(unencryptedTerm[u] == "g"){encryptedResult+="68";}
        else if(unencryptedTerm[u] == "h"){encryptedResult+="64";}
        else if(unencryptedTerm[u] == "i"){encryptedResult+="62";}
        else if(unencryptedTerm[u] == "j"){encryptedResult+="59";}
        else if(unencryptedTerm[u] == "k"){encryptedResult+="57";}
        else if(unencryptedTerm[u] == "l"){encryptedResult+="53";}
        else if(unencryptedTerm[u] == "m"){encryptedResult+="48";}
        else if(unencryptedTerm[u] == "n"){encryptedResult+="47";}
        else if(unencryptedTerm[u] == "o"){encryptedResult+="43";}
        else if(unencryptedTerm[u] == "p"){encryptedResult+="41";}
        else if(unencryptedTerm[u] == "q"){encryptedResult+="39";}
        else if(unencryptedTerm[u] == "r"){encryptedResult+="37";}
        else if(unencryptedTerm[u] == "s"){encryptedResult+="34";}
        else if(unencryptedTerm[u] == "t"){encryptedResult+="30";}
        else if(unencryptedTerm[u] == "u"){encryptedResult+="29";}
        else if(unencryptedTerm[u] == "v"){encryptedResult+="27";}
        else if(unencryptedTerm[u] == "w"){encryptedResult+="22";}
        else if(unencryptedTerm[u] == "x"){encryptedResult+="19";}
        else if(unencryptedTerm[u] == "y"){encryptedResult+="17";}
        else if(unencryptedTerm[u] == "z"){encryptedResult+="13";}
    }
    encryptedResult = parseInt(encryptedResult);
    encryptedResult *= 7;
    encryptedResult += 2622;
    encryptedResult = encryptedResult.toString();
    return encryptedResult;
}

function decryptMakeYourOwn (encryptedTerm) {
    var encryptedString = encryptedTerm;
    var decryptedResult = "";
    encryptedString = parseInt(encryptedString);
    encryptedString -= 2622;
    encryptedString /= 7;
    encryptedString = encryptedString.toString();
    for(var e = 0; e < encryptedString.length; e+=2){
        if(encryptedString[e]+encryptedString[e+1] == "97"){decryptedResult+="a";}
        else if(encryptedString[e]+encryptedString[e+1] == "94"){decryptedResult+="b";}
        else if(encryptedString[e]+encryptedString[e+1] == "86"){decryptedResult+="c";}
        else if(encryptedString[e]+encryptedString[e+1] == "82"){decryptedResult+="d";}
        else if(encryptedString[e]+encryptedString[e+1] == "79"){decryptedResult+="e";}
        else if(encryptedString[e]+encryptedString[e+1] == "71"){decryptedResult+="f";}
        else if(encryptedString[e]+encryptedString[e+1] == "68"){decryptedResult+="g";}
        else if(encryptedString[e]+encryptedString[e+1] == "64"){decryptedResult+="h";}
        else if(encryptedString[e]+encryptedString[e+1] == "62"){decryptedResult+="i";}
        else if(encryptedString[e]+encryptedString[e+1] == "59"){decryptedResult+="j";}
        else if(encryptedString[e]+encryptedString[e+1] == "57"){decryptedResult+="k";}
        else if(encryptedString[e]+encryptedString[e+1] == "53"){decryptedResult+="l";}
        else if(encryptedString[e]+encryptedString[e+1] == "48"){decryptedResult+="m";}
        else if(encryptedString[e]+encryptedString[e+1] == "47"){decryptedResult+="n";}
        else if(encryptedString[e]+encryptedString[e+1] == "43"){decryptedResult+="o";}
        else if(encryptedString[e]+encryptedString[e+1] == "41"){decryptedResult+="p";}
        else if(encryptedString[e]+encryptedString[e+1] == "39"){decryptedResult+="q";}
        else if(encryptedString[e]+encryptedString[e+1] == "37"){decryptedResult+="r";}
        else if(encryptedString[e]+encryptedString[e+1] == "34"){decryptedResult+="s";}
        else if(encryptedString[e]+encryptedString[e+1] == "30"){decryptedResult+="t";}
        else if(encryptedString[e]+encryptedString[e+1] == "29"){decryptedResult+="u";}
        else if(encryptedString[e]+encryptedString[e+1] == "27"){decryptedResult+="v";}
        else if(encryptedString[e]+encryptedString[e+1] == "22"){decryptedResult+="w";}
        else if(encryptedString[e]+encryptedString[e+1] == "19"){decryptedResult+="x";}
        else if(encryptedString[e]+encryptedString[e+1] == "17"){decryptedResult+="y";}
        else if(encryptedString[e]+encryptedString[e+1] == "13"){decryptedResult+="z";}
    }
    return decryptedResult;
}