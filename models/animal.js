const mongoose = require('mongoose');

const animalSchema = mongoose.Schema({
  species: { type: String, required: true },
  habitat: { type: String, required: true },
  lifespan: { type: Number, required: true },
});

module.exports = mongoose.model("Animal", animalSchema);