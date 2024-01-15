const mainTable = document.getElementById("main");

//all buttons
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const sortNameBtn = document.getElementById("sortName");
const wealthBtn = document.getElementById("calculate-wealth");

let data = [];
let totalWealthClicked = false;

//format the money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//add users to database
function addUser(user) {
  data.push(user);
  updateUI();
}

//loading UI from data
function updateUI(providedData = data) {
  mainTable.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;
  providedData.forEach((item) => {
    const elem = document.createElement("div");
    elem.classList.add("person");
    elem.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    mainTable.appendChild(elem);
  });
  if (data && totalWealthClicked) {
    calculateSum();
  }
}

//request to API to generate random user
async function generateUser() {
  try {
    const res = await fetch("https://randomuser.me/api");

    if (!res.ok) {
      throw new Error(`Error fetching user data. Status: ${res.status}`);
    }

    const userData = await res.json();
    const user = userData.results[0];

    const newUser = {
      name: `${user.name.first} ${user.name.last}`,
      money: Math.floor(Math.random() * 1000000),
    };
    addUser(newUser);
  } catch (error) {
    console.error(`Error in generateUser: ${error.message}`);
  }
}

//function to double the money
function doubleMoney() {
  data = data.map((item) => {
    return { name: item.name, money: item.money * 2 };
  });
  updateUI(data);
}

//Filter only millionares
function onlyMillionairesData() {
  const millionaires = data.filter((item) => item.money > 999999);

  if (millionaires.length > 0) {
    data = millionaires;
    updateUI();
  } else {
    mainTable.innerHTML = `<h3>No Millionaire found</h3>`;
  }
}

//sorting by wealth of the people
function sortByMoney() {
  data = data.sort((a, b) => b.money - a.money);
  updateUI();
}

//sorting by name
function sortName() {
  data = data.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
  );
  updateUI();
}

//calculate the sum and show in the UI
function calculateSum() {
  let totalMoney = data.reduce((acc, user) => acc + user.money, 0);
  totalMoney = formatMoney(totalMoney);

  // Check if the sum row already exists
  let sumRow = document.querySelector(".sum");
  if (!sumRow) {
    sumRow = document.createElement("div");
    sumRow.classList.add("sum");
    mainTable.appendChild(sumRow);
  }

  sumRow.innerHTML = `<h2><strong>Total wealth</strong> ${totalMoney}</h2>`;
  totalWealthClicked = true;
}

//all event listeners
addUserBtn.addEventListener("click", generateUser);
doubleBtn.addEventListener("click", doubleMoney);
showMillionairesBtn.addEventListener("click", onlyMillionairesData);
sortBtn.addEventListener("click", sortByMoney);
sortNameBtn.addEventListener("click", sortName);
wealthBtn.addEventListener("click", calculateSum);
