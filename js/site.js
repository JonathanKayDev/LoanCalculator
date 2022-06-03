// CONTROLLER FUNCTION(S)
// Get UI values
function getValues() {
    let loanValue = document.getElementById("loanValue").value;
    let monthsValue = document.getElementById("monthsValue").value;
    let rateValue = document.getElementById("rateValue").value;

    // convert to Numbers
    loanValue = Number(loanValue);
    monthsValue = Number(monthsValue);
    rateValue = Number(rateValue);


}



// LOGIC FUNCTION(S)


function calcPayment(amount, rate, term) {
    let monthlyRate = calcMonthlyRate(rate);
    
    let payment = (amount * rate) / (1 - Math.pow(1 + rate, -term));

    return payment;
}

function calcMonthlyRate(rate){
    return rate/1200;
}

function calcMonthlyInterest(balance, monthlyRate) {
    return balance * monthlyRate;
}



// VIEW FUNCTION(S)