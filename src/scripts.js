const pageWrap = document.querySelector('.recipes-wrapper');

console.log(recipeData);

window.addEventListener('load', loadRecipes);

function loadRecipes() {
  recipeData.forEach((recipe) => {
    let newRecipe = new Recipe(recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.name, recipe.tags);
    let newRecipeTags = newRecipe.tags.join(', ');
    let recipeCardInfo = `<div class="recipe-card" id="${newRecipe.id}">
      <img src="${newRecipe.image}">
      <p>${newRecipe.name}</p>
      <div class="tag-buttons">
        <p>Tags: ${newRecipeTags}</p>
      </div>
    </div>`
    pageWrap.insertAdjacentHTML('afterbegin', recipeCardInfo);
  });
}

//instantiate the recipe class

//insert adjacent html on the recipes-wrapper

//insert a specific card
