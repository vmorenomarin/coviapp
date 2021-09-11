import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { Header } from "./Header";
import { Title } from "./Title";
import { DataBoxes } from "./DataBoxes";
import { CountrySelect } from "./CountrySelect";

export const Covid = () => {
  const [title, setTitle] = useState("Global");
  const [dataDate, setDataDate] = useState("");
  const [stats, setStats] = useState({});
  const [countries, setCountries] = useState([]);
  const [select, setSelect] = useState(0);
  const [loading, setLoading] = useState("");

  useEffect(() => {
    getDataCovid();
    return () => {};
  }, []);
  const getDataCovid = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("https://api.covid19api.com/summary");
      setLoading(false);
      setTitle("Global");
      setSelect(0);
      setDataDate(moment(data.Date).format("MMMM Do YYYY, h:mm:ss a"));
      setStats(data.Global);
      setCountries(data.Countries);
    } catch (error) {
      console.log("Error in getDataCovid", error.message);
    }
  };

  const onChange = (e) => {
    if (e.target.value == 0) {
      getDataCovid();
    } else {
      setSelect(e.target.value);
      const country = countries.find((item) => item.ID === e.target.value);
      setStats(country);
      setTitle(country.Country);
    }
  };

  const numberWithCommas = (x) => {
    if (typeof x !== "undefined") {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  };

  return (
    <div>
      <Header />
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-center text-danger">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container">
          <Title title={title} fecha={dataDate} />
          <DataBoxes numberWithCommas={numberWithCommas} stats={stats} />
          <CountrySelect
            select={select}
            countries={countries}
            onChange={onChange}
          />
          {stats.Country && (
            <button className="btn btn-primary" onClick={() => getDataCovid()}>
              Clear country stats
            </button>
          )}
        </div>
      )}
    </div>
  );
};
