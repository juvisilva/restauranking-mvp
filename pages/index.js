
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CATEGORIES = ["-", "cafetería", "pollería", "chifa", "sushi", "pescados y mariscos"];
const DISTRICTS = ["-", "Miraflores", "San Isidro", "Barranco", "Surco", "Magdalena"];

export default function Home() {
  const [city, setCity] = useState("Lima");
  const [district, setDistrict] = useState("-");
  const [category, setCategory] = useState("-");
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
      const query = `${category !== "-" ? category : "comida"} en ${district !== "-" ? district + ", " : ""}${city}`;
      const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${API_KEY}`;

      try {
        const response = await axios.get(`/api/proxy?url=${encodeURIComponent(url)}`);
        const data = response.data.results;
        const sorted = data
          .filter(r => r.rating && r.user_ratings_total)
          .sort((a, b) => (b.rating * b.user_ratings_total) - (a.rating * a.user_ratings_total))
          .slice(0, category === "-" ? 10 : 20);
        setResults(sorted);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }

    fetchData();
  }, [city, district, category]);

  return (
    <div className="container">
      <h1>Restauranking.pe</h1>
      <h2>Inteligencia Gastronómica Colectiva</h2>

      <div className="filter-bar">
        <label>Ciudad: <strong>{city}</strong></label><br />
        <label>Distrito: </label>
        <select value={district} onChange={e => setDistrict(e.target.value)}>
          {DISTRICTS.map(d => <option key={d}>{d}</option>)}
        </select>
        <label style={{ marginLeft: "1rem" }}>Categoría: </label>
        <select value={category} onChange={e => setCategory(e.target.value)}>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      <h3>{category === "-" ? "Top 10 mejores locales" : `Top 20 mejores locales de ${category}`} en {district !== "-" ? district + ", " : ""}{city}</h3>
      {results.map((r, idx) => (
        <div key={r.place_id} className="card">
          <strong>#{idx + 1}: {r.name}</strong><br />
          <span>⭐ {r.rating} ({r.user_ratings_total} opiniones)</span><br />
          <span>{r.formatted_address}</span>
        </div>
      ))}
    </div>
  );
}
