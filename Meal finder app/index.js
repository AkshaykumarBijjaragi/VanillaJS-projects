const searchInput = document.getElementById('search'),
  submitButton = document.getElementById('submit'),
  randomButton = document.getElementById('random'),
  mealsContainer = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  singleMealContainer = document.getElementById('single-meal');

// Search meal and fetch from API
async function searchMeal(e) {
  e.preventDefault();

  // Clear single meal
  singleMealContainer.innerHTML = '';

  // Get search term
  const term = searchInput.value;

  // Check for empty
  if (term.trim()) {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
      const data = await response.json();

      console.log(data);

      resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

      if (data.meals === null) {
        resultHeading.innerHTML = `<p>There are no search results. Try again!<p>`;
      } else {
        mealsContainer.innerHTML = data.meals
          .map(
            meal => `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
          `
          )
          .join('');
      }

      // Clear search text
      searchInput.value = '';
    } catch (error) {
      console.error('Error fetching search results:', error);
      // Handle the error (e.g., show a user-friendly message)
    }
  } else {
    alert('Please enter a search term');
  }
}

// Fetch meal by ID
async function getMealById(mealID) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    const data = await response.json();

    const meal = data.meals[0];

    addMealToDOM(meal);
  } catch (error) {
    console.error('Error fetching meal by ID:', error);
    // Handle the error (e.g., show a user-friendly message)
  }
}

// Fetch random meal from API
async function getRandomMeal() {
  // Clear meals and heading
  mealsContainer.innerHTML = '';
  resultHeading.innerHTML = '';

  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
    const data = await response.json();

    const meal = data.meals[0];

    addMealToDOM(meal);
  } catch (error) {
    console.error('Error fetching random meal:', error);
    // Handle the error (e.g., show a user-friendly message)
  }
}

// Add meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  singleMealContainer.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}

// Event listeners
submitButton.addEventListener('submit', searchMeal);
randomButton.addEventListener('click', getRandomMeal);

mealsContainer.addEventListener('click', e => {
  const mealInfo = e.composedPath().find(item => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    getMealById(mealID);
  }
});
