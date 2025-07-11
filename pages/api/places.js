
import axios from 'axios';

export default async function handler(req, res) {
  const { city, category } = req.query;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  const locationMap = {
    Lima: '-12.0464,-77.0428',
    Arequipa: '-16.409047,-71.537451'
  };

  const location = locationMap[city] || locationMap['Lima'];
  const radius = 10000;
  const type = 'restaurant';
  const keyword = category || '';

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&keyword=${keyword}&key=${apiKey}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from Google Places API' });
  }
}
