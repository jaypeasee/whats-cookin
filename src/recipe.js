class Recipe {
  constructor(id, img, ingredients, instructions, tags, name){
    this.id = id;
    this.img = img;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.tags = tags;
    this.name = name;
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
