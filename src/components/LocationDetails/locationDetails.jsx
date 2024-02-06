import React from "react";

const LocationDetails = ({ name, type, dimension, population }) => {
  return (
    <div className="location">
      <div className="location-name">
        <h1>{name}</h1>
      </div>
      <div className="location-data">
        <div className="location-text">
          <h4>Type:</h4>
          <div>{type}</div>
        </div>
        <div className="location-text">
          <h4>Dimension:</h4>
          <div>{dimension}</div>
        </div>
        <div className="location-text">
          <h4>Population:</h4>
          <div>{population}</div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetails;
