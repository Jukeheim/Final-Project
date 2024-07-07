import { useEffect, useState } from "react"
import { registerPokemons } from "../../services/EventService"
import "./RegisterPokemon.css"

const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=100'

function RegisterPokemons({ eventId, onRegister }) {
    const [pokemons, setPokemons] = useState(["", "", ""])
    const [pokemonList, setPokemonList] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(POKEMON_API_URL)
            .then(response => response.json())
            .then(data => setPokemonList(data.results))
            .catch(error => setError(error.message))
    }, [])

    const handleRegister = () => {
        if (pokemons.some(pokemon => pokemon === "")) {
            alert('You must register exactly 3 pokemons')
            return
        }
        registerPokemons(eventId, pokemons)
            .then(onRegister)
            .catch(error => console.error("Error registering pokemons:", error))
    }

    const handleChange = (index, value) => {
        const newPokemons = [...pokemons]
        newPokemons[index] = value
        setPokemons(newPokemons)
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div>
            <h3>Register Your Pokémon</h3>
            {pokemons.map((pokemon, index) => (
                <select key={index} value={pokemon} onChange={(e) => handleChange(index, e.target.value)}>
                    <option value="">Select Pokémon {index + 1}</option>
                    {pokemonList.map(p => (
                        <option key={p.name} value={p.name}>{p.name}</option>
                    ))}
                </select>
            ))}
            <button onClick={handleRegister}>Register</button>
        </div>
    )
}

export default RegisterPokemons
