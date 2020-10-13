const pageWrap = document.querySelector('.recipes-wrapper');

console.log(recipeData);

window.addEventListener('load', loadNewExperience);
//^^^ invoke a handler function
//handler function should invoke two functions
//createRecipes
//createUser

//refactor
//creates
function loadNewExperience() {
  createRecipes();
}

function createRecipes() {
recipeData.forEach((recipe) => {
  let newRecipe = new Recipe(recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.name, recipe.tags);
  createRecipeCards(newRecipe);
  });
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
