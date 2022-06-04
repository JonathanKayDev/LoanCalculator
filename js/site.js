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

    // if valid input, calculate loan payments and display
    if (validateInput(loanValue, monthsValue, rateValue)) {
        let results = getPayments(loanValue, rateValue, monthsValue);
        displayResults(results);
    }
}


// LOGIC FUNCTION(S)
function getPayments(amount, rate, term) {
    let loanPaymentObj = {};
    loanPaymentObj.Payments = [];
    loanPaymentObj.Payment = calcPayment(amount, rate, term);

    // first month
    let balance = amount;
    let totalInterest = 0.0;
    let monthlyInterest = 0.0;
    let monthlyPrincipal = 0.0;
    let monthlyRate = calcMonthlyRate(rate);

    // loop over each month until term of loan
    for (let index = 1; index <= term; index++) {
        monthlyInterest = calcMonthlyInterest(balance, monthlyRate);
        totalInterest += monthlyInterest;
        monthlyPrincipal = loanPaymentObj.Payment - monthlyInterest;
        balance -= monthlyPrincipal;

        let paymentObj = {};

        paymentObj.Month = index;
        paymentObj.Payment = loanPaymentObj.Payment;
        paymentObj.MonthlyPrincipal = monthlyPrincipal;
        paymentObj.MonthlyInterest = monthlyInterest;
        paymentObj.TotalInterest = totalInterest;
        paymentObj.Balance = balance;
        
        loanPaymentObj.Payments.push(paymentObj);
    }

    loanPaymentObj.TotalInterest = totalInterest;
    loanPaymentObj.TotalCost = amount + totalInterest;
    loanPaymentObj.Amount = amount;

    return loanPaymentObj;
}

function calcPayment(amount, rate, term) {
    let monthlyRate = calcMonthlyRate(rate);
    
    let payment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));

    return payment;
}

function calcMonthlyRate(rate) {
    return rate/1200;
}

function calcMonthlyInterest(balance, monthlyRate) {
    return balance * monthlyRate;
}

function validateInput(loanValue, monthsValue, rateValue) {
    let output = true;

    // months is integer
    if (!Number.isInteger(monthsValue)) {
        alert("Term length (months) must be an integer!")
        output = false;
    }

    // check values are greater than 0
    if (loanValue <= 0 || monthsValue <= 0 || rateValue <= 0) {
        alert("You must enter a value greater than 0!")
        output = false;
    }

    // check loan upper limit
    if (loanValue > 1000000) {
        alert("Maximum loan value is £1,000,000")
        output = false;
    }

    // check months upper limit
    if (monthsValue > 600) {
        alert("Maximum term length is 600 months")
        output = false;
    }

    // check rate upper limit
    if (rateValue > 100) {
        alert("Maximum rate is 100%")
        output = false;
    }

    return output;
}


// VIEW FUNCTION(S)
function displayResults(results) {
    // display results overview
    let monthlyPayments = document.getElementById("monthlyPaymentsValue");
    let totalPrincipal = document.getElementById("totalPrincipalValue");
    let totalInterest = document.getElementById("totalInterestValue");
    let totalCost = document.getElementById("totalCostValue");

    monthlyPayments.innerHTML = results.Payment.toLocaleString('en-UK', { style: 'currency', currency: 'GBP' });
    totalPrincipal.innerHTML = results.Amount.toLocaleString('en-UK', { style: 'currency', currency: 'GBP' });
    totalInterest.innerHTML = results.TotalInterest.toLocaleString('en-UK', { style: 'currency', currency: 'GBP' });
    totalCost.innerHTML = results.TotalCost.toLocaleString('en-UK', { style: 'currency', currency: 'GBP' });

    //TABLE
    // get the table body element from the page
    let tableBody = document.getElementById("results");
    // get the template row
    let templateRow = document.getElementById("loanTemplate");
    // clear the table first
    tableBody.innerHTML="";

    results.Payments.forEach(element => {
        let tableRow = document.importNode(templateRow.content, true);
        let rowCols = tableRow.querySelectorAll("td");

        rowCols[0].textContent = element.Month;
        rowCols[1].textContent = element.Payment.toLocaleString('en-UK', { style: 'currency', currency: 'GBP' });
        rowCols[2].textContent = element.MonthlyPrincipal.toLocaleString('en-UK', { style: 'currency', currency: 'GBP' });
        rowCols[3].textContent = element.MonthlyInterest.toLocaleString('en-UK', { style: 'currency', currency: 'GBP' });
        rowCols[4].textContent = element.TotalInterest.toLocaleString('en-UK', { style: 'currency', currency: 'GBP' });
        rowCols[5].textContent = element.Balance.toLocaleString('en-UK', { style: 'currency', currency: 'GBP' });

        tableBody.appendChild(tableRow);
    });
}