import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Card.css';
import { likePokemon, unlikePokemon, isPokemonLiked } from '../../services/PokedexService';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const PokeballEmpty = "/pokeball_empty.png";
const PokeballFilled = "/pokeballfilled.jpg";

function PokemonCard({ pokemon }) {
    const { user } = useContext(AuthContext);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (user?._id) {
            isPokemonLiked(user._id, pokemon.id)
                .then(response => {
                    setIsFavorite(response.data.isLiked);
                })
                .catch(error => {
                    console.error('Error checking favorite status', error.message);
                });
        }
    }, [user, pokemon.id]);

    const handleLike = () => {
        if (user?._id) {
            if (isFavorite) {
                unlikePokemon(user._id, pokemon.id)
                    .then(response => {
                        console.log('Pokemon removed from favorites', response.data);
                        setIsFavorite(false);
                    })
                    .catch(error => {
                        console.error('Error removing from favorites', error.message);
                    });
            } else {
                likePokemon(user._id, pokemon)
                    .then(response => {
                        console.log('Pokemon added to favorites', response.data);
                        setIsFavorite(true);
                    })
                    .catch(error => {
                        console.error('Error adding to favorites', error.message);
                    });
            }
        } else {
            console.error('Please log in first');
        }
    };

    return (
        <div className="pokemon-card">
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
