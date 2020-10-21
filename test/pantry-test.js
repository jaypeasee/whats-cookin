const chai = require('chai');
const expect = chai.expect;

const Pantry = require('../src/pantry.js');
const User = require('../src/user.js');

describe('Pantry', () => {
  let pantry1;
  let pantry2;
  let pantry3;
  let contents1;
  let contents2;
  let contents3;
  let recipe1;
  let recipe2;
  let recipe3;

  beforeEach(() => {
  recipe1 = {
   "id": 1,
   "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
   "ingredients": [
     {
       "name": "eggs",
       "id": 1,
       "quantity": {
         "amount": 0.5,
         "unit": "c"
       }
     },
     {
       "name": "bacon",
       "id": 2,
       "quantity": {
         "amount": 6,
         "unit": "tsp"
       }
     },
     {
       "name": "cheese",
       "id": 3,
       "quantity": {
         "amount": 10,
         "unit": "tsp"
       }
     }
   ],
   "instructions": [
     {
       "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
       "number": 1
     }
   ],
   "name": "Loaded Chocolate Chip Pudding Cookie Cups",
   "tags": [
     "antipasti"
   ]
  }

  recipe2 =  {
    "id": 2,
    "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
    "ingredients": [
      ,
      {
        "name": "grapes",
        "id": 3,
        "quantity": {
          "amount": 0.5,
          "unit": "tsp"
        }
      },
      {
        "name": "oranges",
        "id": 4,
        "quantity": {
          "amount": 24,
          "unit": "servings"
        }
      }
    ],
    "instructions": [
      {
        "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
        "number": 1
      }
    ],
    "name": "Loaded Chocolate Chip Pudding Cookie Cups",
    "tags": [
      "antipasti"
    ]
  }

  recipe3 =  {
    "id": 3,
    "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
    "ingredients": [
      ,
      {
        "name": "bread",
        "id": 5,
        "quantity": {
          "amount": 5,
          "unit": "tsp"
        }
      },
      {
        "name": "chips",
        "id": 6,
        "quantity": {
          "amount": 24,
          "unit": "servings"
        }
      }
    ],
    "instructions": [
      {
        "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
        "number": 1
      }
    ],
    "name": "Loaded Chocolate Chip Pudding Cookie Cups",
    "tags": [
      "antipasti"
    ]
  }

    contents1 = [{
        "ingredient":1,
        "amount": 4
      },
      {
        "ingredient": 2,
        "amount": 3
      },
      {
        "ingredient": 5,
        "amount": 10
      },
      {
        "ingredient": 6,
        "amount": 5
      }]

    contents2 = [
      {
        "ingredient": 7,
        "amount": 2
      },
      {
        "ingredient": 8,
        "amount": 2
      },
      {
        "ingredient": 9,
        "amount": 4
      },
      {
        "ingredient": 10,
        "amount": 3
      }]

      contents3 = [
        {
          "ingredient": 1,
          "amount": .5
        },
        {
          "ingredient": 2,
          "amount": 9
        },
        {
          "ingredient": 3,
          "amount": 10
        },
        {
          "ingredient": 6,
          "amount": 3
        }]

        // {
        //   "name": "eggs",
        //   "id": 1,
        //   "quantity": {
        //     "amount": 0.5,
        //     "unit": "c"
        //   }
        // },
        // {
        //   "name": "bacon",
        //   "id": 2,
        //   "quantity": {
        //     "amount": 6,
        //     "unit": "tsp"
        //   }
        // },
        // {
        //   "name": "cheese",
        //   "id": 3,
        //   "quantity": {
        //     "amount": 10,
        //     "unit": "tsp"
        //   }
        // }
    pantry1 = new Pantry(contents1);
    pantry2 = new Pantry(contents2);
    pantry3 = new Pantry(contents3);
    user1 = new User('Jp', 1, pantry1, [recipe1, recipe2, recipe3]);
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
    expect(pantry2.pantry[2].amount).to.equal(4);
  });

  it('should be able to evaluate what ingredients are needed to cook a recipe', () => {
    expect(pantry1.evaluateNeededIngredients(recipe1)).to.deep.equal([{id:2, amountNeeded: 3}, {id: 3, amountNeeded: 10 }]);
  });

  it('should be able to evaluate ingredients for another recipe', () => {
    expect(pantry1.evaluateNeededIngredients(recipe2)).to.deep.equal([{id:3, amountNeeded: .5}, {id: 4, amountNeeded: 24 }]);
  });

  it('should be able to evaluate a different user pantry', () => {
    expect(pantry2.evaluateNeededIngredients(recipe2)).to.deep.equal([{id:3, amountNeeded: .5}, {id: 4, amountNeeded: 24 }])
  });

  it('should return an empty array if there is enough ingredients', () => {
    expect(pantry3.evaluateNeededIngredients(recipe1)).to.deep.equal([]);
  });

  it('should be able to return a more detailed list of each pantry item', () => {
    expect(pantry1.addDetailsToItems(user1.recipes)).to.deep.equal([{id: 1, name: "eggs", amount: 4, unit: "c"},
  {id: 2, name: "bacon", amount: 3, unit: "tsp"}, {id: 5, name: "bread", amount: 10, unit: "tsp"}, {id: 6, name: "chips", amount: 5, unit: "servings"}]);
});

  it('should remove ingredients from pantry when recipe is added to cook',() => {
    pantry3.removePantryIngredients(recipe1);

    expect(pantry3.pantry).to.deep.equal([{ingredient: 2, amount: 3}, {ingredient: 6, amount: 3}]);
  });

});
