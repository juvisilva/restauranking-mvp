export default async function handler(req, res) {
  const { city, category, district } = req.query;
  const location = `${district ? district + ', ' : ''}${city}, Peru`;
  const query = `${category ? category + ' ' : ''}comida en ${location}`;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.results) return res.status(500).json({ error: "No data from Google" });

    const ranked = data.results
      .filter(p => p.rating && p.user_ratings_total)
      .map(p => ({
        name: p.name,
        rating: p.rating,
        user_ratings_total: p.user_ratings_total,
        vicinity: p.formatted_address || "",
        review_snippet: p?.reviews?.[0]?.text || "",
        maps_url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name)}`,
        phone: p.formatted_phone_number || "",
        instagram: ""
      }))
      .sort((a, b) => (b.rating * b.user_ratings_total) - (a.rating * a.user_ratings_total))
      .slice(0, 10);

    res.status(200).json(ranked);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
