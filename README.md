# The Newest Martian Chronicles

**English** · [עברית](README.he.md) · [Русский](README.ru.md)

A seven-page site about Mars: its history of exploration from early flybys to modern rovers, myths about the red planet, a photo gallery, NASA videos, fresh photos from the Perseverance rover and a page about the project. Built with HTML, CSS, Bootstrap and plain JavaScript.

**Live demo:** https://dubnovalexey.github.io/Mars-project2/

## Features

- Seven pages: Home, History, Myths, Photo, Videos, Rover and About The Project.
- **Videos:** Mars videos from the open NASA Image and Video Library (no API key), grouped by mission; a video plays in a window on the page, and the background music pauses meanwhile.
- **Rover:** the newest raw photos from NASA's Perseverance rover with the sol, the camera and NASA's own caption; a camera filter, "show more" and a large view. Answers are cached for an hour, and a slow or silent NASA server gets a clear message.
- One shared script builds the header, navigation, footer and Bootstrap modals for every page, so the layout is written once.
- Page content (texts, tables, embedded videos, playlists) comes from a data file and is rendered with DOM methods.
- A background music player with a playlist, next / previous and volume. While music plays, moving to another page continues the same track from the same second; if the browser blocks sound on the new page, it starts on the first click or key press.
- Modal forms: ask a question, leave a comment with a photo, send materials with files (up to 5 files, 10 MB), with previews and checks. Messages go by email through FormSubmit, without a server of my own. The "donate to the Mars expedition" form is a demo: the card number is checked in the browser (Luhn algorithm) and is never sent anywhere.
- Every photo in the gallery has its own caption; the myths show the image credits.
- **Martians, a black-humour easter egg** in the spirit of Tim Burton's *Mars Attacks!* (my own SVG drawing, not taken from the film): with the music off they peek out of the screen edges and hide; once the music plays they dance, and their heads pop into pink brain splashes and green goo that melt away. They never block clicks and stay away for visitors who prefer reduced motion. Myth 10 tells the story of the film.
- Responsive: on a phone the menu and the player wrap to new lines, videos and tables fit the screen.

Form submissions use FormSubmit. A browser frame loading does not prove that an email was delivered, so submitted fields remain available while delivery is unconfirmed.

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
- A rotating 3D Mars (three.js) on the home page.
