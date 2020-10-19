class User {
  constructor(name, id, pantry, recipes) {
    this.name = name;
    this.id = id;
    this.pantry = pantry;
    this.recipes = recipes;
    this.favoriteRecipes = [];
    this.shoppingList = [];
    this.recipesToCook = [];
  }

  addFavorite(recipe) {
    if (!this.favoriteRecipes.includes(recipe)) {
      this.favoriteRecipes.push(recipe);
    }
  }

  removeFavorite(id) {
    this.favoriteRecipes.forEach((recipe, index) => {
      if (id === recipe.id) {
        this.favoriteRecipes.splice(index, 1);
      }
    });
  }

  searchFavorites(nameFragment) {
    const filteredFavorites = this.favoriteRecipes.filter(recipe => {
      return recipe.name.includes(nameFragment);
    });
    return filteredFavorites;
  }

  filterByTag(tagName) {
    const filteredTags = this.recipes.filter(recipe => {
      return recipe.tags.includes(tagName.toLowerCase());
    });
    return filteredTags;
  }

  searchByIngredient(ingredientName) {
    const filteredRecipes = this.recipes.reduce((acc, recipe) => {
    const matchedIngredients = recipe.ingredients.find((ingredient) => {
      return ingredient.name === ingredientName;
    })
    if (matchedIngredients) {
      acc.push(recipe);
    }
    return acc;
    },[]);
    return filteredRecipes;
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
