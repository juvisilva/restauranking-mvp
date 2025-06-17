
export default async function handler(req, res) {
  const {{ district = '', category = '' }} = req.query;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const location = {
    "Miraflores": "-12.1218,-77.0301",
    "San Isidro": "-12.0970,-77.0374",
    "Barranco": "-12.1439,-77.0204",
    "Surco": "-12.1560,-76.9762"
  }[district] || "-12.0464,-77.0428";

  const radius = 5000;
  const keyword = encodeURIComponent(category);

  const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${{location}}&radius=${{radius}}&type=restaurant&keyword=${{keyword}}&key=${{apiKey}}`);
  const data = await response.json();

  const scored = data.results
    .map(place => ({
      ...place,
      _score: (place.rating || 0) * Math.log10((place.user_ratings_total || 0) + 1)
    }))
    .sort((a, b) => b._score - a._score)
    .slice(0, 20);

  res.status(200).json({ results: scored });
}
