import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { getLikedPokemons } from "../../services/PokedexService";
import { getEventList } from "../../services/EventService";
import "./Profile.css";

function Profile() {
    const { user } = useContext(AuthContext);
    const [likedPokemons, setLikedPokemons] = useState([]);
    const [createdEvents, setCreatedEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user?._id) {
            Promise.all([
                getLikedPokemons(user._id),
                getEventList()
            ])
                .then(([likedPokemonsResponse, eventListResponse]) => {
                    console.log("Liked Pokemons Response: ", likedPokemonsResponse);
                    console.log("Event List Response: ", eventListResponse);

                    setLikedPokemons(likedPokemonsResponse || []);
                    const userEvents = eventListResponse.filter(event => event.createdBy._id === user._id);
                    setCreatedEvents(userEvents);
                })
                .catch(error => {
                    console.error('Error fetching profile data', error);
                    setError('Error fetching profile data');
                })
                .finally(() => setLoading(false));
        }
    }, [user]);

    if (loading) {
        return <div>Loading profile...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="profile">
            <div className="profile-header">
                <img src={user?.profilePicture} alt="Profile" className="profile-picture" />
                <p className="username">{user?.username}</p>
            </div>
            <div className="content">
                <div className="favorites">
                    <h2 className="favorites-title">Favorite Pokémon</h2>
                    <div className="liked-pokemons">
                        {likedPokemons.length > 0 ? (
                            likedPokemons.map(pokemon => {
                                const mainType = pokemon.pokemonTypes[0];
                                return (
                                    <div key={pokemon.pokemonId} className={`pokemon-card ${mainType}`}>
                                        <h1>{pokemon.pokemonName}</h1>
                                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemonId}.png`} alt={pokemon.pokemonName} />
                                        <div className="types">
                                            {pokemon.pokemonTypes.map((type, index) => (
                                                <span key={index} className={`type ${type}`}>{type}</span>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p>No favorite Pokémon</p>
                        )}
                    </div>
                </div>
                <div className="events">
                    <h2 className="events-title">My Events</h2>
                    <ul>
                        {createdEvents.length > 0 ? (
                            createdEvents.map(event => (
                                <div key={event._id} className="event-card">
                                    <h3>{event.name}</h3>
                                
                                    <p>Participants: {event.participants.length}/{event.maxParticipants}</p>
                                </div>
                            ))
                        ) : (
                            <p>No events created</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Profile;
