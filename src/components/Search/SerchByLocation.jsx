import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SerchByLocation.css';

const SearchByLocation = ({onDataFromChild}) => {
    const [text, setText] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [locationIDs, setLocationIDs] = useState('');
    const [busquedaRealizada, setBusquedaRealizada] = useState(false); 
    
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (text.trim() === '') {
                setSuggestions([]);
                return;
            }

            setLoading(true);

            try {
                const response = await axios.get(`https://rickandmortyapi.com/api/location/?name=${text}`);
                const locations = response.data.results.map(location => location.name);
                const ids = response.data.results.map(location => location.id);
                setSuggestions(locations);
                setLocationIDs(ids);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setSuggestions(['no hay coincidencias']);
            }

            setLoading(false);
        };

        fetchSuggestions();
    }, [text]);

    const onChange = evt => {
        
            setText(evt.target.value);
      
        
    };

    const onSuggestionClick = (suggestion,index) => {
        setText(suggestion);
        onDataFromChild(locationIDs[index]);
        setSuggestions([]);
        setBusquedaRealizada(true);
    };

    const handleSubmit = (evt) => {
      evt.preventDefault();
      const dataToSendToParent = locationIDs[0]; // Datos que deseas enviar al componente padre
      onDataFromChild(dataToSendToParent); // Llama a la función onDataFromChild proporcionada a través de las props
      setSuggestions([]);  
    };
    return (
        <div className='searchBar' >
            <form  onSubmit={handleSubmit} className="form">
                
                <input
                    id="search-bar"
                    type="text"
                    name="text"
                    placeholder="Search locations..."
                    value={text}
                    onChange={onChange}
                    className="input"
                    autoComplete="off" 
                />
                 <a onClick={handleSubmit} href="#"><img className="search-icon" src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png" alt="Search" /></a>
            </form>
            {loading && <p>Loading...</p>}
            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((suggestion, index) => (
                        <li 
                            key={index}
                            onClick={() => onSuggestionClick(suggestion,index)  }
                            className="suggestion-item "
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchByLocation;