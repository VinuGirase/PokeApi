// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import style from './styles.module.css';
// import GradientDiv from './Gradient';

// function Fetch() {
//   const [PokeData, setData] = useState([]);
//   const [data, sendData] = useState();
//   const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
//   const [type, setType] = useState([]);
//   const getPokemon = async (res) => {
//     res.map(async (item) => {
//       const result = await axios.get(item.url);
//       setData((state) => {
//         state = [...state, result.data];
//         state.sort((a, b) => (a.id > b.id ? 1 : -1));
//         return state;
//       });
//     });
//   };

//   const fetchData = async () => {
//     const res = await axios.get(url);
//     getPokemon(res.data.results);
//   };

//   useEffect(() => {
//     fetchData();
//   }, [url]);

//   return (
//     <div className={style.container}>
//       {PokeData.map((item, index) => (
//         <React.Fragment key={item.id}>
//           <div className={style.card} data={data}>
//             <GradientDiv data={item} ></GradientDiv>
//             {/* <h2>{item.id}</h2>
//             <img src={item.sprites.front_default} alt="" />
//             <h2>{item.name}</h2> */}
//             {/* <p>{item.types}</p> */}
//           </div>
//           {(index + 1) % 6 === 0 && <div className={style.rowBreak} />}
//         </React.Fragment>
//       ))}
//     </div>
//   );
// }

// export default Fetch;

//---------------------------------------------------------------

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import style from './styles.module.css';
// import GradientDiv from './Gradient';

// function Fetch() {
//   const [PokeData, setData] = useState([]);
//   const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");

//   const getPokemon = async (res) => {
//     res.map(async (item) => {
//       const result = await axios.get(item.url);
//       setData((state) => {
//         state = [...state, result.data];
//         state.sort((a, b) => (a.id > b.id ? 1 : -1));
//         return state;
//       });
//     });
//   };

//   const fetchData = async () => {
//     const res = await axios.get(url);
//     getPokemon(res.data.results);
//   };

//   useEffect(() => {
//     fetchData();
//   }, [url]);

//   return (
//     <div className={style.container}>
//       {PokeData.map((item, index) => (
//         <React.Fragment key={item.id}>
//           <div className={style.card} data={item}>
//             <GradientDiv data={item} />
          
//           </div>
//           {(index + 1) % 6 === 0 && <div className={style.rowBreak} />}
//         </React.Fragment>
//       ))}
//     </div>
//   );
// }

// export default Fetch;


// -------------------------
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './styles.module.css';
import GradientDiv from './Gradient';
import Overlay from './Overlay'; // Import the Overlay component

function Fetch() {
  const [PokeData, setData] = useState([]);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [selectedCardData, setSelectedCardData] = useState(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const getPokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      setData((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
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
      {PokeData.map((item, index) => (
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
    </div>
  );
}

export default Fetch;
