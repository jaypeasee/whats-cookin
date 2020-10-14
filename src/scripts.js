const pageWrap = document.querySelector('.recipes-wrapper');
const nav = document.querySelector('.header-nav');

window.addEventListener('load', loadNewExperience);
nav.addEventListener('click', changeView);

function changeView(event) {
  if(event.target.className === 'search-button' && event.target.previousElementSibling.value) {
    displaySearch();
  }
}

function hideMainRecipes() {
  pageWrap.classList.add('hidden');
}

function displaySearch() {
  hideMainRecipes();
}

function loadNewExperience() {
  let recipeList = [];
  recipeData.forEach((recipe) => {
    let newRecipe = new Recipe(recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.name, recipe.tags);
    createRecipeCards(newRecipe);
    recipeList.push(newRecipe);
    });
  randomizeUserData(recipeList);
}

function randomizeUserData(list) {
  const randomUser = usersData[Math.floor(Math.random() * usersData.length)];
  createPantry(randomUser, list);
}

function createPantry(randomUser, list) {
  const newPantry = new Pantry(randomUser.pantry);
  createUser(randomUser, newPantry, list);
}

function createUser(randomUser, newPantry, list) {
  const newUser = new User(randomUser.name, randomUser.id, newPantry, list);
}


function createRecipeCards(recipe) {
  let recipeTags = recipe.tags.join(', ');
  let recipeCardInfo = `<div class="recipe-card" id="${recipe.id}">
    <img src="${recipe.image}">
    <p>${recipe.name}</p>
    <div class="tag-buttons">
      <p>Tags: ${recipeTags}</p>
    </div>
  </div>`
  pageWrap.insertAdjacentHTML('afterbegin', recipeCardInfo);
}


//instantiate the recipe class

//insert adjacent html on the recipes-wrapper

//insert a specific card
