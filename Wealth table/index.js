const mainTable = document.getElementById("main");

//all buttons
const addUser = document.getElementById("add-user");
const double = document.getElementById("double");
const showMillionaires = document.getElementById("show-millionaires");
const sort = document.getElementById("sort");
const wealth = document.getElementById("calculate-wealth");

let data = [];

//format the money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}


//add users to database
function addUser(user) {
    data.push(user);
    updateUI()
}


//loading UI from data
function updateUI() {
     
     
}


//request to API to generate random user
async function generateUser() {
  const res = await fetch("https://randomuser.me/api");
  data = await res.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: formatMoney(Math.floor(Math.random() * 1000000)),
  };
  addUser(newUser)
}

//all event listeners
addUser.addEventListener("click", generateUser);
