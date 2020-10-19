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
