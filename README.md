# Suhyeon Song

Source for [song-175.github.io](https://song-175.github.io/), a single-page academic profile.

## Structure

- `site/index.html` - profile content and page structure
- `site/styles.css` - responsive visual design
- `site/script.js` - mobile navigation and BibTeX copy actions
- `site/assets/` - profile image, service icons, and favicon
- `.github/workflows/pages.yml` - GitHub Pages deployment

## Local preview

```bash
python -m http.server 4173 --directory site
```

Open `http://localhost:4173/`.
