# fmaterak.github.io

Personal portfolio website of **Filip Materak** — Software Engineer specializing in
modern C++, Linux systems, and telecom/embedded software for 5G infrastructure.

Live: https://fmaterak.github.io

## Stack

- Static single-page site — plain HTML, CSS, and vanilla JavaScript (no build step)
- Dark/light theme with system-preference detection and persistence
- Responsive layout, scroll-reveal animations, accessible navigation

## Structure

```
index.html          # markup and content
assets/css/style.css # theme tokens, layout, components, responsive rules
assets/js/main.js    # theme toggle, mobile nav, smooth scroll, scroll reveal
```

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```
