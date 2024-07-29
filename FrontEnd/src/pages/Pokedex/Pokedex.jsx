import { useState, useEffect, useContext } from 'react';
import { getPokemonList, getLikedPokemons } from '../../services/PokedexService';
import PokemonCard from '../../components/Card/Card';
import { AuthContext } from '../../contexts/AuthContext';
import './Pokedex.css';
import RingLoader from 'react-spinners/RingLoader';

function Pokedex() {
    const [pokemonList, setPokemonList] = useState([]);
    const [error, setError] = useState(null);
    const [displayCount, setDisplayCount] = useState(8);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [allTypes, setAllTypes] = useState([]);
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

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
                        }));
                }));
            })
            .then(detailedPokemonList => {
                if (user?._id) {
                    getLikedPokemons(user._id)
                        .then(likedPokemons => {
                            const likedPokemonIds = likedPokemons.map(p => p.pokemonId);
                            detailedPokemonList.forEach(pokemon => {
                                pokemon.isLiked = likedPokemonIds.includes(pokemon.id);
                            });
                            setPokemonList(detailedPokemonList);
                            setAllTypes([...new Set(detailedPokemonList.flatMap(pokemon => pokemon.types.map(type => type.type.name)))]);
                        })
                        .catch(error => setError(error.message))
                        .finally(() => setLoading(false));
                } else {
                    setPokemonList(detailedPokemonList);
                    setAllTypes([...new Set(detailedPokemonList.flatMap(pokemon => pokemon.types.map(type => type.type.name)))]);
                    setLoading(false);
                }
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [user]);

    const handleLoadMore = () => {
        setDisplayCount(prevCount => prevCount + 8);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
        setDisplayCount(8);
    };

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
        setDisplayCount(8);
    };

    const filteredPokemonList = pokemonList.filter(pokemon => {
        const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm);
        const matchesType = selectedType ? pokemon.types.some(type => type.type.name === selectedType) : true;
        return matchesSearch && matchesType;
    });

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="pokedex-container">
            <h1>Pokémon List</h1>
            <div className="search-filter-container">
                <input
                    type="text"
                    placeholder="Search Pokémon"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-bar"
                />
                <select value={selectedType} onChange={handleTypeChange} className="filter-dropdown">
                    <option value="">All Types</option>
                    {allTypes.map((type, i) => (
                        <option key={i} value={type}>{type}</option>
                    ))}
                </select>
            </div>
            {loading ? (
                <div className="loader-container">
                    <RingLoader color={"#123abc"} loading={loading} size={150} />
                </div>
            ) : (
                <div className="pokemon-list">
                    {filteredPokemonList.slice(0, displayCount).map((pokemon, i) => (
                        <PokemonCard key={i} pokemon={pokemon} />
                    ))}
                </div>
            )}
            {displayCount < filteredPokemonList.length && (
                <button onClick={handleLoadMore} className="load-more-button">Load More</button>
            )}
        </div>
    );
}

export default Pokedex;
