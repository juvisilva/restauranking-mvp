
import { useState, useEffect } from 'react';

const districts = [
  "Barranco", "Breña", "Chorrillos", "Jesús María", "La Molina", "La Victoria", "Lima",
  "Lince", "Magdalena", "Miraflores", "Pueblo Libre", "Rímac", "San Borja", "San Isidro",
  "San Miguel", "Surco", "Surquillo", "Punta Hermosa"
];

const categories = ['Comida criolla', 'Parrilla', 'Sushi', 'Cafetería', 'Mariscos', 'Comida china', 'Hamburguesas', 'Comida italiana', 'Vegano', 'Pizza'];

export default function DistrictSelector() {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (selectedDistrict && selectedCategory) {
      fetch(`/api/top20?district=${selectedDistrict}&category=${selectedCategory}`)
        .then(res => res.json())
        .then(data => setPlaces(data.results));
    }
  }, [selectedDistrict, selectedCategory]);

  return (
    <div>
      <select onChange={e => setSelectedDistrict(e.target.value)} defaultValue="">
        <option value="" disabled>-- Selecciona un distrito --</option>
        {districts.map(d => <option key={d} value={d}>{d}</option>)}
      </select>
      <select onChange={e => setSelectedCategory(e.target.value)} defaultValue="">
        <option value="" disabled>-- Selecciona una categoría --</option>
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <ul>
        {places.map((place, i) => (
          <li key={i}>
            <strong>{place.name}</strong> – {place.rating} ⭐ ({place.user_ratings_total} reviews)
          </li>
        ))}
      </ul>
    </div>
  );
}
