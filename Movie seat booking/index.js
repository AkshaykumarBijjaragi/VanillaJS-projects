const container = document.querySelector(".container");
const seats = document.querySelectorAll(".seat:not(.occupied)");
const count = document.querySelector("#count");
const total = document.querySelector("#total");
const movieSelector = document.querySelector("#movie");

let ticketPrice = +movieSelector.value;


populateUI();

// function to load saved data

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("seatIndex"));
  ticketPrice = localStorage.getItem("moviePrice");

  //generate seats selected
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      console.log(index);
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  //choose movie selected
  const movieIndex = localStorage.getItem("movieIndex");
  if (movieIndex !== null) {
    movieSelector.selectedIndex = parseInt(movieIndex);
  }
}

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
  // console.log(ticketPrice);

  setMovieData(e.target.selectedIndex, e.target.value);

  updateSelectedCount();
});

// set movie data
function setMovieData(movieIndex, movieprice) {
  localStorage.setItem("movieIndex", movieIndex);
  localStorage.setItem("moviePrice", movieprice);
}

// updating the seat count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  // copy selected seats into a array and map through the array
  // store in local storage

  const seatIndex = [...selectedSeats].map((seat) => {
    // console.log(seats);
    return [...seats].indexOf(seat);
  });

  localStorage.setItem("seatIndex", JSON.stringify(seatIndex));

  console.log(seatIndex);

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}
//calling it at last so selected seats from local storage data gets updated before reaching this point
updateSelectedCount();