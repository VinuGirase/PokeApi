import React from 'react';
import style from './Overlay.module.css';

const Overlay = ({ data, onClose }) => {

  let pokemon= [];
  

  return (
    <div className={style.overlay}>
      <div className={style.overlayContent}>
        <img src={data.sprites.front_default} alt="" />
        <h2>{data.name}</h2>
        <h2>{data.id}</h2>
        
        {data.effect_entries && data.effect_entries.length > 0 && (
          <div>
            <h2>Effects:</h2>
            {data.effect_entries.map((entry, index) => (
              <h2 key={index}>{entry.effect}</h2>
            ))}
          </div>
        )}

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Overlay;
