const container = document.querySelector(".container");
const seats = document.querySelectorAll(".seat:not(.occupied)");
const count = document.querySelector("#count");
const total = document.querySelector("#total");
const movieSelector = document.querySelector("#movie");

let ticketPrice = +movieSelector.value;

// listening for seat selection
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

//listening for movie selection

movieSelector.addEventListener("change", (e) => {
  ticketPrice = e.target.value;
  console.log(ticketPrice);
  updateSelectedCount();
});

// updating the seat count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected").length;
  count.innerText = selectedSeats;
  total.innerText = selectedSeats * ticketPrice;
}

