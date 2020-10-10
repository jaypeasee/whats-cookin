const chai = require('chai');
const expect = chai.expect;

const User = require('../src/user.js');
const Recipe = require('../src/recipe.js');
const Ingredient = require('../src/ingredient.js');

describe('User', () => {
  let user1;
  let user2;
  let pantry1;
  let pantry2;
  let recipe1;
  let ingredient1;

  beforeEach( () => {
    user1 = new User('Coop', 1, pantry1);
    user2 = new User('JP', 2, pantry2);

    pantry1 = [{ ingredient: 55, amount: 4 }, { ingredient: 1234, amount: 0 }, { ingredient: 4321, amount: 10 }];

    pantry2 = [{ ingredient: 869, amount: 2 }, { ingredient: 1098, amount: 22 }];

    ingredient1 = new Recipe(1, "rosemary", 300);
    ingredient2 = new Recipe(2, "thai mayo", 666);

    recipe1 = new Recipe(1, "Big image thing http", [ingredient1, ingredient2], [{ instruction: "boil em", number: 1 }, { instruction: "mash em", number: 2 }, { instruction: "stick em in a stew", number: 3 }], "Gollems favorite", ["rabbit", "banana", "yup"]);

    recipe2 = new Recipe()
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

  it('should have no favorite recipes to start', () => {
    expect(user1.favoritesRecipes).to.deep.equal([]);
  });

  it('should have an empty shopping list to start', () => {
    expect(user1.shoppingList).to.deep.equal([]);
  });

  it('should start with an empty list of recipes to cook', () => {
    expect(user1.recipesToCook).to.deep.equal([]);
  });

  it('should be able to add to their favorite recipes', () => {
    user1.addFavorite(recipe1);

    expect(user1.favoritesRecipes[0]).to.equal(recipe1);
  });

  it('should be able to remove from their favorite recipes', () => {
    user1.addFavorite(recipe1);

    user1.removeFavorite(recipe1.id);


  })


});
