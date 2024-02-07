import React from "react";
import './CharacterCard.css'

const CharacterCard = ({ name, specie, origin, appears, image , status}) => {
  

  return (
    <div className="character">
      <div className="character-img">
        <img src={image} alt="" />
      </div>
      <div className="character-content">
        <div className="character-name">
          <h2>{name}</h2>
        </div>
        <div className="character-data">
          <div className="character-text">
            <h5>Specie</h5>
            <div>{specie}</div>
          </div>
          <div className="character-text">
            <h5>Origin</h5>
            <div>{origin}</div>
          </div>
          <div className="character-text">
            <h5>Eppisodes where appear</h5>
            <div>{appears.length}</div>
          </div>
        </div>
        <div className={`character-status character-status__${status}`}>
            <span>{status}</span>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
