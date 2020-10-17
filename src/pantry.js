class Pantry {
  constructor(pantry) {
    this.pantry = pantry;
  }
  evaluateIngredients(recipe) {
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
}
if (typeof module !== 'undefined') {
  module.exports = Pantry;
}


// this.pantry.forEach(item => {
//   if (item.ingredient === ingredient.id && ingredient.quantity.amount > item.amount) {
//     ingredientDetails.id = ingredient.id
//     ingredientDetails.amountNeeded = ingredient.quantity.amount - item.amount;
//   }
//   else if(item.ingredient !== ingredient.id) {
//     ingredientDetails.id = ingredient.id
//     ingredientDetails.amountNeeded = ingredient.quantity.amount;
//   }
// })
