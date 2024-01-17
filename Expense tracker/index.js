// DOM elements
const balance = document.getElementById("balance"),
  moneyPlus = document.getElementById("money-plus"),
  moneyMinus = document.getElementById("money-minus"),
  list = document.getElementById("list"),
  form = document.getElementById("form"),
  text = document.getElementById("text"),
  amount = document.getElementById("amount");

// Retrieve saved transactions from localStorage or initialize an empty array
let savedTransactions = JSON.parse(localStorage.getItem("transactions"));
let alltransactions = savedTransactions !== null ? savedTransactions : [];

// Function to update transactions in localStorage
function updateLocalStorage(currentVal) {
  localStorage.setItem("transactions", JSON.stringify(currentVal));
}

// Function to generate a random ID
function generateRandomId() {
  return Math.floor(Math.random() * 1000000000);
}

// Event handler for adding a new transaction
function addTransaction(e) {
  e.preventDefault();
  // Check if both text and amount are provided
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Enter both text and amount");
  } else {
    // Create a new transaction object
    const newTransaction = {
      id: generateRandomId(),
      text: text.value,
      amount: +amount.value,
    };
    // Add the new transaction to the array
    alltransactions.push(newTransaction);
    // Update UI and localStorage
    updateMoney();
    addTransactionDom(newTransaction);
    text.value = "";
    amount.value = "";
    updateLocalStorage(alltransactions);
  }
}

// Function to update balance, income, and expense in the UI
function updateMoney() {
  const amounts = alltransactions.map((item) => item.amount);
  const balanceAmt = amounts.reduce((acc, num) => (acc += num), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, num) => (acc += num), 0)
    .toFixed(2);
  const expense = amounts
    .filter((item) => item < 0)
    .reduce((acc, num) => (acc += num), 0)
    .toFixed(2);

  // Update UI elements with calculated values
  balance.innerText = `$${balanceAmt}`;
  moneyPlus.innerText = `$${income}`;
  moneyMinus.innerText = `$${expense}`;
}

// Function to add a transaction to the DOM list
function addTransactionDom(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  // Create a new list item for the transaction
  const item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  // Populate the list item with transaction details
  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>  
    <button class="delete-btn" onclick="removeTransaction(${
      transaction.id
    })">x</button>
  `;

  // Append the list item to the transaction list
  list.appendChild(item);
}

// Event handler for removing a transaction
function removeTransaction(id) {
  // Filter out the transaction with the specified ID
  alltransactions = alltransactions.filter((item) => item.id !== id);
  // Update localStorage and refresh the UI
  updateLocalStorage(alltransactions);
  init();
}

// Function to initialize the application
function init() {
  // Clear the transaction list
  list.innerHTML = ``;
  // Add each transaction to the DOM
  alltransactions.forEach(addTransactionDom);
  // Update the UI with current balance, income, and expense
  updateMoney();
}

// Event listener for form submission
form.addEventListener("submit", addTransaction);

// Initialize the application
init();
