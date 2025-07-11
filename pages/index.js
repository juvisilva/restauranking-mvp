import { useState } from 'react';

export default function Home() {
  const [city, setCity] = useState('Lima');
  const [category, setCategory] = useState('-');

  const handleSearch = () => {
    alert(`Buscar restaurantes en ${city} - Categoría: ${category}`);
    // Aquí iría la lógica para llamar a la API y mostrar resultados
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontWeight: 'bold', fontSize: '2rem' }}>Restauranking</h1>
      
      <div style={{ marginTop: '1rem' }}>
        <label>
          Ciudad:{' '}
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="Lima">Lima</option>
            {/* Solo Lima por ahora */}
          </select>
        </label>
      </div>

      <div style={{ marginTop: '0.5rem' }}>
        <label>
          Categoría:{' '}
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="-">(-)</option>
            <option value="cafeterias">Cafeterías</option>
            <option value="pollerias">Pollerías</option>
            <option value="japonesa">Comida Japonesa</option>
            <option value="pizzerias">Pizzerías</option>
            <option value="hamburguesas">Hamburguesas</option>
            <option value="chifa">Chifa</option>
            <option value="criolla">Comida Criolla</option>
            {/* Agrega más según tus necesidades */}
          </select>
        </label>
      </div>

      <button
        onClick={handleSearch}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          background: '#000',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Buscar
      </button>
    </div>
  );
}
