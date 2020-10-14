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
    this.favoriteRecipes.push(recipe);
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

  searchAllRecipes(nameFragment) {
    const filteredRecipes = this.recipes.filter(recipe => {
      return recipe.name.toLowerCase().includes(nameFragment.toLowerCase())
    });
    return filteredRecipes;
  }

  searchByTag(tagName) {
    const filteredTags = this.recipes.filter(recipe => {
      return recipe.tags.includes(tagName.toLowerCase());
    });
    return filteredTags;
  }

  searchByIngredient(searchedIngredient) {
    const allIngredients = this.recipes.reduce((acc, recipe) => {
       const exactIngredient = recipe.ingredients.find((ingredient) => {
         return ingredient.id === searchedIngredient.id;
      })
      acc.push(exactIngredient);
      return acc;
    },[]);

    const filteredRecipes = this.recipes.reduce((acc, recipe) => {
      const matchedIngredients = allIngredients.find((ingredient) => {
        return recipe.ingredients.includes(ingredient.id)
      })
    acc.push(recipe);
      return acc;
    },[]);
    return filteredRecipes;
  }

  chooseRecipe(recipe) {
    //loop through pantry.
    //loop through recipe ingredients
    //if item.id === recipe.ingredients.id
    //and if item.quantity >= recipe.ingredients.quantity
    //push into this.recipesToCook

    //else
    //create variable of amount
    //recipe.ingredients.quantiy - item.quantity
    //new object assigned to
    // name: recipe.ingredients.name
    //amount: amount
    //cost: amount * recipe.ingredients.estimatedCostInCents
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
