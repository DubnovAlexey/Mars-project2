# The Newest Martian Chronicles

**English** · [עברית](README.he.md) · [Русский](README.ru.md)

A five-page site about Mars: its history of exploration from early flybys to modern rovers, myths about the red planet, a photo gallery and a page about the project. Built with HTML, CSS, Bootstrap and plain JavaScript.

**Live demo:** https://dubnovalexey.github.io/Mars-project2/

## Features

- Five pages: Home, History, Myths, Photo and About The Project.
- One shared script builds the header, navigation, footer and Bootstrap modals for every page, so the layout is written once.
- Page content (texts, tables, embedded videos, playlists) comes from a data file and is rendered with DOM methods.
- A background music player with a playlist, next / previous and volume.
- Modal forms: ask a question, leave a comment, "donate to the Mars expedition", send materials.
- Responsive: on a phone the menu and the player wrap to new lines, videos and tables fit the screen.

## Music

In the player the tracks have Martian names. The real tracks are:

- Mars Breeze — Kawtar Sadik, Rabab Najid, Jarl Flamar and others, "DABA (Jarl Flamar Remix)"
- Red Plains — Ugress, "The Ghost You Choose to Be"
- Orbit Echo — Melokind, "Down On Me"
- Dust Trail — Amanati & Roniit, "Slow"
- Night Crater — HÆLOS, "Pray"

The music belongs to its authors and is used only in this non-commercial study project. If you hold the rights to a track and want it removed, please open an issue and I will remove it.

## Tech stack

HTML5 · CSS3 · Bootstrap 5 · JavaScript (DOM, data-driven rendering) · GitHub Pages

## What I practised

- Separating data from markup: one renderer, many pages.
- Reusable layout parts injected by JavaScript.
- Responsive layout fixes: wrapping flex rows, fluid iframes with `aspect-ratio`, scrollable tables.

## Run locally

Serve the folder (for example `npx serve .`) and open the address it prints.

## Roadmap

- Use NASA public-domain photos everywhere instead of stock images.
- A rotating 3D Mars (three.js) on the home page and live rover photos from NASA's open API.
