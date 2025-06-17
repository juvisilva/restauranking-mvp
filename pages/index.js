
import { useEffect, useState } from "react";

export default function Home() {
  const [restaurantes, setRestaurantes] = useState([]);

  useEffect(() => {
    fetch("/api/top10?distrito=Miraflores")
      .then((res) => res.json())
      .then((data) => setRestaurantes(data));
  }, []);

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Top 10 Restaurantes en Miraflores</h1>
      {restaurantes.map((r, i) => (
        <div key={i} style={{ borderBottom: "1px solid #ccc", marginBottom: "1.5rem", paddingBottom: "1rem" }}>
          <h2>{r.name}</h2>
          <p>⭐ {r.rating} ({r.user_ratings_total} reseñas)</p>
          <p>{r.address}</p>
        </div>
      ))}
    </main>
  );
}
