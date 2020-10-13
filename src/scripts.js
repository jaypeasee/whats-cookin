const pageWrap = document.querySelector('.recipes-wrapper');

console.log(recipeData);

window.addEventListener('load', loadRecipes);

function loadRecipes() {
  recipeData.forEach((recipe) => {
    let newRecipe = new Recipe(recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.name, recipe.tags)
    let recipeCardInfo = `<div class="recipe-card">
      <img src=${newRecipe.image}>
      <p>${newRecipe.name}</p>
      <div class="tag-buttons">
        <button type="button" name="button">Tag</button>
        <button type="button" name="button">Tag</button>
        <button type="button" name="button">Tag</button>
      </div>
    </div>`
    pageWrap.insertAdjacentHTML('afterbegin', recipeCardInfo);
  });
}

//instantiate the recipe class

//insert adjacent html on the recipes-wrapper

//insert a specific card
