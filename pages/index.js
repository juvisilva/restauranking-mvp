import { useState, useEffect } from 'react';

const cities = ['Lima', 'Arequipa'];
const categories = ['Comida criolla', 'Parrilla', 'Sushi', 'Cafetería', 'Mariscos'];

export default function Home() {
  const [city, setCity] = useState('Lima');
  const [category, setCategory] = useState('');
  const [top10, setTop10] = useState([]);
  const [top20, setTop20] = useState([]);

  useEffect(() => {
    fetch(`/api/top10?city=${city}`)
      .then(res => res.json())
      .then(data => setTop10(data.results));
  }, [city]);

  useEffect(() => {
    if (category) {
      fetch(`/api/top20?city=${city}&category=${category}`)
        .then(res => res.json())
        .then(data => setTop20(data.results));
    }
  }, [city, category]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Restauranking.pe</h1>
      <h3>INTELIGENCIA GASTRONÓMICA COLECTIVA</h3>

      <label>Filtro de Ciudad:</label>
      <select onChange={e => setCity(e.target.value)} defaultValue="Lima">
        {cities.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <h2>Top 10 mejores locales de comida en la ciudad de {city}</h2>
      <table border="1" cellPadding="8">
        <thead><tr><th>#</th><th>Nombre</th><th>Calificación</th><th># Reviews</th><th>Link</th></tr></thead>
        <tbody>
          {top10.map((place, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{place.name}</td>
              <td>{place.rating}</td>
              <td>{place.user_ratings_total}</td>
              <td><a href={`https://www.google.com/maps/place/?q=place_id:${place.place_id}`} target="_blank">Ver</a></td>
            </tr>
          ))}
        </tbody>
      </table>

      <br/>
      <label>Filtro de Categoría:</label>
      <select onChange={e => setCategory(e.target.value)} defaultValue="">
        <option value="" disabled>-- Selecciona categoría --</option>
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      {category && (
        <>
          <h2>Top 20 mejores locales de {category} en la ciudad de {city}</h2>
          <table border="1" cellPadding="8">
            <thead><tr><th>#</th><th>Nombre</th><th>Calificación</th><th># Reviews</th><th>Link</th></tr></thead>
            <tbody>
              {top20.map((place, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{place.name}</td>
                  <td>{place.rating}</td>
                  <td>{place.user_ratings_total}</td>
                  <td><a href={`https://www.google.com/maps/place/?q=place_id:${place.place_id}`} target="_blank">Ver</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}