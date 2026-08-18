import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true, app: 'Forestín Play', version: '2.6.0-mobile-clean' }));

app.get('/api/games', (_req, res) => res.json([
  { id: 'memorice', title: 'Memorice', emoji: '🎴', description: 'Encuentra las parejas antes de que avance el fuego.' },
  { id: 'puzzle', title: 'Puzzle del Bosque', emoji: '🧩', description: 'Ordena las piezas y reconstruye el paisaje.' },
  { id: 'laberinto', title: 'Laberinto de Forestín', emoji: '🦫', description: 'Encuentra el camino seguro antes de que se acabe el tiempo.' },
  { id: 'apaga', title: '¡Apaga el incendio!', emoji: '🔥', description: 'Elige la acción correcta frente a cada situación.' },
  { id: 'rescate', title: 'Rescata a los animales', emoji: '🐾', description: 'Ayuda a los animales a llegar a la zona segura.' },
  { id: 'cuida', title: 'Cuida el bosque', emoji: '🌲', description: 'Toma buenas decisiones para proteger el bosque.' }
]));

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Forestín Play API running on http://localhost:${port}`));
