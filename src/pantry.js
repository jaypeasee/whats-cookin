class Pantry {
  constructor(pantry) {
    this.pantry = pantry;
  }

  evaluateNeededIngredients(recipe) {
    const neededIngredients = recipe.ingredients.reduce((acc, ingredient) => {
      const matchedID = this.pantry.find(item =>{
        return item.ingredient === ingredient.id
      })
      if (matchedID && ingredient.quantity.amount > matchedID.amount) {
        const ingredientDetails = {id: ingredient.id, amountNeeded: ingredient.quantity.amount - matchedID.amount};
        acc.push(ingredientDetails);
      } else if (!matchedID) {
        const ingredientDetails = {id: ingredient.id, amountNeeded: ingredient.quantity.amount}
        acc.push(ingredientDetails);
      }
      return acc
    }, []);
    return neededIngredients;
  }

  addDetailsToItems(allRecipes) {
    const allPantryDetails = this.pantry.reduce((acc, item) => {
      const updatedIngredient = {};
      allRecipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
          if (item.ingredient === ingredient.id) {
            updatedIngredient.id = ingredient.id;
            updatedIngredient.name = ingredient.name;
            updatedIngredient.amount = item.amount;
            updatedIngredient.unit = ingredient.quantity.unit;
          }
        })
        if (!acc.includes(updatedIngredient)) {
          acc.push(updatedIngredient);
        }
      })
      return acc;
    }, []);
    return allPantryDetails;
  }

  removePantryIngredients(recipe) {
    this.pantry.forEach(item => {
      recipe.ingredients.forEach((ingredient) => {
        if (item.ingredient === ingredient.id) {
          item.amount -= ingredient.quantity.amount;
        }
      });
    });
    this.pantry = this.pantry.filter((item) => {
      return item.amount > 0;
    });
  }
}

if (typeof module !== 'undefined') {
  module.exports = Pantry;
}
