import { useEffect, useState } from 'react';
import '../styles/globals.css';

export default function Home() {
  const [city, setCity] = useState("Lima");
  const [category, setCategory] = useState("");
  const [district, setDistrict] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const categories = ["(-)", "Cafeterías", "Panaderías", "Bares", "Pizzerías", "Sangucherías", "Comida Vegetariana", "Comida Nikkei", "Comida Criolla", "Comida Italiana", "Comida Mexicana", "Hamburguesas", "Chifa", "Pollerías"];
  const districts = ["(-)", "Cercado de Lima", "Jesús María", "Lince", "Magdalena del Mar", "Pueblo Libre", "San Miguel", "La Victoria", "San Isidro", "Miraflores", "Surquillo", "San Borja", "Santiago de Surco", "Chorrillos", "La Molina", "Punta Hermosa"];

  const handleSearch = async () => {
    setLoading(true);
    const res = await fetch(`/api/places?city=${city}&category=${category}&district=${district}`);
    const data = await res.json();
    setResults(data);
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Restauranking</h1>
      <div>
        Ciudad: 
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="Lima">Lima</option>
        </select>
        Categoría: 
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat === "(-)" ? "" : cat}>{cat}</option>
          ))}
        </select>
        Distrito: 
        <select value={district} onChange={(e) => setDistrict(e.target.value)}>
          {districts.map((d) => (
            <option key={d} value={d === "(-)" ? "" : d}>{d}</option>
          ))}
        </select>
        <button onClick={handleSearch}>Buscar</button>
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        results.map((r, i) => (
          <div className="card" key={i}>
            <h3>{i + 1}. {r.name}</h3>
            <div className="info">
              <div>⭐ {r.rating} ({r.user_ratings_total} reseñas)</div>
              <div>{r.vicinity}</div>
              <div>{r.review_snippet || "Sin reseña destacada"}</div>
              <div className="icons">
                <a href={r.maps_url} target="_blank">📍 Mapa</a>
                {r.phone && <a href={`tel:${r.phone}`}>📞 Llamar</a>}
                {r.instagram && <a href={r.instagram}>📸 IG</a>}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
