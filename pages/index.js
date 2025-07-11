import Head from 'next/head';
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [places, setPlaces] = useState([]);

  const handleSearch = async () => {
    const res = await axios.get('/api/places');
    setPlaces(res.data.results || []);
  };

  return (
    <div className="p-4">
      <Head>
        <title>Restauranking.pe</title>
      </Head>
      <h1 className="text-2xl font-bold mb-4">Restauranking.pe - MVP</h1>
      <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded">
        Buscar Restaurantes
      </button>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {places.map((place, index) => (
          <div key={index} className="border rounded p-4 shadow">
            <h2 className="text-xl font-semibold">{place.name}</h2>
            <p>Rating: {place.rating} ⭐</p>
            <p>{place.vicinity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
