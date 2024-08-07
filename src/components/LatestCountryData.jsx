"use client";

import React, { useEffect, useState } from "react";

const LatestCountryData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://covid-19-data.p.rapidapi.com/help/countries?format=json";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "d26853943amshe1710ed745b5fbap15ddf7jsnefd7c6732191",
          "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        if (response.status === 429) {
          setError("Too many requests. Please try again later.");
          return;
        }
        const result = await response.json();
        if (result && result.length > 0) {
          setData(result);
        } else {
          setError("No data found");
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  if (error) return <p>{error}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>Latest Country Data</h2>
      <ul>
        {data.map((country) => (
          <li key={country.alpha2}>
            {country.name} ({country.alpha2})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestCountryData;
