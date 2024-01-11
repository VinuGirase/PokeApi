import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './styles.module.css';
import GradientDiv from './Gradient';
import Overlay from './Overlay';

function Fetch5() {
  const [pokeData, setPokeData] = useState([]);
  const [pokemonMap, setPokemonMap] = useState({});
  const [eggGroups, setEggGroups] = useState([]);
  const [eggGroupSpeciesMap, setEggGroupSpeciesMap] = useState({});
  const [selectedCardData, setSelectedCardData] = useState(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const fetchPokemonData = async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon/");
      const pokemonData = response.data.results;

      // Fetch and store Pokemon data
      for (const pokemon of pokemonData) {
        const result = await axios.get(pokemon.url);
        setPokeData((prevData) => [...prevData, result.data]);

        // Store individual Pokemon data in a map
        setPokemonMap((prevMap) => ({
          ...prevMap,
          [result.data.id]: result.data,
        }));
      }
    } catch (error) {
      console.error("Error fetching Pokemon data:", error.message);
    }
  };

  const fetchEggGroups = async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/egg-group/");
      setEggGroups(response.data.results);
    } catch (error) {
      console.error("Error fetching Egg Groups:", error.message);
    }
  };

  const fetchEggGroupSpecies = async (eggGroup) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/egg-group/${eggGroup.name}`);
      const speciesData = response.data.pokemon_species;

      setEggGroupSpeciesMap((prevMap) => ({
        ...prevMap,
        [eggGroup.name]: speciesData.map((species) => species.name),
      }));
    } catch (error) {
      console.error(`Error fetching species for ${eggGroup.name} group:`, error.message);
    }
  };

  const fetchData = async () => {
    fetchPokemonData();
    fetchEggGroups();
  };

  const handleCardClick = (data) => {
    setSelectedCardData(data);
    setIsOverlayVisible(true);
  };

  useEffect(() => {
    fetchData();
  }, []); // Run once on component mount

  useEffect(() => {
    // Fetch species for each egg group
    eggGroups.forEach((eggGroup) => {
      fetchEggGroupSpecies(eggGroup);
    });
  }, [eggGroups]);

  return (
    <div className={style.container}>
      {pokeData.map((item, index) => (
        <div
          key={item.id}
          className={style.card}
          onClick={() => handleCardClick(item)}
        >
          <GradientDiv data={item} />
          
        </div>
      ))}
      
      {isOverlayVisible && (
        <Overlay
          data={selectedCardData}
          onClose={() => setIsOverlayVisible(false)}
        />
      )}
      <div className={style.rowBreak} />

      {/* Display stored Pokemon data using GradientDiv */}
     
        {Object.values(pokemonMap).map((pokemon) => (
          <div key={pokemon.id} className={style.card} onClick={() => handleCardClick(pokemon)}>
            <GradientDiv data={pokemon} />
            {/* <div>
              <strong>ID:</strong> {pokemon.id}<br />
              <strong>Height:</strong> {pokemon.height}<br />
              <strong>Weight:</strong> {pokemon.weight}<br />
              <strong>Abilities:</strong> {pokemon.abilities.map(ability => ability.ability.name).join(', ')}<br />
              <strong>Stats:</strong> {pokemon.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ')}<br />
              <strong>Types:</strong> {pokemon.types.map(type => type.type.name).join(', ')}<br />
            </div> */}
          </div>
        ))}
      <div className={style.rowBreak} />
      {Object.values(pokemonMap).map((pokemon) => (
        
          
            <div>
                <br/>
              <div className={style.rowBreak} />

               <strong>{pokemon.name}</strong> <br /> 
              <strong>ID:</strong> {pokemon.id}<br />
              <strong>Height:</strong> {pokemon.height}<br />
              <strong>Weight:</strong> {pokemon.weight}<br />
              <strong>Abilities:</strong> {pokemon.abilities.map(ability => ability.ability.name).join(', ')}<br />
              <strong>Stats:</strong> {pokemon.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ')}<br />
              <strong>Types:</strong> {pokemon.types.map(type => type.type.name).join(', ')}<br />
              <div className={style.rowBreak} />
            </div>
          
        ))}

      {/* Display and list egg group names */}
      <div className={style.rowBreak} />

      <div>
        <h2>Egg Groups:</h2>
        <ul>
          {eggGroups.map((group) => (
            <li key={group.name}>{group.name}</li>
          ))}
        </ul>
      </div>

      {/* Display Pokemon species for each egg group */}
      <div className={style.rowBreak} />

      <div>
        <h2>Pokemon Species in Egg Groups:</h2>
        {Object.entries(eggGroupSpeciesMap).map(([eggGroupName, speciesList]) => (
          <div key={eggGroupName}>
            <h3>{eggGroupName}</h3>
            <ul>
              {speciesList.map((species) => (
                <li key={species}>{species}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Fetch5;
