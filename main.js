document.addEventListener("DOMContentLoaded", () => {
  const districtSelect = document.getElementById("districtSelect");
  const categorySelect = document.getElementById("categorySelect");
  const searchBtn = document.getElementById("searchBtn");
  const resultsDiv = document.getElementById("results");

  Object.keys(districts).forEach(name => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    districtSelect.appendChild(option);
  });

  Object.keys(categories).forEach(name => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    categorySelect.appendChild(option);
  });

  searchBtn.addEventListener("click", async () => {
    const district = districtSelect.value;
    const category = categorySelect.value;
    resultsDiv.innerHTML = "";

    if (!district || !category) {
      alert("Selecciona un distrito y una categoría.");
      return;
    }

    const coords = districts[district];
    const keyword = categories[category];
    const radius = 2500;

    const endpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords.lat},${coords.lng}&radius=${radius}&keyword=${keyword}&key=${GOOGLE_PLACES_API_KEY}`;
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";

    try {
      const response = await fetch(proxyUrl + endpoint);
      const data = await response.json();

      if (data.results) {
        data.results.slice(0, 20).forEach(place => {
          const card = document.createElement("div");
          card.className = "bg-white p-4 rounded shadow";

          const photoRef = place.photos?.[0]?.photo_reference;
          const photoUrl = photoRef
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${GOOGLE_PLACES_API_KEY}`
            : "https://via.placeholder.com/400x200?text=Sin+foto";

          card.innerHTML = `
            <img src="${photoUrl}" alt="${place.name}" class="w-full h-48 object-cover rounded mb-2" />
            <h2 class="text-lg font-bold">${place.name}</h2>
            <p class="text-sm text-gray-600">${place.vicinity || ""}</p>
            <p class="text-sm">⭐ ${place.rating || "N/A"} (${place.user_ratings_total || 0} reseñas)</p>
            <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}" target="_blank" class="text-blue-500 underline text-sm mt-2 inline-block">Ver en Google Maps</a>
          `;
          resultsDiv.appendChild(card);
        });
      } else {
        resultsDiv.innerHTML = "<p>No se encontraron resultados.</p>";
      }
    } catch (error) {
      resultsDiv.innerHTML = "<p>Error al obtener datos. Verifica tu clave API.</p>";
      console.error(error);
    }
  });
});