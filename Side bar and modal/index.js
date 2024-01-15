const toggle = document.getElementById("toggle");
const open = document.getElementById("open");
const close = document.getElementById("close");
const modal = document.getElementById("modal");

// add event listener to toggle navbar
toggle.addEventListener("click", function () {
  document.body.classList.toggle("show-nav");
});

//to popup the modal and close it
open.addEventListener("click", () => modal.classList.add("show-modal"));
close.addEventListener("click", () => modal.classList.remove("show-modal"));

//to close modal when clicked outside of the modal area
window.addEventListener("click", (e) => {
  e.target == modal ? modal.classList.remove("show-modal") : false;
});
