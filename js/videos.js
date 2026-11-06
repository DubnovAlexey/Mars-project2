// js/videos.js
// Страница Videos: видео о Марсе из открытой библиотеки NASA Image and Video Library
// (images-api.nasa.gov — без ключа). Каждый раздел — отдельный поиск; видео открывается в окне.

// 1. Разделы страницы: что искать и какое слово обязательно должно быть в названии или описании
const videoSections = [
    {
        badge: "New",
        title: "Latest from NASA",
        text: "The newest Mars videos in the NASA library.",
        query: "Mars",
        yearStart: new Date().getFullYear() - 2,
        mustHave: "mars"
    },
    {
        badge: "Rover",
        title: "Perseverance Rover",
        text: "Launch, landing in Jezero Crater and the search for signs of ancient life.",
        query: "Perseverance rover",
        mustHave: "perseverance"
    },
    {
        badge: "Helicopter",
        title: "Ingenuity Mars Helicopter",
        text: "The first powered flight on another planet and the flights that followed.",
        query: "Ingenuity helicopter",
        mustHave: "ingenuity"
    },
    {
        badge: "Rover",
        title: "Curiosity Rover",
        text: "More than ten years of climbing Mount Sharp in Gale Crater.",
        query: "Curiosity rover Mars",
        mustHave: "curiosity"
    },
    {
        badge: "Lander",
        title: "InSight: Inside Mars",
        text: "Marsquakes, meteoroid impacts and the weather, recorded by the InSight lander.",
        query: "Mars InSight",
        mustHave: "insight",
        titleOnly: true // «insight» — ещё и обычное английское слово, поэтому ищем только в названии
    }
];

const VIDEOS_PER_SECTION = 6;
const VIDEO_CACHE_MS = 24 * 60 * 60 * 1000; // список видео обновляется раз в сутки

// 2. Поиск видео одного раздела
async function loadSectionVideos(section) {
    const params = new URLSearchParams({q: section.query, media_type: "video", page_size: "40"});
    if (section.yearStart) params.set("year_start", String(section.yearStart));
    const data = await nasa.getJson("https://images-api.nasa.gov/search?" + params, {
        cacheKey: "videos:" + params, maxAgeMs: VIDEO_CACHE_MS
    });
    const items = (data.collection && data.collection.items) || [];
    return items
        .map(item => ({info: item.data && item.data[0], preview: item.links && item.links[0] && item.links[0].href}))
        .filter(v => v.info && v.info.nasa_id && v.preview)
        .filter(v => (section.titleOnly ? v.info.title : v.info.title + " " + (v.info.description || ""))
            .toLowerCase().includes(section.mustHave))
        // Сначала видео, у которых тема есть в названии (а не только в описании), внутри — новые выше
        .sort((a, b) => {
            const inTitle = v => v.info.title.toLowerCase().includes(section.mustHave) ? 1 : 0;
            return (inTitle(b) - inTitle(a)) || String(b.info.date_created).localeCompare(String(a.info.date_created));
        });
}

// 3. Карточка одного видео
function createVideoCard(video) {
    const col = nasa.el("div", "col-12 col-md-6 col-lg-4");
    const card = nasa.el("div", "nasa-item");

    const img = document.createElement("img");
    img.src = nasa.safeUrl(video.preview);
    img.alt = video.info.title;
    img.loading = "lazy";
    card.appendChild(img);

    card.appendChild(nasa.el("h3", "", video.info.title));
    const center = video.info.center ? " · " + video.info.center : "";
    card.appendChild(nasa.el("p", "nasa-meta", nasa.formatDate(video.info.date_created) + center));
    card.appendChild(nasa.el("p", "nasa-text", nasa.shorten(video.info.description, 140)));
    card.appendChild(nasa.el("span", "nasa-btn", "▶ Watch"));

    nasa.makeClickable(card, () => openVideo(video));
    col.appendChild(card);
    return col;
}

// 4. Окно с видео: файлы ролика лежат в collection.json, выбираем средний размер
let videoModal = null;
let videoRequest = 0;

async function openVideo(video) {
    const request = ++videoRequest;
    const player = document.getElementById("nasaVideoPlayer");
    document.getElementById("nasaVideoTitle").textContent = video.info.title;
    document.getElementById("nasaVideoMeta").textContent =
        nasa.formatDate(video.info.date_created) + (video.info.center ? " · " + video.info.center : "") + " · Video: NASA";
    document.getElementById("nasaVideoText").textContent = video.info.description || "";
    player.removeAttribute("src");
    player.querySelectorAll("track").forEach(t => t.remove());
    player.poster = nasa.safeUrl(video.preview);
    videoModal.show();

    try {
        // Список файлов ролика берём через /asset/{nasa_id}: collection.json лежит на сервере без CORS
        const asset = await nasa.getJson("https://images-api.nasa.gov/asset/" + encodeURIComponent(video.info.nasa_id));
        if (request !== videoRequest) return;
        const files = ((asset.collection && asset.collection.items) || []).map(item => item.href);
        const pick = (suffix) => files.find(f => f.endsWith(suffix));
        const src = pick("~medium.mp4") || pick("~mobile.mp4") || pick("~large.mp4") || pick("~orig.mp4") || files.find(f => f.endsWith(".mp4"));
        if (!src) throw new Error("no mp4");
        player.src = nasa.safeUrl(src);
        player.play().catch(() => {
            // автозапуск не разрешён — посетитель нажмёт ▶ на самом плеере
        });
    } catch (e) {
        if (request !== videoRequest) return;
        document.getElementById("nasaVideoText").textContent =
            "This video cannot be loaded right now. Try again later or open it in the NASA library: https://images.nasa.gov";
    }
}

// 5. Разделы страницы — в том же оформлении, что и History: карточка, значок, заголовок
async function generateVideosPage() {
    const root = document.getElementById("videos-root");
    const modalEl = document.getElementById("nasaVideoModal");
    videoModal = bootstrap.Modal.getOrCreateInstance(modalEl);
    nasa.pauseMusicWhileOpen(modalEl);
    modalEl.addEventListener("hide.bs.modal", () => {
        // Ответ старого запроса не запускает ролик после закрытия окна или выбора другого.
        videoRequest++;
        const player = document.getElementById("nasaVideoPlayer");
        player.pause();
        player.removeAttribute("src");
        player.load();
    });

    // Все разделы ищутся сразу, а выводятся по порядку: видео, уже показанное выше, не повторяется ниже
    const shown = new Set();
    const requests = videoSections.map(section => loadSectionVideos(section));
    requests.forEach(r => r.catch(() => {
    })); // ошибка раздела показывается в самом разделе, ниже

    for (const [index, section] of videoSections.entries()) {
        const article = nasa.el("article", "card");
        article.appendChild(nasa.el("span", "badge-abs", section.badge));
        article.appendChild(nasa.el("h2", "", section.title));
        article.appendChild(nasa.el("p", "", section.text));
        const status = nasa.el("p", "nasa-status", "Loading videos from NASA…");
        article.appendChild(status);
        const row = nasa.el("div", "row g-3 nasa-grid");
        article.appendChild(row);
        root.appendChild(article);

        try {
            const videos = (await requests[index])
                .filter(v => !shown.has(v.info.nasa_id))
                .slice(0, VIDEOS_PER_SECTION);
            if (!videos.length) {
                status.textContent = "No videos found in this section yet.";
                continue;
            }
            status.remove();
            videos.forEach(v => {
                shown.add(v.info.nasa_id);
                row.appendChild(createVideoCard(v));
            });
        } catch (e) {
            status.textContent = "The NASA video library is not answering. Please try again later.";
        }
    }
}

// bootstrap.bundle подключается после этого файла, поэтому ждём полной загрузки страницы
window.addEventListener("load", generateVideosPage);
