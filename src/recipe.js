class Recipe {
  constructor(id, image, ingredients, instructions, name, tags){
    this.id = id;
    this.image = image;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.name = name;
    this.tags = tags;
  }

  calculateCost() {
    const totalCost = this.ingredients.reduce((sum, ingredient) => {
      sum = Math.round(((sum + ingredient.estimatedCostInCents) / 100));
      return sum
    }, 0);
    return totalCost;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Recipe;
}
