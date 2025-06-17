
import styles from './RestaurantCard.module.css';

export default function RestaurantCard({ place }) {
  const photoRef = place.photos?.[0]?.photo_reference;
  const photoUrl = photoRef
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
    : 'https://via.placeholder.com/400x200?text=No+Image';

  return (
    <div className={styles.card}>
      <img src={photoUrl} alt={place.name} className={styles.image} />
      <div className={styles.content}>
        <h2>{place.name}</h2>
        <p><strong>Rating:</strong> {place.rating} ⭐ ({place.user_ratings_total} reviews)</p>
        {place.vicinity && <p><strong>Dirección:</strong> {place.vicinity}</p>}
        {place.opening_hours && <p><strong>Estado:</strong> {place.opening_hours.open_now ? "Abierto" : "Cerrado"}</p>}
        {place.formatted_phone_number && <p><strong>Teléfono:</strong> {place.formatted_phone_number}</p>}
        <a href={`https://www.google.com/maps/place/?q=place_id:${place.place_id}`} target="_blank" rel="noopener noreferrer">Ver en Google Maps</a>
      </div>
    </div>
  );
}
