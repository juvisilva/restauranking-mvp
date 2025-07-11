export default function Card({ place }) {
  const photoRef = place.photos?.[0]?.photo_reference;
  const photoUrl = photoRef
    ? \`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=\${photoRef}&key=\${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}\`
    : "https://via.placeholder.com/400x200?text=Sin+foto";

  return (
    <div className="bg-white p-4 rounded shadow">
      <img src={photoUrl} alt={place.name} className="w-full h-48 object-cover rounded mb-2" />
      <h2 className="text-lg font-bold">{place.name}</h2>
      <p className="text-sm text-gray-600">{place.vicinity}</p>
      <p className="text-sm">⭐ {place.rating || "N/A"} ({place.user_ratings_total || 0} reseñas)</p>
      <a href={\`https://www.google.com/maps/search/?api=1&query=\${encodeURIComponent(place.name)}\`} target="_blank" className="text-blue-500 underline text-sm mt-2 inline-block">Ver en Google Maps</a>
    </div>
  );
}