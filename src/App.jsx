import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import CharacterCard from "./components/Card/CharacterCard";
import LocationDetails from "./components/LocationDetails/locationDetails";
import SerchByLocation from "./components/Search/SerchByLocation";
import "./App.css";

function App() {
  //utils
  function obtenerNumeroAleatorio() {
    return Math.floor(Math.random() * 126) + 1;
  }

  function obtenerIDsDesdeURLs(objeto) {
    const ids = Object.values(objeto).map((url) => {
      const partes = url.split("/");
      return parseInt(partes[partes.length - 1]);
    });
    return ids;
  }

  //hooks
  const [location, setLocation] = useState({});
  const [characters, setCharacters] = useState([]);

  const obtenerDatosByLocation = async (ubicacion) => {
    try {
      const locationResponse = await axios.get(
        `https://rickandmortyapi.com/api/location/${ubicacion}`
      );
      setLocation(locationResponse.data);

      const characterIDs = obtenerIDsDesdeURLs(locationResponse.data.residents);

      const charactersResponse = await axios.get(
        `https://rickandmortyapi.com/api/character/${characterIDs.join(",")}`
      );
      setCharacters(charactersResponse.data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    obtenerDatosByLocation(obtenerNumeroAleatorio());
  }, []);

  const handleDataFromChild = (data) => {
    // Lógica para manejar los datos recibidos desde el componente hijo
    console.log("Data received from child:", data);

    obtenerDatosByLocation(data);
  };
  console.log(characters);
  // Se puede hacer console.log al estado para ver la respuesta de la api
  // console.log(obtenerIDsDesdeURLs(location.residents));

  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Background image */}
          <div className="header-background"></div>
          {/* Logo */}
          <img src="https://logos-world.net/wp-content/uploads/2022/01/Rick-And-Morty-Logo.png" alt="Logo" className="header-logo" />
        </div>
      </header>
      <div className="searchBar-container">
        <SerchByLocation onDataFromChild={handleDataFromChild} />
      </div>
      <div className="location-container">
        <LocationDetails
          name={location.name}
          type={location.type}
          dimension={location.dimension}
          population={characters.length ? characters.length : 0}
        />
      </div>
      <div className="characterGrid-container">
        <div className="character-container">
          {Array.isArray(characters) && characters.length > 0 ? (
            characters.map((character) => (
              <CharacterCard
                key={character.id}
                image={character.image}
                name={character.name}
                specie={character.species}
                origin={character["origin"]["name"]}
                appears={character["episode"]}
                status={character.status}
              />
            ))
          ) : characters.info ? (
            <p>No existen personajes</p>
          ) : (
            <CharacterCard
              key={characters.id}
              image={characters.image}
              name={characters.name}
              specie={characters.species}
              origin={"123"}
              appears={1}
              status={characters.status}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
