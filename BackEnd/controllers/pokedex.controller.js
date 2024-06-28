const { getPokemonList, getPokemonDetails, getEvolutionChain, getPokemonSpecies } = require('../services/PokeApiService')

module.exports.listPokemon = (req, res) => {
    getPokemonList()
    .then(pokemonList => {
        res.status(200).json(pokemonList)
    })
        .catch(error => {
            console.error('Error fetching Pokemon list:', error)
            res.status(500).json({ message: error.message })
        })
}

module.exports.getPokemonDetails = (req,res) => {
    const { name } = req.params
    getPokemonDetails(name)
    .then(pokemonDetails => res.status(200).json(pokemonDetails))
    .catch(error => {
        console.error('no list', error)
        res.status(500).json({message: error.message})
    })
}

module.exports.getPokemonSpecies = (req,res) => {
    const { name } = req.params
    getPokemonSpecies(name)
    .then(getPokemonSpecies => res.status(200).json(getPokemonSpecies))
    .catch(error => {
        console.error('error no species', error)
        res.status(404).send('Pokemon species not found')
    })
}