const pageWrap = document.querySelector('.recipes-wrapper');
const nav = document.querySelector('.header-nav');
const tagSection = document.querySelector('.tag-section');
const modalRecipeView = document.querySelector('.modal-recipe-view');
const pantryView = document.querySelector('.pantry-view');
const shoppingListView = document.querySelector('.shopping-list-view');

let currentUser;

window.addEventListener('load', matchRecipeIngredients);
nav.addEventListener('click', changeRecipeView);
tagSection.addEventListener('click', filterTags);
pageWrap.addEventListener('click', handleRecipeClick);
modalRecipeView.addEventListener('click', handleModalClick);

function matchRecipeIngredients() {
  recipeData.forEach(recipe => {
      recipe.ingredients.forEach(recipeIngredient => {
        let matchedIngredient = ingredientsData.find(ingredientData => {
          return ingredientData.id === recipeIngredient.id;
        })
        if (matchedIngredient) {
          recipeIngredient.name = matchedIngredient.name;
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
    const newRecipe = new Recipe(recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.name, recipe.tags);
    const recipeCost = newRecipe.calculateCost();
    recipeList.push(newRecipe);
    createRecipeCards(newRecipe, recipeCost);
    });
  randomizeUserData(recipeList);
  createUniqueTags(recipeList);
}

function createRecipeCards(recipe, recipeCost) {
  let recipeTags = recipe.tags.join(', ');
  let recipeCardInfo = `<div class="recipe-card" id="${recipe.id}">
    <img class="recipe-card-image" src="${recipe.image}">
    <h3 class="card-content card-title">${recipe.name}: $${recipeCost}</h3>
    <div class="tag-buttons card-content">
      <p>${recipeTags}</p>
    </div>
    <div class="recipe-ctas">
      <button class="card-content view-recipe-button">View Recipe</button>
  </div>`;
  pageWrap.insertAdjacentHTML('afterbegin', recipeCardInfo);
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
    const tagButton = `<button class="tag-button">${tag}</button>`;
    tagSection.insertAdjacentHTML('beforeend', tagButton);
  });
}

function changeRecipeView(event) {
  if (event.target.className === 'search-button' && event.target.previousElementSibling.value) {
    displaySearch(event);
  } else if (event.target.className === 'clear-search-results') {
    reloadAllRecipes();
  } else if (event.target.className === "favorites-view") {
    displayFavorites();
  } else if (event.target.className === "pantry-button") {
    openPantry();
  } else if (event.target.className === "home-view") {
    displayHome();
  } else if (event.target.className === "view-shopping-list") {
    displayShoppingList();
  } else if (event.target.className === "recipes-to-cook") {
    displayRecipesToCook();
  } else if (event.target.className.includes("search-favorites")) {
    showSearchedFavorites(event);
  } else if (event.target.className.includes("search-recipes-to-cook")) {
    showSearchedQueue(event);
  }
}

function displaySearch(event) {
  const searchTerm = event.target.previousElementSibling;
  const matchedRecipes = currentUser.searchByIngredient(searchTerm.value.toLowerCase());
  hideMainRecipes();
  getAvailableRecipes(matchedRecipes);
  searchTerm.value = "";
}

function hideMainRecipes() {
  pageWrap.innerHTML = "";
}

function getAvailableRecipes(recipes) {
  recipes.forEach(recipe => {
    const recipeCost = recipe.calculateCost()
    createRecipeCards(recipe, recipeCost);
  });
}

function reloadAllRecipes() {
  const sectionTitle = pageWrap.previousElementSibling.children[0];
  const recipeList = currentUser.recipes;
  hideMainRecipes();
  sectionTitle.innerText = "All Recipes";
  getAvailableRecipes(recipeList);
}

function displayFavorites() {
  displayFavoritesSection();
  displayFavoritesDetails();
  getAvailableRecipes(currentUser.favoriteRecipes)
}

function displayFavoritesSection() {
  hideMainRecipes()
  showHome()
  tagSection.classList.add('hidden')
  shoppingListView.classList.add('hidden');
}

function displayFavoritesDetails() {
  const searchInput = searchButton.previousElementSibling;
  const searchButton = nav.children[1].children[1];
  const pageHeading = pageWrap.previousElementSibling.previousElementSibling.children[0].children[0];
  const sectionTitle = pageWrap.previousElementSibling.children[0];
  searchInput.placeholder = "Search Favorite By Name";
  searchButton.classList.add('search-favorites');
  pageHeading.innerText = "";
  sectionTitle.innerText = "Your Favorites";
}

function showHome() {
  showHomeSearchBar();
  unhideHome();
}

function showHomeSearchBar() {
  const searchBar = nav.children[1].children[0];
  const searchButton = searchBar.nextElementSibling;
  searchBar.placeholder = "Search By An Ingredient";
  searchBar.value = "";
  searchButton.classList.remove('search-favorites');
  searchButton.classList.remove('search-recipes-to-cook');
}

function unhideHome() {
  pantryView.classList.add('hidden');
  shoppingListView.classList.add('hidden');
  tagSection.classList.remove('hidden');
  pageWrap.classList.remove('hidden');
  nav.children[1].classList.remove('hidden')
}

function hideHome() {
  tagSection.classList.add('hidden');
  pageWrap.classList.add('hidden');
  nav.children[1].classList.add('hidden');
}

function openPantry() {
  const allPantryDetails = currentUser.pantry.consolidatePantry(currentUser.recipes);
  displayPantry(allPantryDetails);
  showPantrySection();
}

function showPantrySection() {
  hideHome();
  pantryView.classList.remove('hidden');
  const removedHeading = pageWrap.previousElementSibling.children[0];
  const sectionTitle = pageWrap.previousElementSibling.previousElementSibling.children[0].children[0];
  removedHeading.innerText = "";
  sectionTitle.innerText = "Your Pantry";
}

function displayPantry(pantryItems) {
  pantryItems.forEach(item => {
    const roundedAmount = Math.round(item.amount);
    const pantryItemBlock =
    `<div class="ingredient-wrap">
      <div class="ingredient-label">
        <h4>${item.name}</h4>
      </div>
      <div class="ingredient-quantity">
        <h4>${roundedAmount} ${item.unit}</h4>
      </div>`
    pantryView.children[0].insertAdjacentHTML('afterbegin', pantryItemBlock);
  });
}

function displayHome() {
  const tagTitle = pageWrap.previousElementSibling.previousElementSibling.children[0].children[0];
  tagTitle.innerText = "Filter By Recipe Tags";
  showHome();
  reloadAllRecipes();
}

function displayShoppingList() {
  const removedTitle = pageWrap.previousElementSibling.children[0];
  const sectionTitle = pageWrap.previousElementSibling.previousElementSibling.children[0].children[0];
  hideHome();
  removedTitle.innerText = "";
  sectionTitle.innerText = "Your Shopping List";
  pantryView.classList.add('hidden')
  shoppingListView.classList.remove('hidden');
}

function displayRecipesToCook() {
  hideEverythingButQueue();
  displayQueueDetails();
  getAvailableRecipes(currentUser.recipesToCook)
}

function hideEverythingButQueue() {
  hideMainRecipes()
  showHome()
  tagSection.classList.add('hidden');
  shoppingListView.classList.add('hidden');
}

function displayQueueDetails() {
  const pageHeading = pageWrap.previousElementSibling.previousElementSibling.children[0].children[0];
  const searchButton = nav.children[1].children[1];
  const searchInput = searchButton.previousElementSibling;
  const sectionTitle = pageWrap.previousElementSibling.children[0];
  pageHeading.innerText = "";
  searchButton.classList.add('search-recipes-to-cook');
  searchInput.placeholder = "Search Recipes To Cook By Name";
  sectionTitle.innerText = "Your Recipes To Cook";
}

function showSearchedFavorites(event) {
  const searchResults = currentUser.searchFavorites(inputName.value);
  const inputName = event.target.previousElementSibling
  hideMainRecipes()
  getAvailableRecipes(searchResults);
  inputName.value = "";
}

function showSearchedQueue(event) {
  const searchResults = currentUser.searchQueue(inputName.value);
  const inputName = event.target.previousElementSibling
  hideMainRecipes()
  getAvailableRecipes(searchResults);
  inputName.value = "";
}

function handleRecipeClick(event) {
  if (event.target.className.includes('view-recipe-button')) {
    matchRecipe(event);
  }
}

function matchRecipe(event) {
  const cardID = parseInt(event.target.closest('.recipe-card').id);
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
  modalRecipeView.setAttribute("id", recipe.id);
  displayModalHeader(recipe, image, title);
  displayModalIngredients(recipe, ingredients);
  displayModalTags(recipe, tags);
  displayModalInstructions(recipe, instructions);
  displayFavoriteButton(recipe);
  showAlreadyAddedRecipe(recipe, event);
}

function displayModalHeader(recipe, image, title) {
  image.src = recipe.image;
  title.innerText = recipe.name;
}

function displayModalIngredients(recipe, ingredients) {
  ingredients.innerHTML = '';
  recipe.ingredients.forEach(ingredient => {
    const amount = Math.round(ingredient.quantity.amount * 100) / 100;
    const ingredientListItem = `<li>${amount} ${ingredient.quantity.unit} of ${ingredient.name}.</li>`;
    ingredients.insertAdjacentHTML('beforeend', ingredientListItem);
  });
}

function displayModalTags(recipe, tags) {
  tags.innerHTML = '';
  recipe.tags.forEach((tag) => {
    const tagInfo = `<li>${tag}</li>`;
    tags.insertAdjacentHTML('beforeend', tagInfo);
  });
}

function displayModalInstructions(recipe, instructions) {
  instructions.innerHTML = '';
  recipe.instructions.forEach((instruction) => {
    const instructionsInfo = `<li>${instruction.instruction}</li>`;
    instructions.insertAdjacentHTML('beforeend', instructionsInfo);
  });
}

function displayFavoriteButton(recipe) {
  currentUser.favoriteRecipes.forEach(favoriteRecipe => {
    if (favoriteRecipe.id === recipe.id) {
      const favoriteButton = modalRecipeView.children[0].children[0].children[2].children[1];
      favoriteButton.classList.add('favorite-button-clicked');
    }
  });
}

function showAlreadyAddedRecipe(recipe, event) {
  let cardID = parseInt(event.target.closest('.recipe-card').id);
  currentUser.recipesToCook.forEach(item => {
    if (item === recipe) {
      displayAddedRecipe();
      const addButton = modalRecipeView.children[0].children[1].children[0];
      addButton.disabled = true;
    }
  });
}

function filterTags(event) {
  if (event.target.className === 'all-tag-button') {
    reloadAllRecipes();
  } else if(event.target.className === 'tag-button') {
    displayFilteredTag(event);
  }
}

function displayFilteredTag(event) {
  hideMainRecipes();
  const filteredRecipes = currentUser.filterByTag(event.target.innerText);
  getAvailableRecipes(filteredRecipes)
  const title = event.target.innerText;
  let sectionTitle = pageWrap.previousElementSibling.children[0];
  sectionTitle.innerText = title;
}

function handleModalClick(event) {
  if (event.target.className === 'clear-modal') {
    clearModalView();
  } else if (event.target.className === 'favorite-button') {
    addToFavoritesList(event);
  } else if (event.target.className.includes('favorite-button-clicked')) {
    removeFromFavorites(event);
  } else if (event.target.className === 'add-recipe-to-cook'){
    matchRecipeToCook();
  }
}

function clearModalView(event) {
  const favoriteButton = modalRecipeView.children[0].children[0].children[2].children[1];
  const addRecipeButton = modalRecipeView.children[0].children[1].children[0];
  const neededIngredients = modalRecipeView.children[0].children[2];
  modalRecipeView.classList.add('hidden');
  favoriteButton.classList.remove('favorite-button-clicked');
  addRecipeButton.disabled = false;
  if (neededIngredients) {
    neededIngredients.innerHTML = "";
  }
}

function addToFavoritesList(event) {
  const cardID = parseInt(modalRecipeView.id)
  event.target.classList.add('favorite-button-clicked');
  const matchedRecipe = currentUser.recipes.find((recipe) => {
    return recipe.id === cardID;
  });
  currentUser.addFavorite(matchedRecipe);
}

function removeFromFavorites(event) {
  const cardID = parseInt(modalRecipeView.id)
  event.target.classList.remove('favorite-button-clicked');
  currentUser.removeFavorite(cardID);
}

function matchRecipeToCook(cardID) {
  const cardID = parseInt(modalRecipeView.id);
  const matchedRecipe = currentUser.recipes.find((recipe) => {
    return recipe.id === parseInt(modalRecipeView.id);
  })
  updateItemDetails(matchedRecipe, cardID);
}

function updateItemDetails(recipe, cardID) {
  const ingredientsList = currentUser.pantry.evaluateIngredients(recipe);
  const addButton = modalRecipeView.children[0].children[1].children[0];
  if (ingredientsList.length === 0) {
    currentUser.pantry.removePantryIngredients(recipe);
    currentUser.addToCook(cardID);
    displayAddedRecipe();
  } else {
    updateIngredientsNeeded(ingredientsList);
  }
  addButton.disabled = true;
}

function displayAddedRecipe() {
  const addRecipeButton = modalRecipeView.children[0].children[1];
  const addedRecipeBlock =
  `<div>
    <h2>This recipe has been added to your cooking list!</h2>
    <p>The ingredients needed have been taken out of your pantry</p>
  </div>`;
  addRecipeButton.insertAdjacentHTML("afterend", addedRecipeBlock);
}

function updateIngredientsNeeded(ingredientsList) {
  const detailsList = ingredientsList.map(item => {
    return currentUser.recipes.forEach(recipe => {
      const matchedRecipe = recipe.ingredients.find(ingredient => {
        return ingredient.id === item.id;
      })
      if (matchedRecipe) {
        item.name = matchedRecipe.name;
        item.unit = matchedRecipe.quantity.unit;
        item.cost = matchedRecipe.estimatedCostInCents * item.amountNeeded;
      }
    })
    return ingredientsList;
  })
  displayIngredientsNeededBlock(ingredientsList);
}

function displayIngredientsNeededBlock(ingredientsList) {
  const addRecipeButton = modalRecipeView.children[0].children[1];
  const neededIngredientsBlock =
  `<div class="needed-ingredients">
    <h2>The following items have been added to your shopping list:</h2>
    <ul>
    </ul>
  </div>`
  addRecipeButton.insertAdjacentHTML("afterend", neededIngredientsBlock);
  displayNeededIngredientItems(ingredientsList);
}

function displayNeededIngredientItems(ingredientsList) {
  const listItems = modalRecipeView.children[0].children[2].children[1];
  ingredientsList.forEach(ingredient => {
    ingredient.cost = (ingredient.cost / 100).toFixed(2);
    ingredient.amountNeeded = Math.round(ingredient.amountNeeded * 100) / 100;
    const ingredientDetails =
    `<li>${ingredient.amountNeeded} ${ingredient.unit} ${ingredient.name}: $${ingredient.cost}</li>`
    listItems.insertAdjacentHTML('afterbegin', ingredientDetails);
    populateShoppingList(ingredient);
  })
}

function populateShoppingList(ingredient) {
  const ingredientsBlock = shoppingListView.children[0];
    const ingredientItem =
    `<div class="ingredient-wrap">
      <div class="ingredient-label">
        <input class="ingredient-checkbox"type="checkbox">
        <label>${ingredient.amountNeeded} ${ingredient.unit} of ${ingredient.name}</label>
      </div>
      <div class="ingredient-quantity">
        <h3>$${ingredient.cost}</h3>
      </div>
    </div>`;
    ingredientsBlock.insertAdjacentHTML('afterbegin', ingredientItem);
}
