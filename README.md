# Restauranking.pe – Vite + Tailwind + Google Places

## ✅ Características

- Filtros por distrito y categoría
- Resultados reales desde Google Places API
- Tarjetas limpias y modernas
- Clave protegida vía variable de entorno

## 🚀 Cómo iniciar

1. Instala dependencias:
```bash
npm install
```

2. Crea un archivo `.env`:
```
VITE_GOOGLE_PLACES_API_KEY=tu_clave_real
```

3. Inicia el servidor:
```bash
npm run dev
```

## 🛰️ Para producción (Vercel)

1. En tu proyecto en Vercel, define:
   ```
   Name: VITE_GOOGLE_PLACES_API_KEY
   Value: tu_clave_real
   ```

2. Vercel usará automáticamente esta clave al hacer el build