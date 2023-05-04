import React, { useEffect, useState } from "react";
import "../../App.css";
import "./Home.css";
import Header from "../../components/Header";
import axios from "axios";
import CountriesList from "./CountriesList";
import Pagination from "../../components/Pagination";

function Home() {
  const [allCountries, setAllCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countItems, setCountItems] = useState(10);

  const countPages = allCountries.length / countItems;

  const lastCountryIndex = currentPage * countItems;
  const firstCountryIndex = lastCountryIndex - countItems;
  const currentCountry = allCountries.slice(firstCountryIndex, lastCountryIndex);

  const paginate = (page) => {setCurrentPage(page)}

  useEffect(
    () => async () => {
      try {
        const result = await axios("https://restcountries.com/v3.1/all");

        const resultId = result.data.map((item, i) => {
          return { ...item, id: i + 1 };
        });

        setAllCountries(resultId);
      } catch {
        setAllCountries("Error");
      }
    },
    []
  );

  return (
    <>
      <Header />
      <div className="container">
        <div className="contries">
          <CountriesList allCountry={currentCountry} />
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={countPages}
          onPageChange={paginate}
        />
      </div>
    </>
  );
}

export default Home;
