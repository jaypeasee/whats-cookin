class User {
  constructor(name, id, pantry) {
    this.name = name;
    this.id = id;
    this.pantry = pantry;
    this.favoritesRecipes = [];
    this.shoppingList = [];
    this.recipesToCook = [];
  }

  addFavorite(recipe) {
    this.favoritesRecipes.push(recipe);
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
