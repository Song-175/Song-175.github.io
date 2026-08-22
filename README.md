# Suhyeon Song — Portfolio

Personal portfolio for [song-175.github.io](https://song-175.github.io/).

## Structure

- `site/index.html` — content and page structure
- `site/styles.css` — responsive layout and light/dark themes
- `site/script.js` — theme preference and small interactions
- `site/assets/` — profile image and favicon
- `.github/workflows/hugo.yml` — GitHub Pages deployment workflow

The previous Hugo theme source is kept in the repository for reference, but the GitHub Pages workflow publishes only the `site` directory.

## Preview locally

```bash
python -m http.server 4173 --directory site
```

Then open `http://localhost:4173`.
