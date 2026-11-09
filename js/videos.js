// js/videos.js
// Страница Videos: видео о Марсе из открытой библиотеки NASA Image and Video Library
// (images-api.nasa.gov — без ключа). Каждый раздел — отдельный поиск; видео открывается в окне.

// 1. Разделы страницы: что искать и какое слово обязательно должно быть в названии или описании.
// Подписи разделов — на пяти языках; сами видео и их описания приходят от НАСА по-английски.
const roverBadge = {en: "Rover", ru: "Марсоход", he: "רובר", es: "Róver", fr: "Rover"};
const videoSections = [
    {
        badge: {en: "New", ru: "Новое", he: "חדש", es: "Nuevo", fr: "Nouveau"},
        title: {en: "Latest from NASA", ru: "Свежее от NASA", he: "החדש מ־NASA", es: "Lo último de la NASA", fr: "Les nouveautés de la NASA"},
        text: {
            en: "The newest Mars videos in the NASA library.",
            ru: "Самые новые видео о Марсе в библиотеке NASA.",
            he: "סרטוני המאדים החדשים ביותר בספריית NASA.",
            es: "Los vídeos más recientes sobre Marte de la biblioteca de la NASA.",
            fr: "Les vidéos les plus récentes sur Mars dans la bibliothèque de la NASA."
        },
        query: "Mars",
        yearStart: new Date().getFullYear() - 2,
        mustHave: "mars"
    },
    {
        badge: roverBadge,
        title: {en: "Perseverance Rover", ru: "Марсоход Perseverance", he: "הרובר Perseverance", es: "El róver Perseverance", fr: "Le rover Perseverance"},
        text: {
            en: "Launch, landing in Jezero Crater and the search for signs of ancient life.",
            ru: "Запуск, посадка в кратере Езеро и поиск следов древней жизни.",
            he: "שיגור, נחיתה במכתש ג׳זרו והחיפוש אחר סימנים לחיים קדומים.",
            es: "Lanzamiento, aterrizaje en el cráter Jezero y búsqueda de señales de vida antigua.",
            fr: "Lancement, atterrissage dans le cratère Jezero et recherche de traces de vie ancienne."
        },
        query: "Perseverance rover",
        mustHave: "perseverance"
    },
    {
        badge: {en: "Helicopter", ru: "Вертолёт", he: "מסוק", es: "Helicóptero", fr: "Hélicoptère"},
        title: {
            en: "Ingenuity Mars Helicopter", ru: "Марсианский вертолёт Ingenuity", he: "מסוק המאדים Ingenuity",
            es: "El helicóptero marciano Ingenuity", fr: "L’hélicoptère martien Ingenuity"
        },
        text: {
            en: "The first powered flight on another planet and the flights that followed.",
            ru: "Первый управляемый полёт на другой планете и полёты, которые за ним последовали.",
            he: "הטיסה הממונעת הראשונה בכוכב לכת אחר והטיסות שבאו אחריה.",
            es: "El primer vuelo propulsado en otro planeta y los vuelos que lo siguieron.",
            fr: "Le premier vol motorisé sur une autre planète et les vols qui ont suivi."
        },
        query: "Ingenuity helicopter",
        mustHave: "ingenuity"
    },
    {
        badge: roverBadge,
        title: {en: "Curiosity Rover", ru: "Марсоход Curiosity", he: "הרובר Curiosity", es: "El róver Curiosity", fr: "Le rover Curiosity"},
        text: {
            en: "More than ten years of climbing Mount Sharp in Gale Crater.",
            ru: "Больше десяти лет восхождения на гору Шарп в кратере Гейл.",
            he: "יותר מעשר שנים של טיפוס על הר שארפ במכתש גייל.",
            es: "Más de diez años subiendo el monte Sharp en el cráter Gale.",
            fr: "Plus de dix ans d’ascension du mont Sharp dans le cratère Gale."
        },
        query: "Curiosity rover Mars",
        mustHave: "curiosity"
    },
    {
        badge: {en: "Lander", ru: "Посадочный модуль", he: "נחתת", es: "Módulo de aterrizaje", fr: "Atterrisseur"},
        title: {en: "InSight: Inside Mars", ru: "InSight: внутри Марса", he: "InSight: בתוך מאדים", es: "InSight: el interior de Marte", fr: "InSight : au cœur de Mars"},
        text: {
            en: "Marsquakes, meteoroid impacts and the weather, recorded by the InSight lander.",
            ru: "Марсотрясения, удары метеороидов и погода — по записям посадочного модуля InSight.",
            he: "רעידות מאדים, פגיעות מטאורואידים ומזג האוויר, כפי שתיעדה הנחתת InSight.",
            es: "Sismos marcianos, impactos de meteoroides y el tiempo, registrados por el módulo InSight.",
            fr: "Séismes martiens, impacts de météoroïdes et météo, enregistrés par l’atterrisseur InSight."
        },
        query: "Mars InSight",
        mustHave: "insight",
        titleOnly: true // «insight» — ещё и обычное английское слово, поэтому ищем только в названии
    }
];
const vt = (key, vars) => window.i18n ? window.i18n.t(key, vars) : key;
const vpick = value => window.i18n ? window.i18n.pick(value) : value.en;

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
    card.appendChild(nasa.el("span", "nasa-btn", vt("videos.watch")));

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
        nasa.formatDate(video.info.date_created) + (video.info.center ? " · " + video.info.center : "") + " · " + vt("videos.credit");
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
        document.getElementById("nasaVideoText").textContent = vt("videos.loadError");
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
        article.appendChild(nasa.el("span", "badge-abs", vpick(section.badge)));
        article.appendChild(nasa.el("h2", "", vpick(section.title)));
        article.appendChild(nasa.el("p", "", vpick(section.text)));
        const status = nasa.el("p", "nasa-status", vt("videos.loading"));
        article.appendChild(status);
        const row = nasa.el("div", "row g-3 nasa-grid");
        article.appendChild(row);
        root.appendChild(article);

        try {
            const videos = (await requests[index])
                .filter(v => !shown.has(v.info.nasa_id))
                .slice(0, VIDEOS_PER_SECTION);
            if (!videos.length) {
                status.textContent = vt("videos.empty");
                continue;
            }
            status.remove();
            videos.forEach(v => {
                shown.add(v.info.nasa_id);
                row.appendChild(createVideoCard(v));
            });
        } catch (e) {
            status.textContent = vt("videos.error");
        }
    }
}

// bootstrap.bundle подключается после этого файла, поэтому ждём полной загрузки страницы
window.addEventListener("load", generateVideosPage);
