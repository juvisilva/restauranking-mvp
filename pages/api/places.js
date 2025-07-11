export default async function handler(req, res) {
  const axios = require('axios');
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const location = '-12.1231,-77.0450'; // Lima
  const radius = 3000;
  const type = 'restaurant';

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from Google Places API' });
  }
}
