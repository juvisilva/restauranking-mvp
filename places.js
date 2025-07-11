import axios from 'axios';

export default async function handler(req, res) {
  const { city = 'Lima', category = '' } = req.query;
  const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

  const type = category || 'restaurant';
  const location = city === 'Arequipa' ? '-16.409047, -71.537451' : '-12.0464, -77.0428';

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=7000&type=${type}&key=${API_KEY}`;
  const { data } = await axios.get(url);

  const ranked = (data.results || []).map(r => ({
    ...r,
    puntuacion: r.rating * Math.log10((r.user_ratings_total || 1) + 1)
  })).sort((a, b) => b.puntuacion - a.puntuacion);

  res.status(200).json(ranked.slice(0, 20));
}