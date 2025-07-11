import axios from 'axios';

export default async function handler(req, res) {
  const { query } = req;
  const { keyword } = query;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json`,
      {
        params: {
          query: keyword,
          key: process.env.GOOGLE_PLACES_API_KEY
        }
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}