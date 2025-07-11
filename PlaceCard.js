
export default function PlaceCard({ place }) {
  return (
    <div className="place-card">
      <img src={place.photoUrl} alt={place.name} className="place-photo" />
      <div className="place-details">
        <h3>{place.name}</h3>
        <p>⭐ {place.rating} ({place.user_ratings_total} opiniones)</p>
        <p>{place.address}</p>
        <p><i>{place.review}</i></p>
        <div className="place-links">
          <a href={place.url} target="_blank" rel="noopener noreferrer">📍 Ver en Google Maps</a>
          {place.phone && <a href={`tel:${place.phone}`}>📞 Llamar</a>}
          {place.instagram && <a href={place.instagram} target="_blank" rel="noopener noreferrer">📸 Instagram</a>}
          {place.facebook && <a href={place.facebook} target="_blank" rel="noopener noreferrer">📘 Facebook</a>}
        </div>
      </div>
    </div>
  );
}
