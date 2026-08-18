# Forestín Play — GitHub Pages

Repositorio objetivo:

`alfredocespedes-c/forestin_play`

URL esperada de GitHub Pages:

`https://alfredocespedes-c.github.io/forestin_play/`

## Configuración incluida

- `client/vite.config.js` usa `base: '/forestin_play/'`.
- Los assets se resuelven usando `import.meta.env.BASE_URL`, por lo que funcionan bajo la ruta del repositorio.
- `.github/workflows/deploy-pages.yml` compila `client` y publica `client/dist`.
- El backend Node/Express se mantiene en el repositorio para desarrollo local, pero GitHub Pages publica únicamente el frontend estático.

## Primera publicación

En GitHub:

1. Abrir `Settings`.
2. Ir a `Pages`.
3. En `Build and deployment > Source`, seleccionar `GitHub Actions`.

Desde la raíz local:

```bash
git add .
git commit -m "Configure Forestin Play for GitHub Pages"
git branch -M main
git remote add origin https://github.com/alfredocespedes-c/forestin_play.git
git push -u origin main
```

Si `origin` ya existe:

```bash
git remote set-url origin https://github.com/alfredocespedes-c/forestin_play.git
git push -u origin main
```

Cada nuevo `push` a `main` volverá a desplegar el sitio.
