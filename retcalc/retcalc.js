ticketPrice = 0;
discount = 0;
tax = 0;
salePrice = 0;
fees = 0;
shipping = 0;
returnValue = 0;
profitMargin = 0;

function recalculate(){

    ticketPrice = document.getElementById("TicketPrice").value;
    discount = document.getElementById("Discount").value/100;
    if(document.getElementById("tax").checked){
        tax = 0.06625;
    }
    else{
        tax = 0;
    }
    salePrice = document.getElementById("SalePrice").value;
    fees = document.getElementById("Fees").value;
    shipping = document.getElementById("Shipping").value;
    
    totalPurchase = ticketPrice * (1-discount) * (1+tax);

    returnValue = salePrice - totalPurchase - shipping - fees;
    profitMargin = (returnValue / salePrice)*100;

    document.getElementById("ProjectedReturn").innerHTML = "Estimated Return: $" + returnValue.toFixed(2);
    document.getElementById("ProjectedMargin").innerHTML = "Estimated Margin: " + profitMargin.toFixed(2) + "%";
}