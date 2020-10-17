const pageWrap = document.querySelector('.recipes-wrapper');
const nav = document.querySelector('.header-nav');
const tagSection = document.querySelector('.tag-section');
const modalRecipeView = document.querySelector('.modal-recipe-view');

let currentUser;

window.addEventListener('load', matchRecipeIngredients);
nav.addEventListener('click', changeView);
tagSection.addEventListener('click', filterTags);
pageWrap.addEventListener('click', handleRecipeClick);
modalRecipeView.addEventListener('click', handleModalClick);

function handleModalClick(event) {
  if(event.target.className === 'clear-modal') {
    clearModalView();
  } else if(event.target.className === 'favorite-button') {
    addToFavoritesList(event, parseInt(modalRecipeView.id));
  } else if(event.target.className.includes('favorite-button-clicked')) {
    removeFromFavorites(event, parseInt(modalRecipeView.id));
  }
}

function clearModalView() {
  modalRecipeView.classList.add('hidden');
  const favoriteButton = modalRecipeView.children[0].children[0].children[2].children[1]
  favoriteButton.classList.remove('favorite-button-clicked');
}

function handleRecipeClick(event) {
  if(event.target.className.includes('view-recipe-button')) {
    matchRecipe(event);
  }
}

function removeFromFavorites(event, cardID) {
  currentUser.removeFavorite(cardID);
  event.target.classList.remove('favorite-button-clicked')
}

function addToFavoritesList(event, cardID) {
  if (modalRecipeView.id === cardID) {
  }
  const matchedRecipe = currentUser.recipes.find((recipe) => {
    return recipe.id === cardID;
  });
  currentUser.addFavorite(matchedRecipe);
  event.target.classList.add('favorite-button-clicked');
}

function matchRecipe(event) {
  let cardID = parseInt(event.target.closest('.recipe-card').id);
  const matchedRecipe = currentUser.recipes.find((recipe) => {
    return recipe.id === cardID;
  })
  findCardElements(matchedRecipe);
}

function findCardElements(recipe) {
  modalRecipeView.classList.remove('hidden');
  const image = modalRecipeView.children[0].children[0].children[1];
  const title = image.nextElementSibling.children[0];
  const ingredients = image.nextElementSibling.nextElementSibling.children[0].children[1];
  const tags = ingredients.nextElementSibling.children[1];
  const instructions = image.nextElementSibling.nextElementSibling.children[1].children[1];
  handleModalDisplay(recipe, image, title, ingredients, tags, instructions)
}

function handleModalDisplay(recipe, image, title, ingredients, tags, instructions) {
  displayModalHeader(recipe, image, title);
  displayModalIngredients(recipe, ingredients);
  displayModalTags(recipe, tags);
  displayModalInstructions(recipe, instructions);
  modalRecipeView.setAttribute("id", recipe.id)
}

function displayModalHeader(recipe, image, title) {
  image.src = recipe.image;
  title.innerText = recipe.name;
}

function displayModalIngredients(recipe, ingredients) {
  ingredients.innerHTML = '';
  recipe.ingredients.forEach((ingredient) => {
    const ingredientInfo = `<li>${ingredient.quantity.amount} ${ingredient.quantity.unit} of ${ingredient.name}.</li>`
    ingredients.insertAdjacentHTML('beforeend', ingredientInfo);
  });
}

function displayModalTags(recipe, tags) {
  tags.innerHTML = '';
  recipe.tags.forEach((tag) => {
    const tagInfo = `<li>${tag}</li>`
    tags.insertAdjacentHTML('beforeend', tagInfo);
  })
}

function displayModalInstructions(recipe, instructions) {
  instructions.innerHTML = '';
  recipe.instructions.forEach((instruction) => {
    const instructionsInfo = `<li>${instruction.instruction}</li>`
    instructions.insertAdjacentHTML('beforeend', instructionsInfo);
  })
}

function changeView(event) {
  if(event.target.className === 'search-button' && event.target.previousElementSibling.value) {
    displaySearch(event.target.previousElementSibling.value);
  } else if(event.target.className === 'clear-search-results') {
    hideMainRecipes()
    reloadAllRecipes();
  } else if (event.target.className === "favorites-view") {
    displayFavorites(currentUser.favoriteRecipes);
  }
}

function displayFavorites(recipe) {
  hideMainRecipes()
  const sectionTitle = pageWrap.previousElementSibling.children[0];
  sectionTitle.innerText = "Your Favorites";
  getAvailableRecipes(currentUser.favoriteRecipes)
}

function hideMainRecipes() {
  pageWrap.innerHTML = "";
}

function displaySearch(searchValue) {
  const matchedRecipes = currentUser.searchByIngredient(searchValue.toLowerCase());
  hideMainRecipes();
  getAvailableRecipes(matchedRecipes);
}

function matchRecipeIngredients() {
  recipeData.forEach(recipe => {
      recipe.ingredients.forEach(recipeIngredient => {
        let matchedIngredient = ingredientsData.find(ingredientData => {
          return ingredientData.id === recipeIngredient.id
        })
        if (matchedIngredient) {
          recipeIngredient.name = matchedIngredient.name
          recipeIngredient.estimatedCostInCents = matchedIngredient.
          estimatedCostInCents;
        }
      })
    })
  loadNewExperience()
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
    <h3 class="card-content card-title">${recipe.name}</h3>
    <div class="tag-buttons card-content">
      <p>${recipeTags}</p>
    </div>
    <div class="recipe-ctas">
      <button class="card-content view-recipe-button">View Recipe</button>
      <button class="card-content add-recipe-button">Add Recipe</button>
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
