
export default async function handler(req, res) {
  const { distrito } = req.query;

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+${distrito}+Lima&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
  );

  const data = await response.json();

  const top10 = data.results.slice(0, 10).map((item) => ({
    name: item.name,
    rating: item.rating,
    address: item.formatted_address,
    user_ratings_total: item.user_ratings_total,
    photo: item.photos?.[0]?.photo_reference,
    place_id: item.place_id,
  }));

  res.status(200).json(top10);
}
