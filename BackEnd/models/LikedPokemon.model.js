const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likedPokemonSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    pokemonId: {
        type: Number,
        required: true
    },
    pokemonName: {
        type: String,
        required: true
    },
    pokemonTypes: {
        type: [String],
        required: true
    }
}, {
    timestamps: true
});

const LikedPokemon = mongoose.model('LikedPokemon', likedPokemonSchema);

module.exports = LikedPokemon;
