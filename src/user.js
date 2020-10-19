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

  addToCook(recipeID) {
    const matchedRecipe = this.recipes.find(recipe => {
      return recipe.id === recipeID
    })
    if (!this.recipesToCook.includes(matchedRecipe)) {
      this.recipesToCook.push(matchedRecipe);
    }
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
