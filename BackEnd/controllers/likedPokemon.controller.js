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

module.exports.isPokemonLikedByUser = (req, res) => {
    const { userId, pokemonId } = req.query;
    const numericPokemonId = Number(pokemonId);

    LikedPokemon.findOne({ userId: userId.toString(), pokemonId: numericPokemonId })
        .then(likedPokemon => {
            res.status(200).json({ isLiked: !!likedPokemon });
        })
        .catch(error => {
            console.error('Error checking liked status:', error);
            res.status(500).json({ message: error.message });
        });
};

module.exports.unlikePokemon = (req, res) => {
    const { userId, pokemonId } = req.body;
    LikedPokemon.findOneAndDelete({ userId, pokemonId })
        .then(deletedPokemon => {
            if (deletedPokemon) {
                res.status(200).json(deletedPokemon);
            } else {
                res.status(404).json({ message: 'Pokemon not found' });
            }
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};
