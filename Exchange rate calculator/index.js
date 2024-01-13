let currency1 = document.getElementById("currency-one");
let currency2 = document.getElementById("currency-two");
let amount1 = document.getElementById("amount-one");
let swapButton = document.getElementById("swap");
let rateElem = document.getElementById("rate");

// only to display the result, no events added to it
amount2 = document.getElementById("amount-two");

//on every event that happens needs to calulate the value

function calculate() {
  fromcurrency = currency1.value;
  toCurrency = currency2.value;
  fetch(`https://open.exchangerate-api.com/v6/latest/${fromcurrency}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[toCurrency];
      amount2.value = (amount1.value * rate).toFixed(2);
      rateElem.innerText = `1 ${fromcurrency} is equal to ${rate} ${toCurrency}`;
    })
    .catch((error) => {
      console.error("Error fetching exchange rate:", error);
    });
}
// all events that are possible here, except swapping

currency1.addEventListener("change", calculate);
currency2.addEventListener("change", calculate);
amount1.addEventListener("input", calculate);

//swapping logic below
swapButton.addEventListener("click", function () {
  const temp = currency1.value;
  currency1.value = currency2.value;
  currency2.value = temp;
  //we should calculate after swapping the data
  calculate();
});
