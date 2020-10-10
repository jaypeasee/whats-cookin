class Recipe {
  constructor(id, img, ingredients, instructions, tags, name){
    this.id = id;
    this.img = img;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.tags = tags;
    this.name = name;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Recipe;
}
