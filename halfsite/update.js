function updateSite(){
    document.getElementById("site").innerHTML = document.getElementById("HTML").value;
    document.getElementById("siteStyle").innerHTML = document.getElementById("CSS").value;
    document.getElementById("siteScript").innerHTML = document.getElementById("JS").value;
}

function showHTML(){
    document.getElementById("div-HTML").style.gridColumn = "1/12";
    document.getElementById("div-HTML").style.display = "grid";
    document.getElementById("div-CSS").style.display = "none";
    document.getElementById("div-JS").style.display = "none";
}

function showCSS(){
    document.getElementById("div-CSS").style.gridColumn = "1/12";
    document.getElementById("div-CSS").style.display = "grid";
    document.getElementById("div-HTML").style.display = "none";
    document.getElementById("div-JS").style.display = "none";
}

function showJS(){
    document.getElementById("div-JS").style.gridColumn = "1/12";
    document.getElementById("div-JS").style.display = "grid";
    document.getElementById("div-CSS").style.display = "none";
    document.getElementById("div-HTML").style.display = "none";
}

function showAll(){
    document.getElementById("div-HTML").style.gridColumn = "1/5";
    document.getElementById("div-CSS").style.gridColumn = "5/8";
    document.getElementById("div-JS").style.gridColumn = "8/12";
    document.getElementById("div-JS").style.display = "grid";
    document.getElementById("div-CSS").style.display = "grid";
    document.getElementById("div-HTML").style.display = "grid";
}