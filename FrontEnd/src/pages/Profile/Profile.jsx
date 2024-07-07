import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { getLikedPokemons } from "../../services/PokedexService"

function Profile() {
    const { user } = useContext(AuthContext)
    const [likedPokemons, setLikedPokemons] = useState([])

    useEffect(() => {
        if (user?._id) {
            getLikedPokemons(user._id)
                .then(response => {
                    setLikedPokemons(response.data)
                })
                .catch(error => {
                    console.error('no data', error)
                })
        }
    }, [user])
    

    return (
        <div className="profile">
            <h1>Profile</h1>
            <p>{user?.email}</p>
            <h2>Favorites</h2>
            <div className="liked-pokemons">
                {likedPokemons.map(pokemon => (
                    <div key={pokemon.pokemonId} className="pokemon-card">
                        <h1>{pokemon.pokemonName}</h1>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemonId}.png`} alt={pokemon.pokemonName} />
                        <div className="types">
                            {pokemon.pokemonTypes.map((type, index) => (
                                <span key={index} className={`type ${type}`}>{type}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Profile
