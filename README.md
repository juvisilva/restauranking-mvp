# Restauranking.pe – MVP con Google Places API

Este es el código base para el MVP de [Restauranking.pe](https://restauranking.pe), conectado en tiempo real a Google Places API. Muestra los mejores restaurantes por distrito y categoría en Lima, Perú.

## ✅ Funcionalidades

- Filtro por **distrito** (15 distritos de Lima)
- Filtro por **categoría gastronómica** (12 categorías)
- Llamadas en tiempo real a **Google Places API**
- Tarjetas visuales con:
  - Imagen
  - Nombre
  - Calificación
  - Número de reviews
  - Dirección
  - Link directo a Google Maps

---

## 🛠️ Archivos incluidos

- `index.html`: página principal con estructura HTML
- `style.css`: (usa Tailwind CSS desde CDN)
- `main.js`: lógica para consumir la API y renderizar resultados
- `config.js`: donde se define tu API KEY de Google
- `places.js`: define distritos (con coordenadas) y categorías

---

## 🚀 Instrucciones para desplegar

### 1. Clonar o subir a GitHub

Puedes usar directamente este código en GitHub o subirlo a un nuevo repositorio:

```bash
git init
git add .
git commit -m "Primer MVP Restauranking.pe"
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

### 2. Configurar tu API Key

Abre el archivo `config.js` y reemplaza el valor de `GOOGLE_PLACES_API_KEY`:

```js
const GOOGLE_PLACES_API_KEY = "TU_API_KEY_AQUI";
```

> ⚠️ Debes tener habilitada la **Google Places API** en tu cuenta de Google Cloud Platform.

### 3. Desplegar en Vercel

- Crea una cuenta en [https://vercel.com](https://vercel.com) si no la tienes.
- Conecta tu repositorio de GitHub desde el panel de Vercel.
- Elige como proyecto estático (`index.html` en el root).
- Vercel detectará el sitio automáticamente y lo desplegará.

### 4. Ver el sitio

Una vez desplegado, tendrás una URL pública como:

```
https://restauranking.vercel.app
```

---

## 🧪 Para desarrollo local

También puedes abrir `index.html` en tu navegador directamente (solo necesitas conexión a internet para usar la API).

---

## 🔒 Notas de seguridad

**No subas tu API Key real en repositorios públicos.**  
Recomendamos usar variables de entorno o mantener tu repo privado si incluyes `config.js` con clave visible.

---

## 📬 Soporte

Para ajustes, nuevas ciudades o mejoras en diseño, contacta a tu desarrollador o colaborador del proyecto.

---

¡Éxitos con el lanzamiento de Restauranking.pe! 🇵🇪🍽️