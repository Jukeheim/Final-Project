const axios = require('axios');

const pokeApiBaseURL = 'https://pokeapi.co/api/v2';

function getPokemonList() {
    return axios.get(`${pokeApiBaseURL}/pokemon?limit=100`)
        .then(response => response.data.results)
        .catch(error => {
            console.error('NO DATA FOUND!', error);
            throw error;
        });
}

function getPokemonDetails(name) {
    return axios.get(`${pokeApiBaseURL}/pokemon/${name}`)
        .then(response => response.data)
        .catch(error => {
            console.error('error found', error);
            return null;
        });
}

function getPokemonSpecies(name) {
    return axios.get(`${pokeApiBaseURL}/pokemon-species/${name}`)
        .then(response => response.data)
        .catch(error => {
            console.error('no species found', error);
            return null;
        });
}

function getEvolutionChain(url) {
    return axios.get(url)
        .then(response => response.data)
        .catch(error => {
            console.error('error no evolution chain', error);
            return null;
        });
}

module.exports = {
    getPokemonList,
    getPokemonDetails,
    getPokemonSpecies,
    getEvolutionChain
};
