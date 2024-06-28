const LikedPokemon = require('../models/LikedPokemon.model');

module.exports.addLikedPokemon = (req, res) => {
    const { userId, pokemonId, pokemonName, pokemonTypes } = req.body;
    const likedPokemon = new LikedPokemon({ userId, pokemonId, pokemonName, pokemonTypes });
    likedPokemon.save()
        .then(savedPokemon => {
            res.status(201).json(savedPokemon);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};

module.exports.getLikedPokemons = (req, res) => {
    const { userId } = req.params;
    LikedPokemon.find({ userId })
        .then(likedPokemons => {
            res.status(200).json(likedPokemons);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};
