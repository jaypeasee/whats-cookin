class User {
  constructor(name, id, pantry, recipes) {
    this.name = name;
    this.id = id;
    this.pantry = pantry;
    this.recipes = recipes;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  addFavorite(recipe) {
    if (!this.favoriteRecipes.includes(recipe)) {
      this.favoriteRecipes.push(recipe);
    }
  }

  removeFavorite(recipeID) {
    this.favoriteRecipes.forEach((recipe, index) => {
      if (recipeID === recipe.id) {
        this.favoriteRecipes.splice(index, 1);
      }
    });
  }

  searchFavorites(nameFragment) {
    const lowerCaseWord = nameFragment.toLowerCase();
    const filteredFavorites = this.favoriteRecipes.filter(recipe => {
      return recipe.name.toLowerCase().includes(lowerCaseWord);
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
    const matchedRecipes = this.recipes.reduce((collection, recipe) => {
    const matchedIngredients = recipe.ingredients.find((ingredient) => {
      return ingredient.name === ingredientName;
    });
    if (matchedIngredients) {
      collection.push(recipe);
    }
    return collection;
    },[]);
    return matchedRecipes;
  }

  addToCookQueue(recipeID) {
    const matchedRecipe = this.recipes.find(recipe => {
      return recipe.id === recipeID;
    });
    if (!this.recipesToCook.includes(matchedRecipe)) {
      this.recipesToCook.push(matchedRecipe);
    }
  }

  searchCookQueue(nameFragment) {
    const lowerCaseWord = nameFragment.toLowerCase();
    const filteredQueue = this.recipesToCook.filter(recipe => {
      return recipe.name.toLowerCase().includes(lowerCaseWord);
    });
    return filteredQueue;
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
