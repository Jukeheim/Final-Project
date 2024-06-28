
import { useState, useEffect } from 'react';
import { getPokemonList } from '../../services/PokedexService';
import PokemonCard from '../../components/Card/Card';
import './Pokedex.css'
function Pokedex() {
    const [pokemonList, setPokemonList] = useState([]);
    const [error, setError] = useState(null);

   useEffect(() => {
    getPokemonList()
    .then(data => {
        return Promise.all(data.map(pokemon => {
            return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
            .then(response => response.json())
            .then(details => ({
                ...pokemon,
                id: details.id,
                types: details.types
            }))
        }))
    })
   .then(detailedPokemonList => setPokemonList(detailedPokemonList))
   .catch(error => setError(error.message))
},[])
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Pokémon List</h1>
            <div className="pokemon-list">
                {pokemonList.map((pokemon, i) => (
                    <PokemonCard key ={i} pokemon={pokemon} />
                ))}
            </div>
        </div>
    );
}

export default Pokedex;
