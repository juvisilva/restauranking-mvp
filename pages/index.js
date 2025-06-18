import { useEffect, useState } from 'react'
import axios from 'axios'

const CATEGORIES = ['cafetería', 'pollería', 'chifa', 'sushi', 'pescados y mariscos']
const CITY = 'Lima'

export default function Home() {
  const [top10, setTop10] = useState([])
  const [top20, setTop20] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0])

  useEffect(() => {
    axios.get(`/api/top10?ciudad=${CITY}`).then(res => setTop10(res.data))
  }, [])

  useEffect(() => {
    axios.get(`/api/top20?ciudad=${CITY}&categoria=${selectedCategory}`).then(res => setTop20(res.data))
  }, [selectedCategory])

  return (
    <div className="container">
      <header>
        <h1>Restauranking.pe</h1>
        <p><strong>Inteligencia Gastronómica Colectiva</strong></p>
      </header>

      <section>
        <h2>Top 10 mejores locales de comida en {CITY}</h2>
        {top10.map((r, i) => (
          <div className="card" key={i}>
            <h3>{i + 1}. {r.name}</h3>
            <p>⭐ {r.rating} – {r.user_ratings_total} reviews</p>
            <p>{r.vicinity}</p>
            <a href={r.url} target="_blank">Ver en Google</a>
          </div>
        ))}
      </section>

      <section>
        <h2>Top 20 mejores locales de {selectedCategory} en {CITY}</h2>
        <div className="filters">
          <label>Categoría:</label>
          <select onChange={e => setSelectedCategory(e.target.value)} value={selectedCategory}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        {top20.map((r, i) => (
          <div className="card" key={i}>
            <h3>{i + 1}. {r.name}</h3>
            <p>⭐ {r.rating} – {r.user_ratings_total} reviews</p>
            <p>{r.vicinity}</p>
            <a href={r.url} target="_blank">Ver en Google</a>
          </div>
        ))}
      </section>
    </div>
  )
}