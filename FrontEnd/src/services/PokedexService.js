import axios from 'axios'

export function getPokemonList(offset = 0, limit = 6) {
    return axios.get(`http://localhost:3000/pokemon?offset=${offset}&limit=${limit}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching', error);
            throw error;
        });
}

export function getPokemonDetails(name){
    return axios.get(`http://localhost:3000/pokemon/${name}`)
    .then(response => response.data)
    .catch(error => {
        console.error('error', error)
        return null
    })
}

export function getPokemonSpecies(name){
    return axios.get(`http://localhost:3000/pokemon-species/${name}`)
    .then(response => response.data)
    .catch(error => {
        console.error('errror', error)
        return null
    })
}

export function getEvolutionChain(url) {
    return axios.get(url)
    .then(response => response.data)
    .catch(error => {
        console.error('errorrr', error)
        return null
    })
}

export function likePokemon(userId, pokemon){
    return axios.post("http://localhost:3000/pokemon/like", {
        userId,
        pokemonId: pokemon.id,
        pokemonName: pokemon.name,
        pokemonTypes: pokemon.types.map(type => type.type.name)

    })
}

export function getLikedPokemons(userId){
    return axios.get(`http://localhost:3000/pokemon/liked/${userId}`)
}