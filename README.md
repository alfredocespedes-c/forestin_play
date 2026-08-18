# Forestín Play · V2 Mobile Clean

## Objetivo de esta versión

Esta es una **maqueta estructural limpia** para continuar el proyecto desde mobile.

Se conserva la arquitectura React + Vite + Node y la lógica base de los seis juegos, pero se eliminan los assets gráficos creados durante las iteraciones anteriores.

### Regla de trabajo desde ahora

1. Primero se valida estructura, navegación y experiencia mobile.
2. La interfaz utiliza únicamente HTML/CSS y emojis.
3. Una vez aprobada la estructura, se incorpora un asset gráfico a la vez.
4. Los assets aprobados pasan a formar parte de un pool común de Forestín Play.
5. La lógica de los juegos no se modifica para incorporar los assets.

## Juegos incluidos

- 🎴 Memorice
- 🧩 Puzzle del Bosque
- 🦫 Laberinto de Forestín
- 🔥 ¡Apaga el incendio!
- 🐾 Rescata a los animales
- 🌲 Cuida el bosque

## Arquitectura

```text
coipo_games_v2/
├── client/
│   ├── src/
│   │   ├── main.jsx
│   │   └── styles/global.css
│   ├── index.html
│   └── package.json
├── server/
│   ├── index.js
│   └── package.json
└── package.json
```

No se incluyen `node_modules` ni imágenes/recursos gráficos de las versiones anteriores.

## Ejecución

Desde la raíz:

```bash
npm install
npm run install:all
npm run dev
```

Luego abrir:

```text
http://localhost:5173
```

## Nota sobre V1 / V2

La lógica base continúa siendo común. Esta entrega establece **V2 Mobile** como nueva base visual limpia. La experiencia desktop queda cubierta por el layout responsive y no requiere duplicar la lógica.
