import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [city, setCity] = useState('Lima');
  const [category, setCategory] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    if (city) {
      axios.get(`/api/places?city=${city}&category=${category}`)
        .then(res => setRestaurants(res.data))
        .catch(err => console.error(err));
    }
  }, [city, category]);

  return (
    <div>
      <h1>Restauranking</h1>
      <label>
        Ciudad:
        <select value={city} onChange={e => setCity(e.target.value)}>
          <option value="Lima">Lima</option>
          <option value="Arequipa">Arequipa</option>
        </select>
      </label>
      <label>
        Categoría:
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">(-)</option>
          <option value="cafeteria">Cafeterías</option>
          <option value="polleria">Pollerías</option>
          <option value="japanese">Comida Japonesa</option>
        </select>
      </label>

      {restaurants.map((r, i) => (
        <div key={r.place_id} style={{ margin: '1rem 0', borderBottom: '1px solid #ccc' }}>
          <h3>{i + 1}. {r.name}</h3>
          <p>{r.rating} ⭐️ ({r.user_ratings_total} reseñas)</p>
          <p>{r.vicinity}</p>
        </div>
      ))}
    </div>
  );
}