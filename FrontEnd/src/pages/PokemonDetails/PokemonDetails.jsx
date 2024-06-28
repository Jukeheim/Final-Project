import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPokemonDetails, getPokemonSpecies, getEvolutionChain } from '../../services/PokedexService'
import './PokemonDetails.css'

function PokemonDetails(){
    const { name } = useParams();
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const [speciesDetails, setSpeciesDetails] = useState(null);
    const [evolutionStages, setEvolutionStages] = useState([]);
    const [introduction, setIntroduction] = useState('');

    useEffect(() => {
        getPokemonDetails(name)
        .then(details => {
            if(details) {
                setPokemonDetails(details);
                return getPokemonSpecies(name);
            }
        })
        .then(species => {
            if(species) {
                setSpeciesDetails(species);
                setIntroduction(species.flavor_text_entries
                .find(entry => entry.language.name === 'en').flavor_text);
                return getEvolutionChain(species.evolution_chain.url);
            }
        })
        .then(evolution => {
            if(evolution){
                const stages = [];
                let currentStage = evolution.chain;
                const promises = [];

                while (currentStage) {
                    promises.push(getPokemonDetails(currentStage.species.name));
                    currentStage = currentStage.evolves_to[0];
                }

                Promise.all(promises).then(results => {
                    results.forEach((result) => {
                        stages.push({
                            name: result.name,
                            sprite: result.sprites.front_default
                        });
                    });
                    setEvolutionStages(stages);
                });
            }
        })
        .catch(error => {
            console.error('error fetching', error);
        });
    }, [name]);

    if(!pokemonDetails || !speciesDetails){
        return <div>Loading ...</div>;
    }

    return(
        <div className="pokemon-details">
            <h1>Details</h1>
            <div className="left-card">
                <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
                <h2>{pokemonDetails.name}</h2>
                <p>{introduction}</p>
            </div>
            <div className="right-cards">
                <div className="right-card">
                    <h3>Base Stats</h3>
                    <ul>
                        {pokemonDetails.stats.map((stat, index) => (
                            <li key={index}>
                               {stat.stat.name}: {stat.base_stat}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="right-card">
                    <h3>Abilities</h3>
                    <ul>
                        {pokemonDetails.abilities.map((ability, index) => (
                            <li key={index}>{ability.ability.name}</li>
                        ))}
                    </ul>
                </div>
                <div className="right-card">
                    <h3>Evolution Stages</h3>
                    <ul>
                        {evolutionStages.map((stage, index) => (
                            <li key={index}>
                                <img src={stage.sprite} alt={stage.name} />
                                {stage.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default PokemonDetails;
