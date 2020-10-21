const chai = require('chai');
const expect = chai.expect;

const User = require('../src/user.js');
const Recipe = require('../src/recipe.js');

describe('User', () => {
  let user1;
  let user2;
  let pantry1;
  let pantry2;
  let recipe1;
  let recipe2;
  let recipe3;
  let ingredient1;
  let ingredient2;

  beforeEach( () => {

    pantry1 = [{ ingredient: 1, amount: 4 }, { ingredient: 2, amount: 0 }, { ingredient: 3, amount: 10 }];

    pantry2 = [{ ingredient: 1, amount: 2 }, { ingredient: 2, amount: 22 }];

    ingredient1 = {name: "wheat flower", estimatedCostInCents: 582, id: 1, quantiy: {amount: 1.5, unit: "c" }}
    ingredient2 = {name: "bicarbonate of soda", estimatedCostInCents: 142 , id: 2, quantiy: {amount: .5, unit: "tsp" }}

    recipe1 = new Recipe(1, "Big image thing http", [ingredient1, ingredient2], [{ instruction: "boil em", number: 1 }, { instruction: "mash em", number: 2 }, { instruction: "stick em in a stew", number: 3 }], "pasta sauce", ["rabbit", "banana", "yup", "garlic"]);

    recipe2 = new Recipe(2, "another image", [ingredient1, ingredient2], [{ instruction: "chop it up", number: 2 }, { instruction: "put some butter on it", number: 2 }], "garlic bread", ["bread", "garlic", "italian"])

    recipe3 = new Recipe(3, "jpg", [ingredient2, ingredient1], [{ instruction: "boil water", number: 1 }, { instruction: "add salt", number: 2 }, { instruction: "soften noodles", number: 3 }], "pasta", ["pasta", "carbs", "italian"])

    recipe4 = new Recipe(4, "jpg", [ingredient2], [{ instruction: "boil water", number: 1 }, { instruction: "add salt", number: 2 }, { instruction: "soften noodles", number: 3 }], "pasta", ["pasta", "carbs", "italian"])

    user1 = new User('Coop', 1, pantry1, [recipe1, recipe2, recipe3, recipe4]);
    user2 = new User('JP', 2, pantry2, [recipe2, recipe3, recipe1]);
  });

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', () => {
    expect(user1).to.be.an.instanceof(User);
  });

  it('should have a name', () => {
    expect(user1.name).to.equal("Coop");
  });

  it('should be able to have a different name', () => {
    expect(user2.name).to.equal("JP");
  });

  it('should have an id', () => {
    expect(user1.id).to.equal(1);
  });

  it('should be able to have a different id', () => {
    expect(user2.id).to.equal(2);
  });

  it('should have a pantry of items', () => {
    expect(user1.pantry).to.deep.equal(pantry1);
  });

  it('should be able to have a different pantry', () => {
    expect(user2.pantry).to.deep.equal(pantry2);
  });

  it('should be able to have a list of recipes', () => {
    expect(user1.recipes).to.deep.equal([recipe1, recipe2, recipe3, recipe4]);
  });

  it('should be able to have a different list of recipes', () => {
    expect(user2.recipes).to.deep.equal([recipe2, recipe3, recipe1])
  })

  it('should have no favorite recipes to start', () => {
    expect(user1.favoriteRecipes).to.deep.equal([]);
  });

  it('should start with an empty list of recipes to cook', () => {
    expect(user1.recipesToCook).to.deep.equal([]);
  });

  it('should be able to add to their favorite recipes', () => {
    user1.addFavorite(recipe1);

    expect(user1.favoriteRecipes[0]).to.equal(recipe1);
  });

  it('should only be able to add unique recipes to favorites', () => {
    user1.addFavorite(recipe1);
    user1.addFavorite(recipe1);
    user1.addFavorite(recipe1);
    user1.addFavorite(recipe2);

    expect(user1.favoriteRecipes.length).to.equal(2);
  })

  it('should be able to remove from their favorite recipes', () => {
    user1.addFavorite(recipe1);
    user1.addFavorite(recipe2);
    user1.addFavorite(recipe3);

    user1.removeFavorite(recipe2.id);

    expect(user1.favoriteRecipes[1]).to.equal(recipe3);
  });

  it('should be able to search favorite recipes by name', () => {
    user1.addFavorite(recipe1);
    user1.addFavorite(recipe2);
    user1.addFavorite(recipe3);

    expect(user1.searchFavorites("Garlic bread")).to.deep.equal([recipe2]);
  });

  it('should be able to search for multiple favorites by name fragment', () => {
    user1.addFavorite(recipe1);
    user1.addFavorite(recipe2);
    user1.addFavorite(recipe3);

    expect(user1.searchFavorites("past")).to.deep.equal([recipe1, recipe3]);
  });

  it('favorites searches should not be case sensitive', () => {
    user1.addFavorite(recipe1);

    expect(user1.searchFavorites("pAsT")).to.deep.equal([recipe1]);
  })

  it('should be able to search recipes by tag', () => {
    user1.addFavorite(recipe1);

    expect(user1.filterByTag("Italian")).to.deep.equal([recipe2, recipe3, recipe4]);
  });

  it('search by tag should not be case sensitive', () => {
    user1.addFavorite(recipe1);

    expect(user1.filterByTag("ITaLiAn")).to.deep.equal([recipe2, recipe3, recipe4]);
  });

  it('should be able to search recipes by ingredient', () => {
    expect(user1.searchByIngredient(ingredient1.name)).to.deep.equal([recipe1, recipe2, recipe3]);
  });

  it('should be able to add to their recipes to cook list', () => {
    user1.addToCookQueue(recipe1.id);
    user1.addToCookQueue(recipe2.id);
    user1.addToCookQueue(recipe3.id);

    expect(user1.recipesToCook).to.deep.equal([recipe1, recipe2, recipe3]);
  })

  it('should not have duplicate recipes to cook in the cook list', () => {
    user1.addToCookQueue(recipe1.id);
    user1.addToCookQueue(recipe1.id);

    expect(user1.recipesToCook).to.deep.equal([recipe1])
  });

  it('should be able to search for recipes to cook by name', () => {
    user1.addToCookQueue(recipe1.id);
    user1.addToCookQueue(recipe2.id);
    user1.addToCookQueue(recipe3.id);

    expect(user1.searchCookQueue("past")).to.deep.equal([recipe1, recipe3]);
  });

  it('queue searches should not be case sensitive', () => {
    user1.addToCookQueue(recipe1.id);

    expect(user1.searchCookQueue("pAsT")).to.deep.equal([recipe1]);
  })
});
