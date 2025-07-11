# Restauranking.pe (versión simple)

## ✅ ¿Qué incluye?

- HTML + Tailwind CSS vía CDN
- JS puro con llamadas a Google Places API
- config.js donde colocas tu API KEY
- Filtros por distrito y categoría
- Tarjetas con nombre, rating, dirección, y link a Google Maps

## 🚀 ¿Cómo usarlo?

1. Abre `config.js` y reemplaza:

```js
const GOOGLE_PLACES_API_KEY = "YOUR_API_KEY_HERE";
```

2. Sube todos los archivos a tu repo en GitHub

3. En Vercel:
   - Crea un nuevo proyecto
   - Framework: `Other`
   - Build command: (vacío)
   - Output directory: `.` (un punto)

4. ¡Listo! Se desplegará como sitio estático sin dependencias