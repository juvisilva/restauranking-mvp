export default async function handler(req, res) {
  const { city = '', category = '' } = req.query;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  const cityLocations = {
    Lima: '-12.0464,-77.0428',
    Arequipa: '-16.4090,-71.5375'
  };

  const location = cityLocations[city] || '-12.0464,-77.0428';
  const radius = 5000;
  const keyword = category ? encodeURIComponent(category) : '';

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=restaurant${keyword ? `&keyword=${keyword}` : ''}&key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  const results = (data.results || []).map(place => ({
    ...place,
    _score: (place.rating || 0) * Math.log10((place.user_ratings_total || 0) + 1)
  })).sort((a, b) => b._score - a._score);

  res.status(200).json({ results: category ? results.slice(0, 20) : results.slice(0, 10) });
}