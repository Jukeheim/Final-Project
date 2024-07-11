import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { getLikedPokemons } from "../../services/PokedexService";
import { getEventList } from "../../services/EventService";
import "./Profile.css";

function Profile() {
    const { user } = useContext(AuthContext);
    const [likedPokemons, setLikedPokemons] = useState([]);
    const [createdEvents, setCreatedEvents] = useState([]);

    useEffect(() => {
        if (user?._id) {
            getLikedPokemons(user._id)
                .then(response => {
                    setLikedPokemons(response.data);
                })
                .catch(error => {
                    console.error('no data', error);
                });

            getEventList()
                .then(data => {
                    const userEvents = data.filter(event => event.createdBy._id === user._id);
                    setCreatedEvents(userEvents);
                })
                .catch(error => {
                    console.error('no data', error);
                });
        }
    }, [user]);

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
                <div className="events">
                    <h2 className="events-title">My Events</h2>
                    <ul>
                        {createdEvents.map(event => (
                            <div key={event._id} className="event-card">
                                <h3>{event.name}</h3>
                                <p>Date: {new Date(event.date).toLocaleString()}</p>
                                <p>Participants: {event.participants.length}/{event.maxParticipants}</p>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Profile;
