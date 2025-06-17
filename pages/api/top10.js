
export default async function handler(req, res) {
  const { district } = req.query;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const location = {
    "Miraflores": "-12.1218,-77.0301",
    "San Isidro": "-12.0970,-77.0374",
    "Barranco": "-12.1439,-77.0204",
    "Surco": "-12.1560,-76.9762"
  }[district] || "-12.0464,-77.0428"; // fallback: centro de Lima

  const radius = 5000;
  const type = "restaurant";

  const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&keyword=${district}&key=${apiKey}`);
  const data = await response.json();
  const sorted = data.results.sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 10);
  res.status(200).json({ results: sorted });
}
