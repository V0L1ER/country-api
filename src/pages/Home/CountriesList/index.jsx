import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./CountriesList.css";

function CountriesList({ allCountry,  }) {
  const [searchValue, setSearchValue] = useState(""); 
  const [selectedCountry, setSelectedCountry] = useState(null); 

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value); 
    setSelectedCountry(null); 
  };

  const filteredCountries = allCountry.filter((item) => {
    const countryName = item.name.common.toLowerCase();
    const searchQuery = searchValue.toLowerCase();
    return countryName.includes(searchQuery);
  });

  const handleCountrySelect = (country) => {
    setSelectedCountry(country); 
    setSearchValue(country.name.common); 
  };

  const [showDiv, setShowDiv] = useState({
    isVisible: false,
    object: null,
  });

  const handleMouseEnter = (id) => {
    setShowDiv({
      isVisible: true,
      object: allCountry.find((item) => item.id === id),
    });
  };

  const handleMouseLeave = () => {
    setShowDiv({
      isVisible: false,
      object: null,
    });
  };

  return (
    <>
      <div className="aboutCountry_container">
      <div className="input_box">
        <input
          placeholder="Search..."
          onChange={handleSearchChange}
          list="countries"
          type="text"
        />
        <Link to={selectedCountry === null ? "" : `/about/${selectedCountry.cca2}`}>
        </Link>
      </div>
      <datalist id="countries">
        {filteredCountries.map((item) => (
          <option key={item.name.common} value={item.name.common}></option>
        ))}
      </datalist>
    </div>
      <div className="countries_container">
        {filteredCountries.map((item) => (
          <Link
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={() => handleMouseLeave()}
            key={item.name.common}
            to={`/about/${item.name.common}`}
          >
            <div
              className="country_box"
              onClick={() => handleCountrySelect(item)}
            >
              <div className="index">{item.id}</div>
              <div className="country_info">
                <img src={item.flags.png} alt="" />
                <p>{item.name.common}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="aboutCountry_container">
        {showDiv.isVisible && (
          <div className="aboutCountry">
            <div className="flag">
              <img
                src={showDiv.object.flags.png}
                alt={showDiv.object.flags.alt}
              />
            </div>
            <div className="country_name">
              <p>Name: {showDiv.object.name.common}</p>
              <p>Capital: {showDiv.object.capital}</p>
              <p>Population: {showDiv.object.population}</p> 
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CountriesList;
