class Pantry {
  constructor(pantry) {
    this.pantry = pantry;
  }
};
//   evaluateIngredients(recipe) {
//     const neededIngredients = recipe.ingredients.reduce((acc, ingredient) => {
//       const matchedIngredient = this.pantry.find(item => {
//         return item.id === ingredient.id
//       })
//       if (matchedIngredient) {
//         acc[matchedIngredient.id] =
//       },[]);
//     //loop through recipe.ingredients to get the id of each
//     //loop through this.pantry to get the id of each
//     //if the recipe.ingredient id === any this.pantry id do
//     //return [{id: 1, amountNeeded: 7}]
//     //if the array stays empty then you push the recipe to cooking List
//     //if the array
//   }
// }
if (typeof module !== 'undefined') {
  module.exports = Pantry;
}
