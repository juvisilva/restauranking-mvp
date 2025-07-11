
import Head from 'next/head';
import { useEffect, useState } from 'react';
import RestaurantCard from '../components/RestaurantCard';

export default function Home() {
  const [data, setData] = useState([]);
  const city = 'Lima';
  const category = '';

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/places?city=${city}&category=${category}`);
      const json = await res.json();
      setData(json.results || []);
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <Head>
        <title>Restauranking</title>
      </Head>
      <h1>Restauranking</h1>
      {data.map((place, index) => (
        <RestaurantCard
          key={index}
          name={place.name}
          rating={place.rating}
          reviews={place.user_ratings_total}
          address={place.vicinity}
          photoUrl={place.photos?.[0]?.photo_reference ? 
            `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}` 
            : null}
          mapLink={`https://www.google.com/maps/place/?q=place_id:${place.place_id}`}
        />
      ))}
    </div>
  );
}
