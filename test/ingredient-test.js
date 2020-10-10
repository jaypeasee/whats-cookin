const chai = require('chai');
const expect = chai.expect;

const Ingredient = require('../src/ingredient.js');

describe('Ingredient', () => {
  let ingredient1;
  let ingredient2;

  beforeEach(() => {
    ingredient1 = new Ingredient(1, "rosemary", 300);
    ingredient2 = new Ingredient(2, "thai mayo", 450);
  });

  it('should be a function', () => {
    expect(Ingredient).to.be.a('function');
  });

  it('should be an instance of Ingredient', () => {
    expect(ingredient1).to.be.an.instanceof(Ingredient);
  });

  it('should have an id', () => {
    expect(ingredient1.id).to.equal(1);
  });

  it('should be able to have a different id', () => {
    expect(ingredient2.id).to.equal(2);
  });

  it('should have a name', () => {
    expect(ingredient1.name).to.equal("rosemary");
  });

  it('should be able to have a different name', () => {
    expect(ingredient2.name).to.equal("thai mayo");
  });

  it('should have a cost in cents', () => {
    expect(ingredient1.cost).to.equal(300);
  });

  it('should be able to have a different cost', () => {
    expect(ingredient2.cost).to.equal(450);
  });
});
