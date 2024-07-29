import createHttp from "./BaseService";

const http = createHttp(true);

export function getPokemonList(offset = 0, limit = 6) {
    return http.get(`/pokemon?offset=${offset}&limit=${limit}`)
        .then(response => response)
        .catch(error => {
            console.error('Error fetching', error);
            throw error;
        });
}

export function getPokemonDetails(name) {
    return http.get(`/pokemon/${name}`)
        .then(response => response)
        .catch(error => {
            console.error('error', error);
            return null;
        });
}

export function getPokemonSpecies(name) {
    return http.get(`/pokemon-species/${name}`)
        .then(response => response)
        .catch(error => {
            console.error('error', error);
            return null;
        });
}

export function getEvolutionChain(url) {
    return http.get(url)
        .then(response => response.data)
        .catch(error => {
            console.error('error', error);
            return null;
        });
}

export function likePokemon(userId, pokemon) {
    return http.post(`/liked-pokemon`, {
        userId,
        pokemonId: pokemon.id,
        pokemonName: pokemon.name,
        pokemonTypes: pokemon.types.map(type => type.type.name)
    });
}

export function unlikePokemon(userId, pokemonId) {
    return http.post(`/liked-pokemon/unlike`, {
        userId,
        pokemonId
    });
}

export function isPokemonLiked(userId, pokemonId) {
    return http.get(`/liked-pokemon/isLiked`, {
        params: { userId, pokemonId }
    });
}

export function getLikedPokemons(userId) {
    return http.get(`/liked-pokemon/${userId}`);
}
