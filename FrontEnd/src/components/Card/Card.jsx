import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Card.css';
import { likePokemon, unlikePokemon, isPokemonLiked } from '../../services/PokedexService';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import RingLoader from 'react-spinners/RingLoader';

const PokeballEmpty = "/pokeball_empty.png";
const PokeballFilled = "/pokeballfilled.jpg";

function PokemonCard({ pokemon }) {
    const { user } = useContext(AuthContext);
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?._id) {
            isPokemonLiked(user._id, pokemon.id)
                .then(response => {
                    setIsFavorite(response.isLiked); // Adjust this line to match response structure
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error checking favorite status', error.message);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [user, pokemon.id]);

    const handleLike = () => {
        if (user?._id) {
            setLoading(true);
            if (isFavorite) {
                unlikePokemon(user._id, pokemon.id)
                    .then(response => {
                        setIsFavorite(false);
                        setLoading(false);
                    })
                    .catch(error => {
                        console.error('Error removing from favorites', error.message);
                        setLoading(false);
                    });
            } else {
                likePokemon(user._id, pokemon)
                    .then(response => {
                        setIsFavorite(true);
                        setLoading(false);
                    })
                    .catch(error => {
                        console.error('Error adding to favorites', error.message);
                        setLoading(false);
                    });
            }
        } else {
            console.error('Please log in first');
        }
    };

    const mainType = pokemon.types[0].type.name; // Get the main type

    return (
        <div className={`pokemon-card ${mainType}`}>
            {loading ? (
                <div className="loader-container">
                    <RingLoader color={"#123abc"} loading={loading} size={50} />
                </div>
            ) : (
                <>
                    <h1>{pokemon.name}</h1>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={pokemon.name} />
                    <div className="types">
                        {pokemon.types.map((type, index) => (
                            <span key={index} className={`type ${type.type.name}`}>{type.type.name}</span>
                        ))}
                    </div>
                    <div className="buttons">
                        <Link to={`/details/${pokemon.name}`} className="details-button">
                            Details
                        </Link>
                        {user && (
                            <button className="like-button" onClick={handleLike}>
                                <img src={isFavorite ? PokeballFilled : PokeballEmpty} alt="Favorite" />
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

PokemonCard.propTypes = {
    pokemon: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        types: PropTypes.arrayOf(PropTypes.shape({
            type: PropTypes.shape({
                name: PropTypes.string.isRequired
            }).isRequired
        })).isRequired
    }).isRequired
};

export default PokemonCard;
