import { useState, useEffect } from 'react'
import { getPokemonList } from '../../services/PokedexService'
import PokemonCard from '../../components/Card/Card'
import './Pokedex.css'

function Pokedex() {
    const [pokemonList, setPokemonList] = useState([])
    const [error, setError] = useState(null)
    const [displayCount, setDisplayCount] = useState(8)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedType, setSelectedType] = useState('')
    const [allTypes, setAllTypes] = useState([])

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
            .then(detailedPokemonList => {
                setPokemonList(detailedPokemonList)
                setAllTypes([...new Set(detailedPokemonList.flatMap(pokemon => pokemon.types.map(type => type.type.name)))])
            })
            .catch(error => setError(error.message))
    }, [])

    const handleLoadMore = () => {
        setDisplayCount(prevCount => prevCount + 8)
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase())
        setDisplayCount(8)
    }

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value)
        setDisplayCount(8) 
    }

    const filteredPokemonList = pokemonList.filter(pokemon => {
        const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm)
        const matchesType = selectedType ? pokemon.types.some(type => type.type.name === selectedType) : true
        return matchesSearch && matchesType
    })

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div>
            <h1>Pokémon List</h1>
            <div>
                <input
                    type="text"
                    placeholder="Search Pokémon"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <select value={selectedType} onChange={handleTypeChange}>
                    <option value="">All Types</option>
                    {allTypes.map((type, i) => (
                        <option key={i} value={type}>{type}</option>
                    ))}
                </select>
            </div>
            <div className="pokemon-list">
                {filteredPokemonList.slice(0, displayCount).map((pokemon, i) => (
                    <PokemonCard key={i} pokemon={pokemon} />
                ))}
            </div>
            {displayCount < filteredPokemonList.length && (
                <button onClick={handleLoadMore}>Load More</button>
            )}
        </div>
    )
}

export default Pokedex
