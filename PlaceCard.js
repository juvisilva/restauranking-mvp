
export default function PlaceCard({ place }) {
  return (
    <div className="card">
      <h2>{place.name}</h2>
      <p>{place.vicinity}</p>
      <p>⭐ {place.rating} ({place.user_ratings_total} opiniones)</p>
    </div>
  );
}
