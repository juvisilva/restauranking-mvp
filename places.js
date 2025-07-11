import axios from 'axios';

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

export default async function handler(req, res) {
  const { ciudad, categoria } = req.query;
  const locationMap = {
    Lima: "-12.0464,-77.0428"
  };
  const radius = 10000;
  const type = "restaurant";
  const keyword = categoria || "";

  try {
    const response = await axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", {
      params: {
        location: locationMap[ciudad] || locationMap["Lima"],
        radius,
        type,
        keyword,
        key: GOOGLE_API_KEY
      }
    });

    const ranked = response.data.results
      .filter(p => p.rating && p.user_ratings_total)
      .map(p => ({
        ...p,
        weightedScore: p.rating * Math.log10(p.user_ratings_total)
      }))
      .sort((a, b) => b.weightedScore - a.weightedScore)
      .slice(0, 20);

    res.status(200).json(ranked);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
