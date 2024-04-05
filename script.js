
    const amountInput = document.getElementById("amount");
    const oweInput = document.getElementById("oweCurrency");
    const paidInput = document.getElementById("paidCurrency");
    const fromSelect = document.getElementById("from");
    const toSelect = document.getElementById("to");
    const resultDiv = document.getElementById("result");
    const result2Div = document.getElementById("result2");
    const oweSelect = document.getElementById("owe");
    const paidSelect = document.getElementById("paid");
    const missingSelect = document.getElementById("missing");

    // Fetch currency data and populate select options
    async function populateSelectOptions() {
        try {
            const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
            const data = await response.json();
            
            const currencies = Object.keys(data.rates);
            
            currencies.forEach(currency => {
                const optionFrom = document.createElement("option");
                optionFrom.textContent = currency;
                optionFrom.value = currency;
                fromSelect.append(optionFrom);
    
                const optionTo = document.createElement("option");
                optionTo.textContent = currency;
                optionTo.value = currency;
                toSelect.append(optionTo);

                const optionOwe = document.createElement("option");
                optionOwe.textContent = currency;
                optionOwe.value = currency;
                oweSelect.append(optionOwe);
    
                const optionPaid = document.createElement("option");
                optionPaid.textContent = currency;
                optionPaid.value = currency;
                paidSelect.append(optionPaid);

                const optionMiss = document.createElement("option");
                optionMiss.textContent = currency;
                optionMiss.value = currency;
                missingSelect.append(optionMiss);
            });
        } catch (error) {
            console.error(error);
        }
    }
    
    populateSelectOptions();

// Function to convert currency
async function convertCurrency() {
    // Get the amount, fromCurrency, and toCurrency from user input
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromSelect.value;
    const toCurrency = toSelect.value;

    // Fetch conversion rate from an API
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        
        // Extract conversion rate for the target currency
        const conversionRate = data.rates[toCurrency];
        
        // Calculate the result
        const result = amount * conversionRate;
        
        // Display the result
        resultDiv.textContent = `${amount} ${fromCurrency} é ${result.toFixed(2)} ${toCurrency}`;
    } catch (error) {
        // Handle any errors that occur during the API call
        console.error(error);
    }
}

convertButton.addEventListener("click", convertCurrency);


async function calCurrency() {
    const owe = parseFloat(oweInput.value);
    const paid = parseFloat(paidInput.value);
    const oweCurrency = oweSelect.value;
    const paidCurrency = paidSelect.value;
    const missingCurrency = missingSelect.value;

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${oweCurrency}`);
        const data = await response.json();

        //convert paid currency to owe currency
        const conversionRate1 = data.rates[paidCurrency];

        const convert1 = paid / conversionRate1;

        //calculate missing amount
        preresult= owe-convert1;

        //convert missing amount to selected currency
        const conversionRate2 = data.rates[missingCurrency];

        result3=preresult*conversionRate2;


        result2Div.textContent = ` Ainda falta pagar ${result3.toFixed(2)} ${missingCurrency}`;


    }

    catch (error) {
        // Handle any errors that occur during the API call
        console.error(error);
    }








}




