import { useState } from "react";
import Card from "../components/Card";

export default function Home() {
  const [district, setDistrict] = useState("");
  const [category, setCategory] = useState("");
  const [results, setResults] = useState([]);

  const districts = {
    "Cercado de Lima": { lat: -12.0464, lng: -77.0428 },
    "Jesús María": { lat: -12.0762, lng: -77.0492 },
    "Lince": { lat: -12.0853, lng: -77.0346 },
    "Magdalena del Mar": { lat: -12.0901, lng: -77.0730 },
    "Pueblo Libre": { lat: -12.0742, lng: -77.0682 },
    "San Miguel": { lat: -12.0792, lng: -77.0840 },
    "La Victoria": { lat: -12.0781, lng: -77.0212 },
    "San Isidro": { lat: -12.0990, lng: -77.0373 },
    "Miraflores": { lat: -12.1211, lng: -77.0297 },
    "Surquillo": { lat: -12.1146, lng: -77.0219 },
    "San Borja": { lat: -12.1025, lng: -76.9941 },
    "Santiago de Surco": { lat: -12.1586, lng: -76.9796 },
    "Chorrillos": { lat: -12.1715, lng: -77.0264 },
    "La Molina": { lat: -12.0892, lng: -76.9477 },
    "Punta Hermosa": { lat: -12.3656, lng: -76.7998 }
  };

  const categories = {
    "Cafeterías": "cafeteria",
    "Panaderías": "bakery",
    "Bares": "bar",
    "Pizzerías": "pizzeria",
    "Sangucherías": "sandwich",
    "Comida vegetariana": "vegetarian restaurant",
    "Comida nikkei/japonesa": "japanese restaurant",
    "Comida criolla": "peruvian food",
    "Comida italiana": "italian restaurant",
    "Comida mexicana": "mexican restaurant",
    "Hamburguesas": "burger",
    "Chifa": "chifa",
    "Pollerías": "pollo a la brasa"
  };

  const handleSearch = async () => {
    if (!district || !category) return alert("Selecciona distrito y categoría");

    const coords = districts[district];
    const keyword = categories[category];
    const res = await fetch(`/api/places?lat=${coords.lat}&lng=${coords.lng}&keyword=${encodeURIComponent(keyword)}`);
    const data = await res.json();
    setResults(data.results || []);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Restauranking.pe</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select onChange={e => setDistrict(e.target.value)} className="p-2 border rounded">
          <option value="">Selecciona un distrito</option>
          {Object.keys(districts).map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <select onChange={e => setCategory(e.target.value)} className="p-2 border rounded">
          <option value="">Selecciona una categoría</option>
          {Object.keys(categories).map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <button onClick={handleSearch} className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Buscar
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((place, i) => (
          <Card key={i} place={place} />
        ))}
      </div>
    </div>
  );
}