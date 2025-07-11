
import React from 'react';

const RestaurantCard = ({ name, rating, reviews, address, photoUrl, mapLink }) => {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: 10, padding: 16, marginBottom: 16, maxWidth: 600 }}>
      {photoUrl && (
        <img src={photoUrl} alt={name} style={{ width: '100%', borderRadius: 10, marginBottom: 8 }} />
      )}
      <h2 style={{ margin: '8px 0' }}>{name}</h2>
      <p><strong>Rating:</strong> {rating} ⭐ ({reviews} reseñas)</p>
      <p><strong>Dirección:</strong> {address}</p>
      <a href={mapLink} target="_blank" rel="noopener noreferrer">📍 Ver en Google Maps</a>
    </div>
  );
};

export default RestaurantCard;
