const pageWrap = document.querySelector('.recipes-wrapper');
const nav = document.querySelector('.header-nav');
const tagSection = document.querySelector('.tag-section');

let currentUser;

window.addEventListener('load', loadNewExperience);
nav.addEventListener('click', changeView);
tagSection.addEventListener('click', filterTags);

function changeView(event) {
  if(event.target.className === 'search-button' && event.target.previousElementSibling.value) {
    displaySearch(event.target.previousElementSibling.value);
  }
  if(event.target.className === 'clear-search-results') {
    hideMainRecipes()
    reloadAllRecipes();
  }
}

function hideMainRecipes() {
  pageWrap.innerHTML = "";
}

function displaySearch(searchValue) {
  ingredientsData.forEach(ingredient => {
    if (ingredient.name === searchValue.toLowerCase()) {
      const matchedRecipes = currentUser.searchByIngredient(ingredient.id);
      hideMainRecipes();
      getAvailableRecipes(matchedRecipes);
    }
  })
}

function loadNewExperience() {
  let recipeList = [];
  recipeData.forEach((recipe) => {
    let newRecipe = new Recipe(recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.name, recipe.tags);
    createRecipeCards(newRecipe);
    recipeList.push(newRecipe);
    });
  randomizeUserData(recipeList);
  createUniqueTags(recipeList);
}

function randomizeUserData(recipeList) {
  const randomUser = usersData[Math.floor(Math.random() * usersData.length)];
  createPantry(randomUser, recipeList);
}

function createPantry(randomUser, recipeList) {
  const newPantry = new Pantry(randomUser.pantry);
  createUser(randomUser, newPantry, recipeList);
}

function createUser(randomUser, newPantry, recipeList) {
  currentUser = new User(randomUser.name, randomUser.id, newPantry, recipeList);
}

function createUniqueTags(recipeList) {
  let uniqueTags = [];
  recipeList.forEach((recipe) => {
    recipe.tags.forEach((tag) => {
      if(!uniqueTags.includes(tag)) {
        uniqueTags.push(tag);
      };
    })
  })
  displayTagButtons(uniqueTags);
}

function displayTagButtons(uniqueTags) {
  uniqueTags.forEach((tag) => {
    const tagButton = `<button class="tag-button">${tag}</button>`
    tagSection.insertAdjacentHTML('beforeend', tagButton);
  });
}

function createRecipeCards(recipe) {
  let recipeTags = recipe.tags.join(', ');
  let recipeCardInfo = `<div class="recipe-card" id="${recipe.id}">
    <img class="recipe-card-image" src="${recipe.image}">
    <p>${recipe.name}</p>
    <div class="tag-buttons">
      <p>Tags: ${recipeTags}</p>
    </div>
  </div>`
  pageWrap.insertAdjacentHTML('afterbegin', recipeCardInfo);
}

function reloadAllRecipes() {
  let recipeList = currentUser.recipes;
  hideMainRecipes();
  getAvailableRecipes(recipeList);
}

function clearAllInputs() {
  nav.children[1].children[0].value = '';
}

function filterTags(event) {
  if(event.target.className === 'all-tag-button') {
    reloadAllRecipes();
  } else if(event.target.className === 'tag-button') {
    hideMainRecipes();
    const filteredRecipes = currentUser.filterByTag(event.target.innerText);
    getAvailableRecipes(filteredRecipes)
  }
}

function getAvailableRecipes(recipes) {
  recipes.forEach(recipe => {
    createRecipeCards(recipe);
  })
}
