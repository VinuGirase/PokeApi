import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './styles.module.css';
import GradientDiv from './Gradient';
import Overlay from './Overlay';

function Fetch6() {
  const [allPokemon, setAllPokemon] = useState({
    data: [],
    eggGroups: [],
    eggGroupSpeciesMap: {},
  });
  const [selectedCardData, setSelectedCardData] = useState(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const fetchPokemonData = async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon/");
      const pokemonData = response.data.results;

      // Fetch and store Pokemon data
      const updatedPokemonData = await Promise.all(
        pokemonData.map(async (pokemon) => {
          const result = await axios.get(pokemon.url);
          return result.data;
        })
      );

      setAllPokemon((prevAllPokemon) => ({
        ...prevAllPokemon,
        data: updatedPokemonData,
      }));
    } catch (error) {
      console.error("Error fetching Pokemon data:", error.message);
    }
  };

  const fetchEggGroups = async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/egg-group/");
      setAllPokemon((prevAllPokemon) => ({
        ...prevAllPokemon,
        eggGroups: response.data.results,
      }));
    } catch (error) {
      console.error("Error fetching Egg Groups:", error.message);
    }
  };

  const fetchEggGroupSpecies = async (eggGroup) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/egg-group/${eggGroup.name}`);
      const speciesData = response.data.pokemon_species;

      setAllPokemon((prevAllPokemon) => ({
        ...prevAllPokemon,
        eggGroupSpeciesMap: {
          ...prevAllPokemon.eggGroupSpeciesMap,
          [eggGroup.name]: speciesData.map((species) => species.name),
        },
      }));
    } catch (error) {
      console.error(`Error fetching species for ${eggGroup.name} group:`, error.message);
    }
  };

  const fetchData = async () => {
    await fetchPokemonData();
    await fetchEggGroups();
  };

  const handleCardClick = (data) => {
    setSelectedCardData(data);
    setIsOverlayVisible(true);
  };

  // Helper function to convert height from decimetres to feet and inches
  const convertHeightToFeetInches = (heightInDecimetres) => {
    const totalInches = heightInDecimetres * 3.93701;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return `${feet}' ${inches}"`;
  };

  // Helper function to convert weight from hectograms to kilograms
  const convertWeightToKilograms = (weightInHectograms) => {
    const weightInKilograms = weightInHectograms / 10;
    return `${weightInKilograms} kg`;
  };

  useEffect(() => {
    fetchData();
  }, []); // Run once on component mount

  useEffect(() => {
    // Fetch species for each egg group
    allPokemon.eggGroups &&
      allPokemon.eggGroups.forEach((eggGroup) => {
        fetchEggGroupSpecies(eggGroup);
      });
  }, [allPokemon.eggGroups]);

  return (
    <div className={style.container}>
      {allPokemon.data.map((item, index) => (
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

      <div>
        <h2>Stored Pokemon Data with Details:</h2>
        {allPokemon.data.map((pokemon) => (
          <div key={pokemon.id} className={style.card}>
            <GradientDiv data={pokemon} />
          </div>
        ))}
      </div>

      <div className={style.rowBreak} />

      <div>
        {allPokemon.data.map((pokemon) => (
          <div key={pokemon.id}>
            <div className={style.rowBreak} />
            <br />
            <strong>{pokemon.name}</strong><br/>
            <strong>ID:</strong> {pokemon.id}<br />
            <strong>Height:</strong> {convertHeightToFeetInches(pokemon.height)}<br />
            <strong>Weight:</strong> {convertWeightToKilograms(pokemon.weight)}<br />
            <strong>Abilities:</strong> {pokemon.abilities.map(ability => ability.ability.name).join(', ')}<br />
            <strong>Stats:</strong> {pokemon.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ')}<br />
            <strong>Types:</strong> {pokemon.types.map(type => type.type.name).join(', ')}<br />
            <div className={style.rowBreak} />
          </div>
        ))}
      </div>

      <div className={style.rowBreak} />

      <div>
        <h2>Egg Groups:</h2>
        <ul>
          {allPokemon.eggGroups.map((group) => (
            <li key={group.name}>{group.name}</li>
          ))}
        </ul>
      </div>

      <div className={style.rowBreak} />

      <div>
        <h2>Pokemon Species in Egg Groups:</h2>
        {Object.entries(allPokemon.eggGroupSpeciesMap).map(([eggGroupName, speciesList]) => (
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

export default Fetch6;
