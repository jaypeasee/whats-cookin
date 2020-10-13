const chai = require('chai');
const expect = chai.expect;

const Pantry = require('../src/pantry.js');

describe('Pantry', () => {
  let pantry1;
  let pantry2;
  let contents1
  let contents2

  beforeEach(() => {
    contents1 = [{ ingredient: 1, amount: 2 }, { ingredient: 2, amount: 70 }, { ingredient: 3, amount: 5.4 }];

    contents2 = [{ ingredient: 4, amount: .5 }, { ingredient: 5, amount: 666 }, { ingredient: 6, amount: 40 }];

    pantry1 = new Pantry(contents1);
    pantry2 = new Pantry(contents2);
  });

  it('should be a function', () => {
    expect(Pantry).to.be.a('function');
  });

  it('should be an instance of Pantry', () => {
    expect(pantry1).to.be.an.instanceof(Pantry);
  });

  it('should have a contents of items', () => {
    expect(pantry1.pantry).to.deep.equal(contents1);
  });

  it('should be able to have a different contents', () => {
    expect(pantry2.pantry).to.deep.equal(contents2);
  });

  it('each item in the contents should have an ingredient id', () => {
    expect(pantry1.pantry[1].ingredient).to.equal(2);
  });

  it('each item in the contents should have an amount', () => {
    expect(pantry2.pantry[2].amount).to.equal(40);
  });
});
