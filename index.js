import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ciudad, setCiudad] = useState("Lima");
  const [categoria, setCategoria] = useState("");

  const fetchRanking = async () => {
    setLoading(true);
    const res = await axios.get(`/api/places?ciudad=${ciudad}&categoria=${categoria}`);
    setData(res.data);
    setLoading(false);
  };

  return (
    <div>
      <h1>Restauranking</h1>
      <label>
        Ciudad:
        <select value={ciudad} onChange={e => setCiudad(e.target.value)}>
          <option value="Lima">Lima</option>
        </select>
      </label>
      <label>
        Categoría:
        <select value={categoria} onChange={e => setCategoria(e.target.value)}>
          <option value="">(-)</option>
          <option value="cafetería">Cafeterías</option>
          <option value="pollería">Pollerías</option>
          <option value="comida japonesa">Comida Japonesa</option>
          <option value="hamburguesas">Hamburguesas</option>
        </select>
      </label>
      <button onClick={fetchRanking}>Buscar</button>
      {loading && <p>Cargando...</p>}
      <div>
        {data.map((r, i) => (
          <div key={r.place_id} className="card">
            <strong>#{i + 1}: {r.name}</strong><br />
            Rating: {r.rating} ({r.user_ratings_total} reviews)<br />
            Dirección: {r.vicinity}
          </div>
        ))}
      </div>
    </div>
  );
}
