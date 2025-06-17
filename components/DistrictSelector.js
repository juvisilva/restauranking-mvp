
import { useState, useEffect } from 'react';

const districts = [
  "Barranco", "Breña", "Chorrillos", "Jesús María", "La Molina", "La Victoria", "Lima",
  "Lince", "Magdalena", "Miraflores", "Pueblo Libre", "Rímac", "San Borja", "San Isidro",
  "San Miguel", "Surco", "Surquillo", "Punta Hermosa"
];

export default function DistrictSelector() {
  const [selected, setSelected] = useState('');
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (selected) {
      fetch(`/api/top10?district=${selected}`)
        .then(res => res.json())
        .then(data => setPlaces(data.results));
    }
  }, [selected]);

  return (
    <div>
      <select onChange={e => setSelected(e.target.value)} defaultValue="">
        <option value="" disabled>-- Selecciona un distrito --</option>
        {districts.map(d => <option key={d} value={d}>{d}</option>)}
      </select>
      <ul>
        {places.map((place, i) => (
          <li key={i}>
            <strong>{place.name}</strong> - {place.rating} ⭐ ({place.user_ratings_total} reviews)
          </li>
        ))}
      </ul>
    </div>
  );
}
