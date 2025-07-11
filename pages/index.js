import Head from 'next/head';
import styles from '../styles/globals.css';

export default function Home() {
  const restaurants = [
    {
      name: "Café Lima",
      rating: 4.5,
      reviews: 123,
      address: "Av. Larco 123, Miraflores",
      photo: "https://via.placeholder.com/150",
      mapUrl: "https://maps.google.com/?q=Café+Lima",
      phone: "+51 123 456 789",
      instagram: "https://instagram.com/cafelima"
    },
    {
      name: "La Pollería",
      rating: 4.7,
      reviews: 98,
      address: "Jr. Ayacucho 456, San Borja",
      photo: "https://via.placeholder.com/150",
      mapUrl: "https://maps.google.com/?q=La+Polleria",
      phone: "+51 987 654 321",
      instagram: ""
    }
  ];

  return (
    <>
      <Head>
        <title>Restauranking.pe</title>
      </Head>
      <div className="container">
        <h1>Top Restaurantes en Lima</h1>
        <div className="grid">
          {restaurants.map((r, index) => (
            <div key={index} className="card">
              <img src={r.photo} alt={r.name} />
              <h2>{r.name}</h2>
              <p>⭐ {r.rating} ({r.reviews} reviews)</p>
              <p>{r.address}</p>
              <div className="links">
                <a href={r.mapUrl} target="_blank">📍 Ver mapa</a>
                {r.instagram && <a href={r.instagram} target="_blank">📸 Instagram</a>}
                <a href={`tel:${r.phone}`}>📞 Llamar</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}