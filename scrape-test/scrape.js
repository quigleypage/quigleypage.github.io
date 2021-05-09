var start_date = "2021-04-05";
var end_date = "2021-04-30";

function myFunction(){
    console.log("starting");
    const Url='https://www.quandl.com/api/v3/datasets/NASDAQOMX/NDX.json?api_key=ArL3Yxb56UzAinZoBk_k&order=asc&start_date=' + start_date + "&end_date=" + end_date;
    $.ajax({
        url: Url,
        type:"GET",
        beforeSend: function(){
            console.log(Url)
        },
        success: function(responseText){
            console.log(responseText);
            console.log(responseText.dataset.data[0][0]);
            console.log(responseText.dataset.data[0][1]);
            graphData(responseText);
        },
        error:function(error){
            console.log("Error")
        }
    })
}

function graphData(responseText){

    var tradeDates = [];
    var indexValues = [];

    for(var i = 0; i < responseText.dataset.data.length; i++){
        tradeDates.push(responseText.dataset.data[i][0]);
        indexValues.push(responseText.dataset.data[i][1]);
    }

    var trace1 = {
        x: tradeDates,
        y: indexValues,
        type: 'scatter'
    };

    var configTrend = {
        modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'resetScale2d', 'hoverClosestGl2d', 'hoverClosestPie','toggleHover', 'resetViews', 'sendDataToCloud', 'toggleSpikelines', 'resetViewMapbox','hoverClosestCartesian', 'hoverCompareCartesian'], 
        displaylogo: false,
        responsive: true
    };

    var layout = {

    }
        
    var data = [trace1];
        
    Plotly.newPlot('myDiv', data, layout, configTrend);
}