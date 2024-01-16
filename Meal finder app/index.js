const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const meals = document.getElementById("meals");
const singleMeal = document.getElementById("single-meal");
const resultHeading = document.getElementById("result-heading");

//searchMeal and fetch from API
async function searchMeal(e) {
  e.preventDefault();
  singleMeal.innerHTML = ``;

  const term = search.value;

  if (term.trim()) {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
      );
      const data = await response.json();

      if (data.meals === null) {
        resultHeading.innerHTML = `<p>There are no search results. Try again!<p>`;
      } else {
        meals.innerHTML = data.meals
          .map(
            (meal) => `
                <div class="meal">
                  <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                  <div class="meal-info" data-mealID="${meal.idMeal}">
                    <h3>${meal.strMeal}</h3>
                  </div>
                </div>
              `
          )
          .join("");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  } else {
    alert("Please enter a search term");
  }
}

// Event Listener
submit.addEventListener("submit", searchMeal);
