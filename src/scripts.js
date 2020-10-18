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
    let newRecipe = new Recipe(recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.name, recipe.tags);
    createRecipeCards(newRecipe);
    recipeList.push(newRecipe);
    });
  randomizeUserData(recipeList);
  createUniqueTags(recipeList);
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
    displaySearch(event.target.previousElementSibling.value);
  } else if(event.target.className === 'clear-search-results') {
    reloadAllRecipes();
  } else if (event.target.className === "favorites-view") {
    displayFavorites(currentUser.favoriteRecipes);
  } else if (event.target.className === "pantry-button") {
    openPantry()
  } else if (event.target.className === "home-view") {
    displayHome();
  } else if (event.target.className === "view-shopping-list") {
    displayShoppingList();
  }
}

function displaySearch(searchValue) {
  const matchedRecipes = currentUser.searchByIngredient(searchValue.toLowerCase());
  hideMainRecipes();
  getAvailableRecipes(matchedRecipes);
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
  const sectionTitle = pageWrap.previousElementSibling.children[0];
  sectionTitle.innerText = "Your Favorites";
  getAvailableRecipes(currentUser.favoriteRecipes)
}

function unhideHome() {
  pantryView.classList.add('hidden');
  tagSection.classList.remove('hidden');
  pageWrap.classList.remove('hidden');
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
  // displayPantryContent();
}

// function displayPantryContent() {
// const pantryDetails = currentUser.pantry.pantry.map(item => {
//   return currentUser.recipes.forEach(recipe => {
//     const matchedIngredient = recipe.ingredients.find(ingredient => {
//       return item.ingredient === ingredient.id;
//     })
//     if (matchedIngredient) {
//       item.name = matchedIngredient.name;
//       item.unit = matchedIngredient.quantity.unit;
//     }
//   })
//   return pantryDetails;
// })
// //display name, amount measurement
// }

function displayHome() {
  let tagTitle = pageWrap.previousElementSibling.previousElementSibling.children[0].children[0];
  tagTitle.innerText = "Filter By Recipe Tags";
  unhideHome()
  reloadAllRecipes()
}

function displayShoppingList() {
  shoppingListView.classList.remove('hidden');
  hideHome();
  let removedTitle = pageWrap.previousElementSibling.children[0];
  removedTitle.innerText = "";
  let sectionTitle = pageWrap.previousElementSibling.previousElementSibling.children[0].children[0];
  sectionTitle.innerText = "Your Shopping List";
}

function getAvailableRecipes(recipes) {
  recipes.forEach(recipe => {
    createRecipeCards(recipe);
  });
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
    matchRecipeToCook(event);
  };
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
  //invoke injecting content into shopping list
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
    const ingredientDetails =
    `<li>${ingredient.name} - ${ingredient.amountNeeded} ${ingredient.unit} - $${ingredient.cost / 100}</li>`
    list.insertAdjacentHTML('afterbegin', ingredientDetails);
  })
  populateShoppingList(ingredientsList)
}

function populateShoppingList(ingredientsList) {
  const ingredientsBlock = shoppingListView.children[0];
  ingredientsList.forEach(ingredient => {
    const ingredientItem =
    `<div class="ingredient-wrap">
      <div class="ingredient-label">
        <input class="ingredient-checkbox"type="checkbox">
        <label>${ingredient.amountNeeded} ${ingredient.unit} of ${ingredient.name}</label>
      </div>
      <div class="ingredient-quantity">
        <h3>$${ingredient.cost / 100}</h3>
      </div>
    </div>`
    ingredientsBlock.insertAdjacentHTML('afterbegin', ingredientItem);
  });
}

function hideMainRecipes() {
  pageWrap.innerHTML = "";
}

function clearAllInputs() {
  nav.children[1].children[0].value = '';
}
