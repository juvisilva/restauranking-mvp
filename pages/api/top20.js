export default async function handler(req, res) {
  const district = req.query.district || '';
  const category = req.query.category || '';
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  const locationMap = {
    Miraflores: "-12.1218,-77.0301",
    "San Isidro": "-12.0970,-77.0374",
    Barranco: "-12.1439,-77.0204",
    Surco: "-12.1560,-76.9762",
    "Jesús María": "-12.0773,-77.0498",
    Breña: "-12.0635,-77.0510",
    "La Molina": "-12.0886,-76.9716",
    "La Victoria": "-12.0821,-77.0232",
    Lima: "-12.0464,-77.0428",
    Lince: "-12.0830,-77.0357",
    Magdalena: "-12.0917,-77.0702",
    "Pueblo Libre": "-12.0770,-77.0678",
    Rímac: "-12.0324,-77.0300",
    "San Borja": "-12.1030,-76.9947",
    "San Miguel": "-12.0860,-77.0796",
    Surquillo: "-12.1172,-77.0112",
    "Punta Hermosa": "-12.3561,-76.7877"
  };

  const location = locationMap[district] || "-12.0464,-77.0428";
  const radius = 5000;
  const keyword = encodeURIComponent(category);

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=restaurant&keyword=${keyword}&key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  const results = (data.results || []).map(place => ({
    ...place,
    _score: (place.rating || 0) * Math.log10((place.user_ratings_total || 0) + 1)
  }));

  results.sort((a, b) => b._score - a._score);
  const top20 = results.slice(0, 20);

  res.status(200).json({ results: top20 });
}