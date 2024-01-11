import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './styles.module.css';
import GradientDiv from './Gradient';
import Overlay from './Overlay';

function Fetch1() {
  const [pokeData, setPokeData] = useState([]);
  const [pokemonMap, setPokemonMap] = useState({});
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [selectedCardData, setSelectedCardData] = useState(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const getPokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      setPokeData((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });

      setPokemonMap((prevState) => ({
        ...prevState,
        [result.data.id]: result.data,
      }));
    });
  };

  const fetchData = async () => {
    const res = await axios.get(url);
    getPokemon(res.data.results);
  };

  const handleCardClick = (data) => {
    setSelectedCardData(data);
    setIsOverlayVisible(true);
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return (
    <div className={style.container}>
      {pokeData.map((item, index) => (
        <React.Fragment key={item.id}>
          <div className={style.card} data={item} onClick={() => handleCardClick(item)}>
            <GradientDiv data={item} />
          </div>
          {(index + 1) % 6 === 0 && <div className={style.rowBreak} />}
        </React.Fragment>
      ))}

      {isOverlayVisible && (
        <Overlay
          data={selectedCardData}
          onClose={() => setIsOverlayVisible(false)}
        />
      )}

      {/* Accessing data from pokemonMap */}
      <div className={style.rowBreak} />
        
        {Object.keys(pokemonMap).map((pokemonId, index) => {
          const pokemon = pokemonMap[pokemonId];
          return (
            <React.Fragment key={pokemonId}>
              <div className={style.card} key={pokemonId} onClick={() => handleCardClick(pokemon)}>
                <GradientDiv data={pokemon} />
              </div>
              {(index + 1) % 6 === 0 && <div className={style.rowBreak} />}
            </React.Fragment>
          );
        })}
      
  
    </div>
  );
}

export default Fetch1;
