class Recipe {
  constructor(id, image, ingredients, instructions, name, tags) {
    this.id = id;
    this.image = image;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.name = name;
    this.tags = tags;
  }

  calculateCost() {
    let totalCost = this.ingredients.reduce((sum, ingredient) => {
      sum = ((sum + ingredient.estimatedCostInCents));
      return sum;
    }, 0);
    totalCost = Math.round(totalCost / 100);
    return totalCost;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Recipe;
}
