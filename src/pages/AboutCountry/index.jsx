import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css";
import "../Home/Home.css";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Tabs from "../../components/Tabs";
import "./AboutCountry.css";
import MapContainer from "../../components/MapContainer";

function AboutCountry() {
  const [country, setCountry] = useState(null);

  let { nameCountry } = useParams();
  if (nameCountry === "Russia") {
    nameCountry = "Ukraine";
  }

  useEffect(() => {
    async function fetchCountry() {
      try {
        const response = await axios(
          `https://restcountries.com/v3.1/name/${nameCountry}`
        );
        setCountry(response.data[0]);
      } catch (error) {
        console.error(error);
        setCountry("Error");
      }
    }
    fetchCountry();
  }, [nameCountry]);

  if (!country) {
    return <div>Loading...</div>;
  }

  if (country === "Error") {
    return <div>There was an error loading the country.</div>;
  }

  console.log(country);

  const firstKey = Object.keys(country.currencies)[0];
  const langKey = Object.keys(country.languages)[0];

  return (
    <>
      <Header />
      <Link to="/" className="arrow arrow_left"></Link>
      <div className="country-information">
        <div className="flags-block">
          <img className="flags" src={country.flags.png}></img>
          <div className="countryName">{country.name.common}</div>
        </div>
        <div className="tabs">
          <Tabs defaultTab="Information" tabs={["Information", "Maps"]}>
            {/* Информація про країну */}
            <div>
              {/* Назва */}
              <div className="dFlex">
                <p>Name:</p>
                <div>{country.name.common}</div>
              </div>
              {/* Офіційна назва */}
              <div className="dFlex">
                <p>Offical name:</p>
                <div>{country.name.official}</div>
              </div>
              {/* Столиця */}
              <div className="dFlex">
                <p>Capital:</p>
                <div>{country.capital}</div>
              </div>
              {/* Домен в країні */}
              <div className="dFlex">
                <p>TLD:</p>
                <div>{country.tld[0]}</div>
              </div>
              {/* Телефоний код */}
              <div className="dFlex">
                <p>Telephone code:</p>
                <div>
                  {country.idd.root}
                  {country.idd.suffixes[0]}
                </div>
              </div>
              {/* Мова */}
              <div className="dFlex">
                <p>Languages:</p>
                <div>{country.languages[langKey]}</div>
              </div>
              {/* Площа */}
              <div className="dFlex">
                <p>Area:</p>
                <div>{country.area}</div>
              </div>
              {/* Населення */}
              <div className="dFlex">
                <p>Population:</p>
                <div>{country.population}</div>
              </div>
              {/* Таймзона */}
              <div className="dFlex">
                <p>Timezones:</p>
                <div>{country.timezones[0]}</div>
              </div>
              {/* Валюта */}
              <div className="dFlex">
                <p>Currencies:</p>
                <div>
                  {country.currencies[firstKey].name} (
                  {country.currencies[firstKey].symbol})
                </div>
              </div>
              {/* Континет */}
              <div className="dFlex">
                <p>Continents:</p>
                <div>{country.region}</div>
              </div>
              {/* Регион */}
              <div className="dFlex">
                <p>Sub region:</p>
                <div>{country.subregion}</div>
              </div>
            </div>
            {/* Карта */}
            <div>
              <MapContainer />
            </div>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default AboutCountry;
