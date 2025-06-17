
import DistrictSelector from '../components/DistrictSelector';

export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Restauranking.pe</h1>
      <p>Selecciona un distrito para ver el Top 10:</p>
      <DistrictSelector />
    </div>
  );
}
