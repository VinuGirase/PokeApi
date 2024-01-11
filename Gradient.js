// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const GradientDiv = (props) => {
//   const API = 'https://pokeapi.co/api/v2/pokemon/6';
//   const [types, setTypes] = useState([]);
//   const [PokeData, setData] = useState([]);

//   const categories = [
//     { category: 'NORMAL', color: '#DDCBD0' },
//     { category: 'FIGHTING', color: '#FCC1B0' },
//     { category: 'FLYING', color: '#B2D2E8' },
//     { category: 'POISON', color: '#CFB7ED' },
//     { category: 'GROUND', color: '#F4D1A6' },
//     { category: 'ROCK', color: '#C5AEA8' },
//     { category: 'BUG', color: '#C1E0C8' },
//     { category: 'GHOST', color: '#D7C2D7' },
//     { category: 'STEEL', color: '#C2D4CE' },
//     { category: 'FIRE', color: '#EDC2C4' },
//     { category: 'WATER', color: '#CBD5ED' },
//     { category: 'GRASS', color: '#C0D4C8' },
//     { category: 'ELECTRIC', color: '#E2E2A0' },
//     { category: 'PSYCHIC', color: '#DDC0CF' },
//     { category: 'ICE', color: '#C7D7DF' },
//     { category: 'DRAGON', color: '#CADCDF' },
//     { category: 'DARK', color: '#C6C5E3' },
//     { category: 'FAIRY', color: '#E4C0CF' },
//     { category: 'UNKNOWN', color: '#C0DFDD' },
//     { category: 'SHADOW', color: '#CACACA' },
//   ];
//   const fetchData = async () => {
//     const res = await axios.get(API);
//     const apiTypes = res.data.types;

//     if (Array.isArray(apiTypes)) {
//       setTypes(apiTypes.map((type) => type.type.name.toUpperCase()));
//     } else if (apiTypes && apiTypes.type) {
//       setTypes([apiTypes.type.name.toUpperCase()]);
//     }

//     getPokemon(apiTypes);
//   };

//   const getPokemon = async (apiTypes) => {
//     if (Array.isArray(apiTypes)) {
//       apiTypes.forEach(async (item) => {
//         const result = await axios.get(item.type.url);
//         setData((state) => {
//           state = [...state, result.data];
//           state.sort((a, b) => (a.id > b.id ? 1 : -1));
//           return state;
//         });
//       });
//     } else if (apiTypes && apiTypes.type) {
//       const result = await axios.get(apiTypes.type.url);
//       setData([result.data]);
//     }
//   };


//   useEffect(() => {
//     fetchData();
//   }, [API]);

//   const isSingleType = Array.isArray(types) && types.length === 1;
//   const backgroundColor = isSingleType ? categories.find((cat) => cat.category === types[0]).color : '';
//   const gradientString = isSingleType ? '' : `linear-gradient(to bottom, ${types.map((type) => categories.find((cat) => cat.category === type).color).join(', ')})`;

//   const divStyle = {
//     // width: '300px',
//     height: '100px',
//     background: backgroundColor || gradientString,
//     border: '1px solid black', // Add additional styles as needed
//   };

//   return (
//           <div style={divStyle}>
//             <h2>{props.id}</h2>
//             {/* <img src={props.sprites.front_default} alt="" /> */}
//             <h2>{props.name}</h2>
//           </div>
//   );
// };

// export default GradientDiv;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './GradientCss.module.css';

const GradientDiv = (props) => {
  const [types, setTypes] = useState([]);

  const fetchData = async () => {
    const apiTypes = props.data.types;

    if (Array.isArray(apiTypes)) {
      setTypes(apiTypes.map((type) => type.type.name.toUpperCase()));
    } 
    else if (apiTypes && apiTypes.type) {
      setTypes([apiTypes.type.name.toUpperCase()]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [props.data]);

  const isSingleType = Array.isArray(types) && types.length === 1;
  const categories = generateCategories(); // Define your categories
  const backgroundColor = isSingleType ? categories.find((cat) => cat.category === types[0]).color : '';
  const gradientString = isSingleType ? '' : `linear-gradient(to bottom, ${types.map((type) => categories.find((cat) => cat.category === type).color).join(', ')})`;

  const divStyle = {
    
    background: backgroundColor || gradientString,
    
  };

  return (
    <div style={divStyle} className={style.card}>
      <img src={props.data.sprites.front_default} alt="" />
      <h2>{props.data.name}</h2>
      <h2>{props.data.id}</h2>
      {/* <h3>{props.data.ability.effect_entries.effect}</h3> */}
    </div>
  );
};

export default GradientDiv;

// Helper function to generate categories
const generateCategories = () => {
  return [
    
    { category: 'NORMAL', color: '#DDCBD0' },
    { category: 'FIGHTING', color: '#FCC1B0' },
    { category: 'FLYING', color: '#B2D2E8' },
    { category: 'POISON', color: '#CFB7ED' },
    { category: 'GROUND', color: '#F4D1A6' },
    { category: 'ROCK', color: '#C5AEA8' },
    { category: 'BUG', color: '#C1E0C8' },
    { category: 'GHOST', color: '#D7C2D7' },
    { category: 'STEEL', color: '#C2D4CE' },
    { category: 'FIRE', color: '#EDC2C4' },
    { category: 'WATER', color: '#CBD5ED' },
    { category: 'GRASS', color: '#C0D4C8' },
    { category: 'ELECTRIC', color: '#E2E2A0' },
    { category: 'PSYCHIC', color: '#DDC0CF' },
    { category: 'ICE', color: '#C7D7DF' },
    { category: 'DRAGON', color: '#CADCDF' },
    { category: 'DARK', color: '#C6C5E3' },
    { category: 'FAIRY', color: '#E4C0CF' },
    { category: 'UNKNOWN', color: '#C0DFDD' },
    { category: 'SHADOW', color: '#CACACA' }
    
  ];
};
