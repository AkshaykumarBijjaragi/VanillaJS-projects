const balance = document.getElementById("balance"),
  moneyPlus = document.getElementById("money-plus"),
  moneyMinus = document.getElementById("money-minus"),
  list = document.getElementById("list"),
  form = document.getElementById("form"),
  text = document.getElementById("text"),
  amount = document.getElementById("amount");

const dummyData = [
  { id: 1, text: "flower", amount: -20 },
  { id: 1, text: "salt", amount: 20 },
  { id: 1, text: "powder", amount: -20 },
  { id: 1, text: "pen", amount: 820 },
];

let alltransactions = dummyData;

//new transaction data handling
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("enter both text and amount");
  } else {
    let newTransaction = {
      id: Math.floor(Math.random() * 100000),
      text: text.value,
      amount: +amount.value,
    };
    console.log(newTransaction, alltransactions);
    alltransactions.push(newTransaction);
    updateMoney();
    addTransactionDom(newTransaction);
  }
}

//update balance, income and expense
function updateMoney() {
  let amounts = alltransactions.map((item) => item.amount);

  let balanceamt = amounts.reduce((acc, num) => (acc += num), 0);

  let income = amounts
    .filter((item) => item > 0)
    .reduce((acc, num) => (acc += num), 0);
  let expense = amounts
    .filter((item) => item < 0)
    .reduce((acc, num) => (acc += num), 0);
  balance.innerText = `$${balanceamt}`;
  moneyPlus.innerText = `$${income}`;
  moneyMinus.innerText = `$${expense}`;
}

// add transaction to DOM list
function addTransactionDom(transaction) {
  // get sign
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
  ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>  
  <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
  `;

  list.appendChild(item);
}

//event listeners
form.addEventListener("submit", addTransaction);

//init app
function init() {
  list.innerHTML = ``;
  // pass reference of addTransactionDom function but not with arguments which invokes function immediately
  alltransactions.forEach(addTransactionDom);
  updateMoney();
}

init();
