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
      return sum += ingredient.cost;
    },0)
    return totalCost
  }

  giveInstructions() {
    return this.instructions;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Recipe;
}
