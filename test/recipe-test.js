const chai = require('chai');
const expect = chai.expect;
const Ingredient = require('../src/ingredient.js');
const Recipe = require('../src/recipe.js');


describe('Recipe', () =>{
  let ingredient1;
  let ingredient2;
  let ingredient3;
  let ingredient4;
  let instructions1;
  let instructions2;
  let tags1;
  let tags2;
  let name1;
  let name2;
  let recipe1;
  let recipe2;

  beforeEach(() => {
    ingredient1 = new Ingredient(1, "rosemary", 300);
    ingredient2 = new Ingredient(2, "thai mayo", 001);
    ingredient3 = new Ingredient(3, "cheese", 230);
    ingredient4 = new Ingredient(4, "pepper", 234);
    instructions1 = [{instruction: 'shake it the rosemary', number: 1}, {instruction: 'put it on your food', number: 2}];
    instructions2 = [{instruction: 'put the lotion on the skin - jp', number: 1}, {instruction: 'that was weird..but i like it -ct', number: 2}];
    tags1 = ['tag', 'bag', 'jag', 'rag', 'nag'];
    tags2 = ['orange', 'uhhh', 'something', 'about', 'a door?'];
    name1 = 'Jalapeno Poppers';
    name2 = 'Fat Boy Lotion';
    recipe1 = new Recipe(1, 'https://ketocookingchristian.com/wp-content/uploads/2018/05/Pepperoni-Pizza-Bagels.jpg', [ingredient1, ingredient2], instructions1, tags1, name1);
    recipe2 = new Recipe(2, 'https://images.heb.com/is/image/HEBGrocery/002755125', [ingredient3, ingredient4], instructions2, tags2, name2);
  });

  it('should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('should create an instance of Recipe', () => {
    expect(recipe1).to.be.an.instanceof(Recipe);
  });

  it('should have an id', () => {
    expect(recipe1.id).to.equal(1);
  });

  it('should be able to have a different id', () => {
    expect(recipe2.id).to.equal(2);
  });

  it('should have an image', () => {
    expect(recipe1.img).to.equal('https://ketocookingchristian.com/wp-content/uploads/2018/05/Pepperoni-Pizza-Bagels.jpg');
  });

  it('should be able to have a different img', () => {
    expect(recipe2.img).to.equal('https://images.heb.com/is/image/HEBGrocery/002755125');
  });

  it('should have a list of ingredients', () => {
    expect(recipe1.ingredients[0]).to.equal(ingredient1);
    expect(recipe1.ingredients[1]).to.equal(ingredient2);
  });

  it('should be able to have a different list of ingredients', () => {
    expect(recipe2.ingredients[0]).to.equal(ingredient3);
    expect(recipe2.ingredients[1]).to.equal(ingredient4);
  });

  it('should have a list of instructions', () => {
    expect(recipe1.instructions).to.deep.equal(instructions1);
  });

  it('should be able to have different instructions', () => {
    expect(recipe2.instructions).to.deep.equal(instructions2);
  });

  it('should have tags', () => {
    expect(recipe1.tags).to.equal(tags1);
  });

  it('should be able to have different tags', () => {
    expect(recipe2.tags).to.equal(tags2);
  });

  it('should have a name', () => {
    expect(recipe1.name).to.equal(name1);
  });

  it('should be able to have a different name', () => {
    expect(recipe2.name).to.equal(name2);
  });

  it('should return the cost of ingredients', () => {
    expect(recipe1.calculateCost()).to.equal(301);
  });

  it('should be able to return a different cost', () => {
    expect(recipe2.calculateCost()).to.equal(464);
  })
});
