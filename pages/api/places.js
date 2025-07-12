
export default async function handler(req, res) {
  const { city, category } = req.query;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  const locationMap = {
    "Lima": "-12.0464,-77.0428"
  };

  const radius = 10000;
  const type = category || "restaurant";

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locationMap[city]}&radius=${radius}&type=${type}&key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const sorted = data.results
    .map((place) => ({
      ...place,
      score: place.rating * Math.log10(place.user_ratings_total || 1)
    }))
    .sort((a, b) => b.score - a.score);

  res.status(200).json(sorted.slice(0, 10));
}
