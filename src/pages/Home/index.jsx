import React, { useEffect, useState } from "react";
import "../../App.css";
import "./Home.css";
import Header from "../../components/Header";
import axios, { all } from "axios";
import CountriesList from "./CountriesList";
import Pagination from "../../components/Pagination";

function Home() {
  const [allContries, setAllCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    Number(sessionStorage.getItem("pageNum")) || 1
  );
  const [filtredCountries, setFiltredCountries] = useState([]);
  const [countItems, setCountItems] = useState(10);
  const [flagSortAB, setFlagSortAB] = useState(false);
  const [flagSortId, setFlagSortId] = useState(false);
  const [activeButton, setActiveButtonSort] = useState(null);
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const [activeContinent, setActiveContinent] = useState(null);
  const [activeSubRegion, setActiveSubRegion] = useState(null);
  const [regions, setRegions] = useState({});

  const countPages = Math.ceil(
    filtredCountries.length === 0
      ? allContries.length / countItems
      : filtredCountries.length / countItems
  );

  const lastCountryIndex = currentPage * countItems;
  const firstCountryIndex = lastCountryIndex - countItems;
  const currentCountry = (filtredCountries.length === 0
    ? allContries
    : filtredCountries
  ).slice(firstCountryIndex, lastCountryIndex);

  const paginate = (page) => {
    setCurrentPage(page);
    sessionStorage.setItem("pageNum", page);
  };

  const sortAlph = () => {
    setActiveButtonSort(1);
    setFlagSortAB(!flagSortAB);
    if (flagSortAB) {
      setAllCountries(
        allContries.sort((a, b) => {
          if (a.name.common > b.name.common) return -1;
          if (a.name.common < b.name.common) return 1;
          return 0;
        })
      );

      const tmp = (filtredCountries.length === 0
        ? allContries
        : filtredCountries
      ).sort((a, b) => {
        if (a.name.common > b.name.common) return -1;
        if (a.name.common < b.name.common) return 1;
        return 0;
      });
      setFiltredCountries(tmp);
    } else {
      setAllCountries(
        allContries.sort((a, b) => {
          if (a.name.common < b.name.common) return -1;
          if (a.name.common > b.name.common) return 1;
          return 0;
        })
      );

      const tmp = (filtredCountries.length === 0
        ? allContries
        : filtredCountries
      ).sort((a, b) => {
        if (a.name.common < b.name.common) return -1;
        if (a.name.common > b.name.common) return 1;
        return 0;
      });
      setFiltredCountries(tmp);
    }
  };
  const resetCountries = () => {
    const tmp = allContries.sort(function(a, b) {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });
    setAllCountries(tmp);
  };
  const sortId = () => {
    setActiveButtonSort(2);
    setFlagSortId(!flagSortId);
    if (flagSortId) {
      setAllCountries(allContries.sort((a, b) => a.id - b.id));
      filtredCountries.length === 0
        ? ""
        : setFiltredCountries(filtredCountries.sort((a, b) => a.id - b.id));
    } else {
      setAllCountries(allContries.sort((a, b) => b.id - a.id));
      filtredCountries.length === 0
        ? ""
        : setFiltredCountries(filtredCountries.sort((a, b) => b.id - a.id));
    }
  };
  const resetSort = () => {
    resetCountries();
    activeSubRegion === null
      ? sortContinents(activeContinent)
      : sortSubRegions(activeSubRegion, activeContinent);
    setFlagSortId(false);
    setFlagSortAB(false);
    setActiveButtonSort(null);
  };
  const resetFilter = () => {
    setFiltredCountries(allContries);
    setActiveContinent(null);
    setActiveSubRegion(null);
  };
  const sortContinents = (continent) => {
    const tmp = (activeContinent != null
      ? allContries
      : filtredCountries.length === 0
      ? allContries
      : filtredCountries
    ).filter((item) => String(item.continents) === String(continent));

    setActiveContinent(continent);
    setCurrentPage(1);
    setFiltredCountries(tmp);
    setActiveSubRegion(null)
  };
  const sortSubRegions = (subRegion, continent) => {
    if (activeSubRegion !== null) {
      sortContinents(activeContinent);
    }
    const tmp = allContries.filter(
      (item) =>
        String(item.subregion) === String(subRegion) &&
        String(item.continents) === String(continent)
    );
    setActiveSubRegion(subRegion);
    setCurrentPage(1);
    setFiltredCountries(tmp);
  };
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
  useEffect(() => {
    const tmp = allContries.reduce((acc, country) => {
      const { continents, subregion } = country;
      if (acc[continents]) {
        acc[continents].add(subregion);
      } else {
        acc[continents] = new Set([subregion]);
      }
      return acc;
    }, {});
    setRegions(tmp);

  }, [allContries])
  return (
    <>
      <Header allContries={allContries} />
      <div className={`panel ${isOpenPanel ? "open" : ""}`}>
        <div className="btnsFilter_container">
          <div className="continents_filter">
            {Object.keys(regions).map((item) => (
              <div
                onClick={() => sortContinents(item)}
                key={item}
                className={`btn ${
                  item === activeContinent ? "active_btn" : ""
                }`}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="subregions_filter">
            {activeContinent != null}
            {activeContinent != null &&
              Array.from(regions[activeContinent]).map(
                (item) =>
                  item !== undefined && (
                    <div
                      onClick={() => sortSubRegions(item, activeContinent)}
                      key={item}
                      className={`btn ${
                        item === activeSubRegion ? "active_btn" : ""
                      }`}
                    >
                      {item}
                    </div>
                  )
              )}
          </div>
        </div>
      </div>
      <div className="container">
        <div className={`main_content ${isOpenPanel ? "shifted" : ""}`}>
          <div className="btnsSort_container">
            <div
              className={`btn ${activeButton === 1 ? "active_btn" : ""}`}
              onClick={() => sortAlph()}
            >
             {flagSortAB ? "A-Y" : "Y-A"}
            </div>
            <div
              className={`btn ${activeButton === 2 ? "active_btn" : ""}`}
              onClick={() => sortId()}
            >
              Sort {flagSortId ? "↓" : "↑"}
            </div>
            <div className={`btn`} onClick={() => resetSort()}>
              Reset
            </div>
          </div>
          <div className="btnsSort_container">
            <div className="btn" onClick={() => setIsOpenPanel(!isOpenPanel)}>
              {isOpenPanel ? "Filter Off" : "Filter On"}
            </div>
            <div
              className="btn"
              onClick={
                activeContinent !== null
                  ? () => resetFilter()
                  : () => setActiveContinent(null)
              }
            >
              Clear
            </div>
            <div className="chosen_filter_box">
              {activeContinent !== null && (
                <div className="chosen_filter">{activeContinent}</div>
              )}
              {activeSubRegion !== null && (
                <div className="chosen_filter red">{activeSubRegion}</div>
              )}
            </div>
          </div>
          <div className="contries">
            <CountriesList allCountry={currentCountry} />
          </div>
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
