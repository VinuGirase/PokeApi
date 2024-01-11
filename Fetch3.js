import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './styles.module.css';
import GradientDiv from './Gradient';
import Overlay from './Overlay';

function Fetch3() {
  const [pokeData, setPokeData] = useState([]);
  const [pokemonMap, setPokemonMap] = useState({});
  const [eggGroups, setEggGroups] = useState([]);
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

  return (
    <div className={style.container}>
      {pokeData.map((item, index) => (
        <div key={item.id} className={style.card} onClick={() => handleCardClick(item)}>
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
    
        
        {Object.values(pokemonMap).map((pokemon,index) => (
          <div key={pokemon.id} className={style.card } onClick={() => handleCardClick(pokemon)}>
            <GradientDiv data={pokemon} />
          </div>
        ))}
      


      <div className={style.rowBreak} />

      {/* Display and list egg group names */}
      <div>
        <h2>Egg Groups:</h2>
        <ul>
          {eggGroups.map((group) => (
            <li key={group.name}>{group.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Fetch3;
