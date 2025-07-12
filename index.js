
import Head from 'next/head';
import { useState } from 'react';
import PlaceCard from '../components/PlaceCard';
import '../styles/globals.css';

export default function Home() {
  const [city, setCity] = useState('Lima');
  const [category, setCategory] = useState('');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPlaces = async () => {
    setLoading(true);
    const response = await fetch(`/api/places?city=${city}&category=${category}`);
    const data = await response.json();
    setPlaces(data);
    setLoading(false);
  };

  return (
    <div className="container">
      <Head>
        <title>Restauranking</title>
      </Head>
      <h1>Restauranking</h1>
      <div className="filters">
        <label>Ciudad:
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="Lima">Lima</option>
          </select>
        </label>
        <label>Categoría:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">(-)</option>
            <option value="cafeteria">Cafeterías</option>
            <option value="polleria">Pollerías</option>
            <option value="japanese">Comida Japonesa</option>
            <option value="pizzeria">Pizzerías</option>
            <option value="hamburgueseria">Hamburguesas</option>
          </select>
        </label>
        <button onClick={fetchPlaces}>Buscar</button>
      </div>
      {loading ? <p>Cargando...</p> : (
        <div className="results">
          {places.map((place, index) => (
            <PlaceCard key={index} place={place} />
          ))}
        </div>
      )}
    </div>
  );
}
