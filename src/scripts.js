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
    const newRecipe = new Recipe(recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.name, recipe.tags);
    const recipeCost = newRecipe.calculateCost();
    createRecipeCards(newRecipe, recipeCost);
    recipeList.push(newRecipe);
    });
  randomizeUserData(recipeList);
  createUniqueTags(recipeList);
}

function createRecipeCards(recipe, recipeCost) {
  let recipeTags = recipe.tags.join(', ');
  let recipeCardInfo = `<div class="recipe-card" id="${recipe.id}">
    <img class="recipe-card-image" src="${recipe.image}">
    <h3 class="card-content card-title">${recipe.name}</h3>
    <h4 class="recipe-cost">$${recipeCost}</h4>
    <div class="tag-buttons card-content">
      <p>${recipeTags}</p>
    </div>
    <div class="recipe-ctas">
      <button class="card-content view-recipe-button">View Recipe</button>
  </div>`
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
    const tagButton = `<button class="tag-button">${tag}</button>`
    tagSection.insertAdjacentHTML('beforeend', tagButton);
  });
}

function changeRecipeView(event) {
  if(event.target.className === 'search-button' && event.target.previousElementSibling.value) {
    displaySearch(event.target.previousElementSibling);
  } else if(event.target.className === 'clear-search-results') {
    reloadAllRecipes(event);
  } else if (event.target.className === "favorites-view") {
    displayFavorites(currentUser.favoriteRecipes);
  } else if (event.target.className === "pantry-button") {
    openPantry()
  } else if (event.target.className === "home-view") {
    displayHome();
  } else if (event.target.className === "view-shopping-list") {
    displayShoppingList(event);
  } else if (event.target.className === "recipes-to-cook") {
    displayRecipesToCook();
  } else if (event.target.className.includes("search-favorites")) {
    showSearchedFavorites(event);
  } else if (event.target.className.includes("search-recipes-to-cook")) {
    showSearchedQueue(event);
  }
}

function displaySearch(searchTerm) {
  const matchedRecipes = currentUser.searchByIngredient(searchTerm.value.toLowerCase());
  hideMainRecipes();
  getAvailableRecipes(matchedRecipes);
  searchTerm.value = "";
}

function reloadAllRecipes() {
  let recipeList = currentUser.recipes;
  hideMainRecipes();
  let sectionTitle = pageWrap.previousElementSibling.children[0];
  sectionTitle.innerText = "All Recipes";
  getAvailableRecipes(recipeList);
}

function displayFavorites(recipe) {
  hideMainRecipes()
  unhideHome()
  let pageHeading = pageWrap.previousElementSibling.previousElementSibling.children[0].children[0];
  pageHeading.innerText = "";
  let searchButton = nav.children[1].children[1];
  let searchInput = searchButton.previousElementSibling;
  searchInput.placeholder = "Search Favorite By Name";
  searchButton.classList.add('search-favorites');
  tagSection.classList.add('hidden')
  const sectionTitle = pageWrap.previousElementSibling.children[0];
  sectionTitle.innerText = "Your Favorites";
  getAvailableRecipes(currentUser.favoriteRecipes)
}

function unhideHome() {
  pantryView.classList.add('hidden');
  tagSection.classList.remove('hidden');
  pageWrap.classList.remove('hidden');
  let searchBar = nav.children[1].children[0];
  searchBar.placeholder = "Search By An Ingredient";
  searchBar.value = "";
  let searchButton = searchBar.nextElementSibling
  searchButton.classList.remove('search-favorites');
}

function hideHome() {
  tagSection.classList.add('hidden');
  pageWrap.classList.add('hidden');
}

function openPantry() {
  hideHome();
  pantryView.classList.remove('hidden');
  let removedTitle = pageWrap.previousElementSibling.children[0];
  removedTitle.innerText = "";
  let sectionTitle = pageWrap.previousElementSibling.previousElementSibling.children[0].children[0];
  sectionTitle.innerText = "Your Pantry";
  const pantryItems = currentUser.pantry.consolidatePantry(currentUser.recipes);
  displayPantry(pantryItems)
}

function displayPantry(pantryItems) {
  pantryItems.forEach(item => {
    const roundedAmount = Math.round(item.amount);
    const pantryItemBlock =
    `<div class="ingredient-wrap">
      <div class="ingredient-label">
        <input class="ingredient-checkbox"type="checkbox">
        <label>${item.name}</label>
      </div>
      <div class="ingredient-quantity">
        <h3>${roundedAmount} ${item.unit}</h3>
      </div>`
    pantryView.children[0].insertAdjacentHTML('afterbegin', pantryItemBlock);
  })
}

function displayHome() {
  let tagTitle = pageWrap.previousElementSibling.previousElementSibling.children[0].children[0];
  tagTitle.innerText = "Filter By Recipe Tags";
  unhideHome()
  reloadAllRecipes()
}

function displayShoppingList() {
  shoppingListView.classList.remove('hidden');
  pantryView.classList.add('hidden')
  hideHome();
  let removedTitle = pageWrap.previousElementSibling.children[0];
  removedTitle.innerText = "";
  let sectionTitle = pageWrap.previousElementSibling.previousElementSibling.children[0].children[0];
  sectionTitle.innerText = "Your Shopping List";
}

function displayRecipesToCook() {
  hideMainRecipes()
  unhideHome()
  let pageHeading = pageWrap.previousElementSibling.previousElementSibling.children[0].children[0];
  pageHeading.innerText = "";
  tagSection.classList.add('hidden');
  let searchButton = nav.children[1].children[1];
  let searchInput = searchButton.previousElementSibling;
  searchInput.placeholder = "Search Recipes To Cook By Name";
  searchButton.classList.add('search-recipes-to-cook');
  const sectionTitle = pageWrap.previousElementSibling.children[0];
  sectionTitle.innerText = "Your Recipes To Cook";
  getAvailableRecipes(currentUser.recipesToCook)
}

function getAvailableRecipes(recipes) {
  recipes.forEach(recipe => {
    const recipeCost = recipe.calculateCost()
    createRecipeCards(recipe, recipeCost);
  });
}

function showSearchedFavorites(event) {
  const inputName = event.target.previousElementSibling
  const searchResults = currentUser.searchFavorites(inputName.value);
  hideMainRecipes()
  getAvailableRecipes(searchResults);
  inputName.value = "";
}

function showSearchedQueue(event) {
  const inputName = event.target.previousElementSibling
  const searchResults = currentUser.searchQueue(inputName.value);
  console.log(searchResults);
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
  displayFavoriteButton(recipe);
  modalRecipeView.setAttribute("id", recipe.id);
}

function displayModalHeader(recipe, image, title) {
  image.src = recipe.image;
  title.innerText = recipe.name;
}

function displayModalIngredients(recipe, ingredients) {
  ingredients.innerHTML = '';
  recipe.ingredients.forEach((ingredient) => {
    const amount = Math.round(ingredient.quantity.amount * 100) / 100;
    const ingredientInfo = `<li>${amount} ${ingredient.quantity.unit} of ${ingredient.name}.</li>`
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

function displayFavoriteButton(recipe) {
  currentUser.favoriteRecipes.forEach(favoriteRecipe => {
    if (favoriteRecipe.id === recipe.id) {
      let favoriteButton = modalRecipeView.children[0].children[0].children[2].children[1];
      favoriteButton.classList.add('favorite-button-clicked');
    }
  })
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
    addToFavoritesList(event, parseInt(modalRecipeView.id));
  } else if (event.target.className.includes('favorite-button-clicked')) {
    removeFromFavorites(event, parseInt(modalRecipeView.id));
  } else if (event.target.className === 'add-recipe-to-cook'){
    addRecipeToCook(event, parseInt(modalRecipeView.id));
  }
}

function clearModalView() {
  let addRecipeButton = modalRecipeView.children[0].children[1].children[0];
  let favoriteButton = modalRecipeView.children[0].children[0].children[2].children[1];
  let neededTitle = modalRecipeView.children[0].children[2]
  let neededIngredients = modalRecipeView.children[0].children[2];
  modalRecipeView.classList.add('hidden');
  favoriteButton.classList.remove('favorite-button-clicked');
  addRecipeButton.disabled = false;
  if (neededIngredients) {
    neededIngredients.innerHTML = "";
  }
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

function removeFromFavorites(event, cardID) {
  currentUser.removeFavorite(cardID);
  event.target.classList.remove('favorite-button-clicked')
}

function addRecipeToCook(event, cardID) {
  matchRecipeToCook(event)
  currentUser.addToCook(cardID)
}

function matchRecipeToCook(event) {
  const matchedRecipe = currentUser.recipes.find((recipe) => {
    return recipe.id === parseInt(modalRecipeView.id);
  })
  const ingredientsList = currentUser.pantry.evaluateIngredients(matchedRecipe);
  if(ingredientsList === []){
    displayAddedRecipe();
  } else {
    updateIngredientsNeeded(ingredientsList, event);
  }
}

function displayAddedRecipe() {
  const addRecipeButton = modalRecipeView.children[0].children[1];
  const addedRecipeBlock =
  `<div>
    <h2>This recipe has  added to your cooking list!</h2>
    <p>The ingredients needed have been taken out of your pantry</p>
  </div>`
  addRecipeButton.insertAdjacentHTML("afterend", addedRecipeBlock);
  //need to manually test if this actually works
}

function updateIngredientsNeeded(ingredientsList, event) {
  const detailsList = ingredientsList.map((item) => {
    return currentUser.recipes.forEach((recipe) => {
      const matchedRecipe = recipe.ingredients.find((ingredient) => {
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
  DisplayIngredientsNeededBlock(ingredientsList, event);
}

function DisplayIngredientsNeededBlock(ingredientsList, event) {
  event.target.disabled = true;
  let neededIngredientsBlock =
  `<div class="needed-ingredients">
    <h2>The following items have been added to your shopping list:</h2>
    <ul>
    </ul>
  </div>`
  const addRecipeButton = modalRecipeView.children[0].children[1];
  addRecipeButton.insertAdjacentHTML("afterend", neededIngredientsBlock);
  displayNeededIngredientItems(ingredientsList);
}

function displayNeededIngredientItems(ingredientsList) {
  const list = modalRecipeView.children[0].children[2].children[1];
  ingredientsList.forEach(ingredient => {
    ingredient.cost = (ingredient.cost / 100).toFixed(2);
    ingredient.amountNeeded = Math.round(ingredient.amountNeeded * 100) / 100;
    const ingredientDetails =
    `<li>${ingredient.amountNeeded} ${ingredient.unit} ${ingredient.name}: $${ingredient.cost}</li>`
    list.insertAdjacentHTML('afterbegin', ingredientDetails);
    populateShoppingList(ingredient);
  })
}

function populateShoppingList(ingredient) {
  const ingredientsBlock = shoppingListView.children[0];
    const ingredientItem =
    `<div class="ingredient-wrap">
      <div class="ingredient-label">
        <input class="ingredient-checkbox"type="checkbox">
        <label>${ingredient.amount} ${ingredient.unit} of ${ingredient.name}</label>
      </div>
      <div class="ingredient-quantity">
        <h3>$${ingredient.cost}</h3>
      </div>
    </div>`
    ingredientsBlock.insertAdjacentHTML('afterbegin', ingredientItem);
}

function hideMainRecipes() {
  pageWrap.innerHTML = "";
}

function clearAllInputs() {
  nav.children[1].children[0].value = '';
}
