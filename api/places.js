export default async function handler(req, res) {
  const { lat, lng, keyword } = req.query;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  const endpoint = \`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=\${lat},\${lng}&radius=2500&keyword=\${keyword}&key=\${apiKey}\`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al consultar la API de Google Places" });
  }
}