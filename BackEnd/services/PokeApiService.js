const axios = require('axios')

function getPokemonList(){
    return axios.get('https://pokeapi.co/api/v2/pokemon?limit=100')
    .then(response => response.data.results)
    .catch(error => {
        console.error('NO DATA FOUND!', error)
        throw error
    })
}

const getPokemonDetails = (name) => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(response => response.data)
    .catch(error => {
        console.error('error found', error)
        return null
    })
}

const getPokemonSpecies = (name) => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
    .then(response => response.data)
    .catch(error => {
        console.error('no species found', error)
        return null
    })
}

const getEvolutionChain = (url) => {
    return axios.get(url)
    .then(response => response.data)
    .catch(error => {
        console.error('error no evolution chain', error)
        return null
    })
}

module.exports = { 
    getPokemonList,
    getPokemonDetails,
    getPokemonSpecies,
    getEvolutionChain
}