export default async function handler(req, res) {
  const { ciudad = 'Lima', categoria = 'chifa' } = req.query
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${categoria}+in+${ciudad}&key=${API_KEY}`)
  const data = await response.json()

  const sorted = data.results
    .filter(r => r.rating && r.user_ratings_total)
    .sort((a, b) => (b.rating * b.user_ratings_total) - (a.rating * a.user_ratings_total))
    .slice(0, 20)

  res.status(200).json(sorted)
}