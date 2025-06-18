
import Head from 'next/head'
import '../styles/globals.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Restauranking.pe</title>
      </Head>
      <main>
        <header>
          <h1>Restauranking.pe</h1>
          <h2>Inteligencia Gastronómica Colectiva</h2>
        </header>
        <div className="filters">
          <select><option>Lima</option><option>Arequipa</option></select>
          <select><option>Todos</option><option>Chifa</option><option>Parrilla</option></select>
        </div>
        <div className="section-title">Top 10 mejores locales de comida en Lima</div>
        <div className="card">
          <img src="/placeholder.jpg" alt="Maido" />
          <div className="card-info">
            <h3>Maido</h3>
            <p>⭐ 4.8 (3500 reviews)</p>
            <p>Dirección: Av. San Martín 399, Miraflores</p>
          </div>
          <div className="card-links">
            <a href="#">📍</a><a href="#">☎️</a><a href="#">📸</a><a href="#">📘</a>
          </div>
        </div>
      </main>
    </>
  )
}
