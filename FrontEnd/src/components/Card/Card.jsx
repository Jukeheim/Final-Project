import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import './Card.css'
import { likePokemon } from '../../services/PokedexService';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';


function PokemonCard ({ pokemon }) {
    const { user } = useContext(AuthContext)
    
        const handleLike = () => {
            if (user?._id) {
            likePokemon(user._id, pokemon)
            .then(response => {
                console.log('pokemon liked', response.data)
            })
            .catch(error => {
                console.error('not functioning', error.message)
            })
        } 
        else {
            console.error('Log in first')
        }
    }
    

    return(
        <div className="pokemon-card">
            <h1>{pokemon.name}</h1>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={pokemon.name} />
            <div className="types">
                {pokemon.types.map((type,index) =>(
                    <span key={index} className={`type ${type.type.name}`}>{type.type.name}</span>
                ))}
            </div>
            <div className="buttons">
                <Link to = {`/details/${pokemon.name}`}>
                <button>Details</button>
                </Link>
                {user && (<button className="like-button" onClick={handleLike}>Add to your Favorites</button>
            )}    
            </div>
        </div>
    )
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



export default PokemonCard